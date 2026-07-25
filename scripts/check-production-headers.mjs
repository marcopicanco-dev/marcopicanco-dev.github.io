import assert from 'node:assert/strict'

const target = new URL(
  process.env.SITE_URL ?? process.argv[2] ?? 'https://www.marcopicanco.com',
)

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

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

function extractCspMeta(html) {
  const match = html.match(
    /<meta\s+http-equiv=["']content-security-policy["']\s+content=(["'])([\s\S]*?)\1\s*\/?>/i,
  )

  assert.ok(match, 'HTML must include the generated CSP meta tag')

  return decodeHtmlAttribute(match[2])
}

function parseCsp(policy) {
  return new Map(
    policy
      .split(';')
      .map((directive) => directive.trim())
      .filter(Boolean)
      .map((directive) => {
        const [name, ...tokens] = directive.split(/\s+/)

        return [name.toLowerCase(), tokens]
      }),
  )
}

function getDirectiveTokens(policy, directive) {
  return parseCsp(policy).get(directive) ?? []
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

  const scriptTokens = getDirectiveTokens(headerPolicy, 'script-src')
  assert.ok(
    !scriptTokens.includes("'unsafe-inline'"),
    "content-security-policy script-src must not include 'unsafe-inline'",
  )

  const scriptElementTokens = getDirectiveTokens(
    headerPolicy,
    'script-src-elem',
  )
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

async function fetchHead() {
  const response = await fetch(target, {
    method: 'HEAD',
    redirect: 'follow',
    headers: {
      'user-agent': 'marcopicanco-security-header-check/1.0',
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
      'user-agent': 'marcopicanco-security-header-check/1.0',
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

console.log(`Production security headers passed for ${target.href}`)
