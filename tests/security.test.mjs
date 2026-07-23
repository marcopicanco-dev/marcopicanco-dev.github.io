import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'

const rootDir = process.cwd()
const scannedDirs = ['src', 'public']
const scannedExtensions = new Set([
  '.astro',
  '.css',
  '.md',
  '.mdx',
  '.mjs',
  '.ts',
  '.tsx',
])

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return collectFiles(entryPath)
      }

      if (entry.isFile() && scannedExtensions.has(path.extname(entry.name))) {
        return [entryPath]
      }

      return []
    }),
  )

  return files.flat()
}

async function readScannedFiles() {
  const files = (
    await Promise.all(
      scannedDirs.map((dir) => collectFiles(path.join(rootDir, dir))),
    )
  ).flat()

  return Promise.all(
    files.map(async (file) => ({
      file,
      relativePath: path.relative(rootDir, file),
      content: await readFile(file, 'utf8'),
    })),
  )
}

const scannedFiles = await readScannedFiles()
const markdownExtensions = new Set(['.md', '.mdx'])

function stripMarkdownExamples(file, content) {
  if (!markdownExtensions.has(path.extname(file))) {
    return content
  }

  return content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '')
}

test('external links that open a new tab must prevent window.opener access', () => {
  const unsafeLinks = []
  const anchorPattern = /<a\b[\s\S]*?>/g

  for (const { relativePath, content } of scannedFiles) {
    const anchors = content.match(anchorPattern) ?? []

    for (const anchor of anchors) {
      if (!/\btarget\s*=\s*["']_blank["']/.test(anchor)) {
        continue
      }

      if (
        !/\brel\s*=\s*["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["']/.test(
          anchor,
        )
      ) {
        unsafeLinks.push(`${relativePath}: ${anchor.replace(/\s+/g, ' ')}`)
      }
    }
  }

  assert.deepEqual(unsafeLinks, [])
})

test('source must not use raw HTML rendering escape hatches', () => {
  const forbiddenPatterns = [
    /\bset:html\b/,
    /\bis:raw\b/,
    /\bdangerouslySetInnerHTML\b/,
    /\binnerHTML\s*=/,
  ]

  const findings = scannedFiles.flatMap(({ relativePath, file, content }) => {
    const source = stripMarkdownExamples(file, content)

    return forbiddenPatterns
      .filter((pattern) => pattern.test(source))
      .map((pattern) => `${relativePath}: ${pattern.source}`)
  })

  assert.deepEqual(findings, [])
})

test('source must not use dynamic code execution', () => {
  const forbiddenPatterns = [/\beval\s*\(/, /\bnew\s+Function\s*\(/]

  const findings = scannedFiles.flatMap(({ relativePath, file, content }) => {
    const source = stripMarkdownExamples(file, content)

    return forbiddenPatterns
      .filter((pattern) => pattern.test(source))
      .map((pattern) => `${relativePath}: ${pattern.source}`)
  })

  assert.deepEqual(findings, [])
})

test('markup must not use inline event handlers', () => {
  const markupExtensions = new Set(['.astro', '.html', '.md', '.mdx'])
  const findings = scannedFiles.flatMap(({ relativePath, file, content }) => {
    if (!markupExtensions.has(path.extname(file))) {
      return []
    }

    const source = stripMarkdownExamples(file, content)
    const matches = source.match(/\son[a-z]+\s*=/gi) ?? []

    return matches.map((match) => `${relativePath}: ${match.trim()}`)
  })

  assert.deepEqual(findings, [])
})

test('base layout must define restrictive browser security policy', async () => {
  const baseLayout = await readFile(
    path.join(rootDir, 'src/layouts/Base.astro'),
    'utf8',
  )

  assert.match(
    baseLayout,
    /name="referrer"\s+content="strict-origin-when-cross-origin"/,
  )
  assert.match(baseLayout, /http-equiv="Content-Security-Policy"/)
  assert.match(baseLayout, /default-src 'self'/)
  assert.match(baseLayout, /object-src 'none'/)
  assert.match(baseLayout, /base-uri 'self'/)
  assert.match(baseLayout, /form-action 'self'/)
})
