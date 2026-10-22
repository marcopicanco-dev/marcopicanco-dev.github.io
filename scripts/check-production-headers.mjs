import assert from 'node:assert/strict'
import { extractCspMeta, findUncoveredTokens, parseCsp } from './csp-policy.mjs'

const target = new URL(
  process.env.SITE_URL ?? process.argv[2] ?? 'https://www.marcopicanco.com',
)
const userAgent = 'marcopicanco-security-header-check/1.0'

function reportFailure(error) {
  console.error(`Production security header check failed for ${target.href}`)
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}

process.on('uncaughtException', reportFailure)
process.on('unhandledRejection', reportFailure)

const requiredPermissions = [
  'geolocation=()',
  'microphone=()',
  'camera=()',
  'payment=()',
  'usb=()',
]

const requiredCspDirectives = [
  "default-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
]

const analyticsTokens = {
  'connect-src': [
    'https://cloudflareinsights.com',
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://*.google.com',
  ],
  'script-src': [
    'https://static.cloudflareinsights.com',
    'https://www.googletagmanager.com',
  ],
  'img-src': [
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
  ],
}

function normalize(value) {
  return value?.trim() ?? ''
}

function expectHeaderEquals(headers, name, expected) {
  const actual = normalize(headers.get(name))
  assert.ok(
    actual.toLowerCase() === expected.toLowerCase(),
    `${name} expected "${expected}", received "${actual || '<missing>'}"`,
  )
}

function expectHeaderOneOf(headers, name, expectedValues) {
  const actual = normalize(headers.get(name))
  const normalizedExpected = expectedValues.map((value) => value.toLowerCase())

  assert.ok(
    normalizedExpected.includes(actual.toLowerCase()),
    `${name} expected one of "${expectedValues.join(', ')}", received "${
      actual || '<missing>'
    }"`,
  )
}

function expectHeaderIncludes(headers, name, expectedTokens) {
  const actual = normalize(headers.get(name))
  const missing = expectedTokens.filter((token) => !actual.includes(token))

  assert.deepEqual(
    missing,
    [],
    `${name} is missing "${missing.join(', ')}"; received "${
      actual || '<missing>'
    }"`,
  )
}

function getDirectiveTokens(policy, directive) {
  return new Map(parseCsp(policy)).get(directive) ?? []
}

function expectDirectiveTokens(policy, directive, expectedTokens) {
  const actualTokens = getDirectiveTokens(policy, directive)
  const missing = expectedTokens.filter(
    (token) => !actualTokens.includes(token),
  )

  assert.deepEqual(
    missing,
    [],
    `content-security-policy ${directive} is missing "${missing.join(
      ', ',
    )}"; received "${actualTokens.join(' ') || '<missing>'}"`,
  )
}

function expectCsp(headers, html) {
  const headerPolicy = normalize(headers.get('content-security-policy'))
  assert.ok(headerPolicy, 'content-security-policy header is required')

  const htmlPolicy = extractCspMeta(html)
  assert.ok(htmlPolicy, 'HTML must include a non-empty generated CSP meta tag')

  expectHeaderIncludes(
    headers,
    'content-security-policy',
    requiredCspDirectives,
  )
  expectDirectiveTokens(headerPolicy, 'script-src', ["'self'"])

  for (const [directive, tokens] of Object.entries(analyticsTokens)) {
    expectDirectiveTokens(headerPolicy, directive, tokens)
  }

  const scriptTokens = getDirectiveTokens(headerPolicy, 'script-src')
  assert.ok(
    !scriptTokens.includes("'unsafe-inline'"),
    "content-security-policy script-src must not include 'unsafe-inline'",
  )

  const scriptElementTokens = getDirectiveTokens(
    headerPolicy,
    'script-src-elem',
  )
  if (scriptElementTokens.length > 0) {
    expectDirectiveTokens(headerPolicy, 'script-src-elem', [
      "'self'",
      ...analyticsTokens['script-src'],
    ])
  }
  assert.ok(
    !scriptElementTokens.includes("'unsafe-inline'"),
    "content-security-policy script-src-elem must not include 'unsafe-inline'",
  )

  const styleTokens = getDirectiveTokens(headerPolicy, 'style-src')
  assert.ok(
    !styleTokens.includes("'unsafe-inline'"),
    "content-security-policy style-src must not include 'unsafe-inline'",
  )

  const styleElementTokens = getDirectiveTokens(headerPolicy, 'style-src-elem')
  assert.ok(
    !styleElementTokens.includes("'unsafe-inline'"),
    "content-security-policy style-src-elem must not include 'unsafe-inline'",
  )

  const styleAttributeTokens = getDirectiveTokens(htmlPolicy, 'style-src-attr')
  if (styleAttributeTokens.length > 0) {
    expectDirectiveTokens(headerPolicy, 'style-src-attr', styleAttributeTokens)
  }
}

