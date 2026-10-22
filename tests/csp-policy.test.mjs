import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildEdgePolicy,
  findUncoveredTokens,
  mergePolicies,
} from '../scripts/csp-policy.mjs'

const pagePolicy =
  "default-src 'self'; script-src-elem 'self' 'sha256-new='; style-src-attr 'unsafe-inline'"

test('a header with every page token covers the page', () => {
  const header = `${pagePolicy}; frame-ancestors 'self'`

  assert.deepEqual(findUncoveredTokens(header, pagePolicy), [])
})

test('a stale script hash in the header is reported', () => {
  const header =
    "default-src 'self'; script-src-elem 'self' 'sha256-old='; style-src-attr 'unsafe-inline'"

  assert.deepEqual(findUncoveredTokens(header, pagePolicy), [
    ['script-src-elem', ["'sha256-new='"]],
  ])
})

test('a missing directive falls back like the browser does', () => {
  const header = "default-src 'self'; script-src 'self'"

  assert.deepEqual(findUncoveredTokens(header, pagePolicy), [
    ['script-src-elem', ["'sha256-new='"]],
    ['style-src-attr', ["'unsafe-inline'"]],
  ])
})

test('directives the header does not restrict are not reported', () => {
  assert.deepEqual(
    findUncoveredTokens("frame-ancestors 'self'", "base-uri 'self'"),
    [],
  )
})

test('the transition policy keeps old and new tokens', () => {
  const live = "script-src-elem 'self' 'sha256-old='"
  const built = "script-src-elem 'self' 'sha256-new='"

  assert.equal(
    mergePolicies([live, built]),
    "script-src-elem 'self' 'sha256-old=' 'sha256-new='",
  )
})

test('the edge policy adds header-only directives', () => {
  assert.match(buildEdgePolicy([pagePolicy]), /frame-ancestors 'self'$/)
})
