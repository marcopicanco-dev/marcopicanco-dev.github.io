import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const target = process.argv[2] ?? 'dist'
const edgeDirectives = [
  ['connect-src', ['https://cloudflareinsights.com']],
  ['script-src', ['https://static.cloudflareinsights.com']],
  ['frame-ancestors', ["'self'"]],
]

async function collectHtmlFiles(targetPath) {
  const entries = await readdir(targetPath, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(targetPath, entry.name)

      if (entry.isDirectory()) {
        return collectHtmlFiles(entryPath)
      }

      if (entry.isFile() && entry.name.endsWith('.html')) {
        return [entryPath]
      }

      return []
    }),
  )

  return files.flat()
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

function extractCsp(html, htmlFile) {
  const match = html.match(
    /<meta\s+http-equiv=["']content-security-policy["']\s+content=(["'])([\s\S]*?)\1\s*\/?>/i,
  )

  if (!match) {
    console.error(`No CSP meta tag found in ${htmlFile}`)
    process.exit(1)
  }

  return decodeHtmlAttribute(match[2])
}

function parseCsp(policy) {
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

function addDirectiveTokens(policy, extraDirectives) {
  const directives = parseCsp(policy)
  return addTokensToDirectives(directives, extraDirectives)
}

function addTokensToDirectives(directives, extraDirectives) {
  const directiveMap = new Map(directives)

  for (const [name, tokens] of extraDirectives) {
    const currentTokens = directiveMap.get(name) ?? []
    const nextTokens = [...new Set([...currentTokens, ...tokens])]
    const hasDirective = directiveMap.has(name)

    directiveMap.set(name, nextTokens)

    if (!hasDirective) {
      directives.push([name, nextTokens])
    }
  }

  return serializeCsp(
    directives.map(([name]) => [name, directiveMap.get(name) ?? []]),
  )
}

function mergePolicies(policies) {
  const directives = []
  const directiveMap = new Map()

  for (const policy of policies) {
    for (const [name, tokens] of parseCsp(policy)) {
      const currentTokens = directiveMap.get(name) ?? []
      const nextTokens = [...new Set([...currentTokens, ...tokens])]

      if (!directiveMap.has(name)) {
        directives.push([name, nextTokens])
      }

      directiveMap.set(name, nextTokens)
    }
  }

  return serializeCsp(
    directives.map(([name]) => [name, directiveMap.get(name) ?? []]),
  )
}

const htmlFiles = target.endsWith('.html')
  ? [target]
  : await collectHtmlFiles(target)

if (htmlFiles.length === 0) {
  console.error(`No HTML files found in ${target}`)
  process.exit(1)
}

const policies = new Map()

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, 'utf8')
  const csp = extractCsp(html, htmlFile)
  const files = policies.get(csp) ?? []

  policies.set(csp, [...files, htmlFile])
}

console.log(addDirectiveTokens(mergePolicies(policies.keys()), edgeDirectives))
