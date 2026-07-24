import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const target = process.argv[2] ?? 'dist'

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

if (policies.size > 1) {
  console.error('Multiple CSP values were generated. Use a dynamic edge layer.')
  console.error(JSON.stringify([...policies.values()], null, 2))
  process.exit(1)
}

console.log([...policies.keys()][0])
