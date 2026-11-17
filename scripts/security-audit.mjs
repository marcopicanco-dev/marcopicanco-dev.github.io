// CI gate for production dependencies: fails on any moderate or higher npm
// audit advisory unless scripts/audit-exceptions.json accepts it for now.
// See docs/security/npm-audit.md before adding an exception.
import { execFile } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { evaluateAudit } from './audit-policy.mjs'

const run = promisify(execFile)
const inGitHubActions = process.env.GITHUB_ACTIONS === 'true'

async function readAuditReport() {
  const args = ['audit', '--omit=dev', '--json']

  try {
    const { stdout } = await run('npm', args, { maxBuffer: 64 * 1024 * 1024 })
    return JSON.parse(stdout)
  } catch (error) {
    // npm audit exits with 1 when it finds advisories; the report is still on
    // stdout. Anything else (network, invalid JSON) is rethrown and fails.
    if (error.code === 1 && error.stdout) return JSON.parse(error.stdout)
    throw error
  }
}

const exceptions = JSON.parse(
  await readFile(new URL('./audit-exceptions.json', import.meta.url), 'utf8'),
)
const today = new Date().toISOString().slice(0, 10)
const { blocking, accepted, unused } = evaluateAudit(
  await readAuditReport(),
  exceptions,
  today,
)

for (const { advisory, exception } of accepted) {
  const message = `${advisory.id} (${advisory.package} ${advisory.range}) accepted until ${exception.expires}: ${exception.reason}`
  console.warn(`Accepted by exception: ${message}`)
  if (inGitHubActions)
    console.log(`::warning title=npm audit exception::${message}`)
}

for (const exception of unused) {
  console.log(
    `Exception ${exception.id} (${exception.package}) no longer matches any advisory; remove it from scripts/audit-exceptions.json.`,
  )
}

if (blocking.length > 0) {
  console.error('npm audit found advisories that block the build:')
  for (const { advisory, reason } of blocking) {
    console.error(
      `- [${advisory.severity}] ${advisory.package} ${advisory.range}: ${advisory.title} (${advisory.url}) - ${reason}`,
    )
  }
  console.error('Run `npm audit --omit=dev` for the full dependency paths.')
  process.exitCode = 1
} else {
  console.log(
    `npm audit: no blocking advisories in production dependencies (${accepted.length} accepted by exception).`,
  )
}
