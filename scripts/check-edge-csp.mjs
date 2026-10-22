// Pre-deploy gate: fails when the live Cloudflare CSP header would block
// anything the freshly built pages need, before that build reaches production.
import { appendFile } from 'node:fs/promises'
import {
  buildEdgePolicy,
  findUncoveredTokens,
  mergePolicies,
  readBuiltPolicies,
} from './csp-policy.mjs'

const target = new URL(process.env.SITE_URL ?? 'https://www.marcopicanco.com/')
const buildDir = process.argv[2] ?? 'dist'

const builtPolicy = buildEdgePolicy(await readBuiltPolicies(buildDir))

async function fetchLivePolicy() {
  try {
    const response = await fetch(target, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'user-agent': 'marcopicanco-security-header-check/1.0' },
    })
    const policy = response.headers.get('content-security-policy')?.trim()

    return response.status === 200 && policy
      ? { policy }
      : {
          problem: `HTTP ${response.status}, CSP header ${policy ? 'present' : 'missing'}`,
        }
  } catch (error) {
    return { problem: error.message }
  }
}

const live = await fetchLivePolicy()

// When production is unreachable the deploy may be the fix, so warn instead of
// blocking it; the post-deploy check still validates the header afterwards.
if (!live.policy) {
  const message = `Could not read the live CSP header from ${target.href} (${live.problem}); deploying without the pre-deploy CSP check.`

  console.warn(message)
  if (process.env.GITHUB_ACTIONS)
    console.log(`::warning title=CSP check skipped::${message}`)
  process.exit(0)
}

const livePolicy = live.policy

const uncovered = findUncoveredTokens(livePolicy, builtPolicy)

if (uncovered.length === 0) {
  const unused = findUncoveredTokens(builtPolicy, livePolicy)

  console.log(
    'The live Cloudflare CSP header allows everything this build needs.',
  )
  if (unused.length > 0) {
    console.log(
      `Tokens no longer used by this build (safe to drop next time the header changes): ${unused
        .map(([directive, tokens]) => `${directive} ${tokens.join(' ')}`)
        .join('; ')}`,
    )
  }
  process.exit(0)
}

// Keeping the live tokens lets pages from the current deploy keep working
// while the new build replaces them.
const transitionPolicy = mergePolicies([livePolicy, builtPolicy])
const report = [
  '### Cloudflare CSP header must be updated before this deploy',
  '',
  'The live header would block tokens this build needs:',
  '',
  ...uncovered.map(
    ([directive, tokens]) =>
      `- \`${directive}\`: ${tokens.map((token) => `\`${token}\``).join(' ')}`,
  ),
  '',
  'In Cloudflare, replace the `Content-Security-Policy` value of the Response Header Transform Rule with the value below, then re-run this workflow. It keeps the current tokens, so pages from the previous deploy keep working during the switch.',
  '',
  '```text',
  transitionPolicy,
  '```',
  '',
]

console.error(report.join('\n'))
if (process.env.GITHUB_ACTIONS) {
  console.log(
    '::error title=Cloudflare CSP header is outdated::The live header would block scripts or styles from this build. The job summary has the value to paste into Cloudflare.',
  )
}
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY, report.join('\n'))
}
process.exit(1)