function expectHsts(headers) {
  const actual = normalize(headers.get('strict-transport-security'))
  const maxAgeMatch = actual.match(/(?:^|;)\s*max-age=(\d+)/i)

  assert.ok(
    maxAgeMatch,
    `strict-transport-security must include max-age; received "${
      actual || '<missing>'
    }"`,
  )

  const maxAge = Number(maxAgeMatch[1])
  assert.ok(
    maxAge >= 31_536_000,
    `strict-transport-security max-age should be at least one year; received ${maxAge}`,
  )
}

function expectCloudflare(headers) {
  expectHeaderEquals(headers, 'server', 'cloudflare')

  const cfRay = normalize(headers.get('cf-ray'))
  assert.ok(
    cfRay,
    'cf-ray header is required to prove traffic passed Cloudflare',
  )
}

async function fetchSitemapPages() {
  const locations = (xml) =>
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)
  const fetchText = async (url) => {
    const response = await fetch(url, { headers: { 'user-agent': userAgent } })
    assert.equal(
      response.status,
      200,
      `${url} returned HTTP ${response.status}`,
    )

    return response.text()
  }

  const index = await fetchText(new URL('/sitemap-index.xml', target))
  const pages = []

  for (const sitemap of locations(index)) {
    const xml = await fetchText(new URL(new URL(sitemap).pathname, target))
    pages.push(
      ...locations(xml).map((url) => new URL(new URL(url).pathname, target)),
    )
  }

  return pages
}

// A stale hash in the Cloudflare header silently breaks any inline script that
// changed since the header was last updated, so check every published page.
async function expectEdgeCspCoversPages() {
  const failures = []

  for (const page of await fetchSitemapPages()) {
    const response = await fetch(page, { headers: { 'user-agent': userAgent } })
    const headerPolicy = normalize(
      response.headers.get('content-security-policy'),
    )
    const pagePolicy = extractCspMeta(await response.text())

    if (response.status !== 200 || !headerPolicy || !pagePolicy) {
      failures.push(
        `${page.pathname}: HTTP ${response.status}, CSP header ${headerPolicy ? 'present' : 'missing'}, CSP meta ${pagePolicy ? 'present' : 'missing'}`,
      )
      continue
    }

    for (const [directive, tokens] of findUncoveredTokens(
      headerPolicy,
      pagePolicy,
    )) {
      failures.push(`${page.pathname}: ${directive} blocks ${tokens.join(' ')}`)
    }
  }

  assert.deepEqual(
    failures,
    [],
    `The Cloudflare CSP header blocks what these pages allow:\n${failures.join('\n')}\nRun "npm run build && npm run security:csp" and paste the output into the Cloudflare Response Header Transform Rule.`,
  )
}

async function fetchHead() {
  const response = await fetch(target, {
    method: 'HEAD',
    redirect: 'follow',
    headers: {
      'user-agent': userAgent,
    },
  })

  assert.equal(
    response.status,
    200,
    `${target.href} should return HTTP 200, received ${response.status}`,
  )

  return response.headers
}

async function fetchHtml() {
  const response = await fetch(target, {
    redirect: 'follow',
    headers: {
      'user-agent': userAgent,
    },
  })

  assert.equal(
    response.status,
    200,
    `${target.href} should return HTTP 200 for HTML validation, received ${response.status}`,
  )

  return response.text()
}

const headers = await fetchHead()
const html = await fetchHtml()

assert.equal(
  target.protocol,
  'https:',
  'production security checks must use HTTPS',
)

expectCloudflare(headers)
expectHeaderEquals(headers, 'access-control-allow-origin', target.origin)
expectHeaderEquals(headers, 'cross-origin-opener-policy', 'same-origin')
expectHeaderEquals(headers, 'cross-origin-resource-policy', 'same-origin')
expectHeaderEquals(
  headers,
  'referrer-policy',
  'strict-origin-when-cross-origin',
)
expectHeaderEquals(headers, 'x-content-type-options', 'nosniff')
expectHeaderOneOf(headers, 'x-frame-options', ['SAMEORIGIN', 'DENY'])
expectHeaderIncludes(headers, 'permissions-policy', requiredPermissions)
expectCsp(headers, html)
expectHsts(headers)

assert.match(
  html,
  /<meta\s+name="referrer"\s+content="strict-origin-when-cross-origin"\s*\/?>/i,
  'HTML must keep the strict-origin-when-cross-origin referrer meta tag',
)

await expectEdgeCspCoversPages()

console.log(
  `Production security headers passed for ${target.href}, and the CSP header covers every page in the sitemap`,
)
