import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

// Tokens the Cloudflare header adds on top of the policy Astro writes into each
// page's <meta> tag. frame-ancestors only works when sent as a header.
export const edgeDirectives = [
  ['connect-src', ['https://cloudflareinsights.com']],
  [
    'script-src',
    [
      'https://static.cloudflareinsights.com',
      'https://www.googletagmanager.com',
    ],
  ],
  ['frame-ancestors', ["'self'"]],
]

// Directives a browser falls back to when a policy omits the specific one.
const fallbackChains = {
  'script-src-elem': ['script-src', 'default-src'],
  'script-src-attr': ['script-src', 'default-src'],
  'style-src-elem': ['style-src', 'default-src'],
  'style-src-attr': ['style-src', 'default-src'],
  'frame-src': ['child-src', 'default-src'],
  'worker-src': ['child-src', 'script-src', 'default-src'],
}
const fetchDirectives = new Set([
  'child-src',
  'connect-src',
  'font-src',
  'img-src',
  'manifest-src',
  'media-src',
  'object-src',
  'script-src',
  'style-src',
])

export function parseCsp(policy) {
  return policy
    .split(';')
    .map((directive) => directive.trim())
    .filter(Boolean)
    .map((directive) => {
      const [name, ...tokens] = directive.split(/\s+/)

      return [name.toLowerCase(), tokens]
    })
}

function serializeCsp(directives) {
  return directives
    .map(([name, tokens]) => `${name} ${tokens.join(' ')}`.trim())
    .join('; ')
}

// Unions the tokens of every policy, keeping the first-seen directive order.
export function mergePolicies(policies) {
  const directiveMap = new Map()

  for (const policy of policies) {
    for (const [name, tokens] of parseCsp(policy)) {
      const currentTokens = directiveMap.get(name) ?? []

      directiveMap.set(name, [...new Set([...currentTokens, ...tokens])])
    }
  }

  return serializeCsp([...directiveMap])
}

// The value to paste into the Cloudflare header for a given build.
export function buildEdgePolicy(pagePolicies) {
  return mergePolicies([...pagePolicies, serializeCsp(edgeDirectives)])
}

function getEffectiveTokens(directives, name) {
  if (directives.has(name)) return directives.get(name)

  const chain =
    fallbackChains[name] ?? (fetchDirectives.has(name) ? ['default-src'] : [])
  const fallback = chain.find((candidate) => directives.has(candidate))

  return fallback ? directives.get(fallback) : null
}

// Browsers enforce the header and the <meta> policy together, so every token a
// page allows must also be allowed by the header, or the header blocks it.
export function findUncoveredTokens(headerPolicy, pagePolicy) {
  const header = new Map(parseCsp(headerPolicy))
  const uncovered = []

  for (const [name, tokens] of parseCsp(pagePolicy)) {
    const allowed = getEffectiveTokens(header, name)
    if (!allowed) continue

    const missing = tokens.filter((token) => !allowed.includes(token))
    if (missing.length > 0) uncovered.push([name, missing])
  }

  return uncovered
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

export function extractCspMeta(html) {
  const match = html.match(
    /<meta\s+http-equiv=["']content-security-policy["']\s+content=(["'])([\s\S]*?)\1\s*\/?>/i,
  )

  return match ? decodeHtmlAttribute(match[2]) : null
}

async function collectHtmlFiles(targetPath) {
  const entries = await readdir(targetPath, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(targetPath, entry.name)

      if (entry.isDirectory()) return collectHtmlFiles(entryPath)
      if (entry.isFile() && entry.name.endsWith('.html')) return [entryPath]

      return []
    }),
  )

  return files.flat()
}

// Returns the distinct <meta> policies of a build directory or a single file.
export async function readBuiltPolicies(target) {
  const htmlFiles = target.endsWith('.html')
    ? [target]
    : await collectHtmlFiles(target)

  if (htmlFiles.length === 0) {
    throw new Error(`No HTML files found in ${target}`)
  }

  const policies = new Set()

  for (const htmlFile of htmlFiles) {
    const policy = extractCspMeta(await readFile(htmlFile, 'utf8'))

    if (!policy) throw new Error(`No CSP meta tag found in ${htmlFile}`)
    policies.add(policy)
  }

  return [...policies]
}
