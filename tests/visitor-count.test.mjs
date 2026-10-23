import assert from 'node:assert/strict'
import { generateKeyPairSync, verify } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import {
  parseTotalUsers,
  reportRequest,
  updatePublicVisitorCount,
} from '../scripts/update-public-visitor-count.mjs'

// Keys are created for this test run only; no real credentials or network calls.
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
})
const credentials = {
  type: 'service_account',
  client_email: 'counter@test-project.iam.gserviceaccount.com',
  private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }),
  token_uri: 'https://untrusted.example/token',
}
const env = {
  GA4_PROPERTY_ID: '123456789',
  GA4_SERVICE_ACCOUNT_JSON: JSON.stringify(credentials),
}
const now = new Date('2026-10-23T02:00:00Z')
const empty = { totalUsers: null, updatedAt: null, throughDate: null }
const report = (value = '42') => ({
  metricHeaders: [{ name: 'totalUsers', type: 'TYPE_INTEGER' }],
  rowCount: 1,
  rows: [{ metricValues: [{ value }] }],
  metadata: { timeZone: 'America/Sao_Paulo' },
})
const jsonResponse = (value) => ({ ok: true, json: async () => value })

async function run(t, options = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'visitor-counter-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const outputFile = join(directory, 'stats.json')
  await writeFile(outputFile, JSON.stringify({ totalUsers: 999 }))
  const logs = []
  const stats = await updatePublicVisitorCount({
    env: {},
    fetchImpl: () => assert.fail('Unexpected network request'),
    now,
    logger: {
      info: (message) => logs.push(message),
      warn: (message) => logs.push(message),
    },
    outputFile,
    ...options,
  })
  const contents = await readFile(outputFile, 'utf8')
  return { stats, contents, logs }
}

test('asks GA4 for one total across the full period and the two production hosts', () => {
  const request = reportRequest()
  assert.deepEqual(request.metrics, [{ name: 'totalUsers' }])
  assert.deepEqual(request.dateRanges, [
    { startDate: '2020-01-01', endDate: 'yesterday' },
  ])
  assert.equal(request.dimensions, undefined)
  assert.deepEqual(request.dimensionFilter.filter, {
    fieldName: 'hostName',
    inListFilter: {
      values: ['www.marcopicanco.com', 'marcopicanco.com'],
      caseSensitive: false,
    },
  })
})

test('distinguishes a real zero from unavailable or malformed reports', () => {
  assert.equal(parseTotalUsers(report('0')), 0)
  assert.equal(parseTotalUsers({ ...report(), rowCount: 0, rows: [] }), 0)
  assert.equal(parseTotalUsers({ metricHeaders: report().metricHeaders }), 0)
  for (const value of ['-1', '1.5', '9007199254740992', 'NaN', '', ' 42', 42]) {
    assert.throws(() => parseTotalUsers(report(value)))
  }
  for (const malformed of [
    null,
    {},
    { ...report(), rows: [] },
    { ...report(), rowCount: 2 },
    { ...report(), metricHeaders: [{ name: 'screenPageViews' }] },
  ]) {
    assert.throws(() => parseTotalUsers(malformed))
  }
})

test('does not publish suppressed, sampled or dimensioned totals as exact counts', () => {
  for (const metadata of [
    { subjectToThresholding: true },
    { dataLossFromOtherRow: true },
    { emptyReason: 'Data unavailable' },
    { dataTruncationReasons: [{ cause: 'TRUNCATED' }] },
    { samplingMetadatas: [{ samplesReadCount: '10' }] },
  ]) {
    assert.throws(() => parseTotalUsers({ ...report(), metadata }))
  }
  assert.throws(() =>
    parseTotalUsers({ ...report(), dimensionHeaders: [{ name: 'date' }] }),
  )
})

test('unconfigured builds reset stale data without making network requests', async (t) => {
  const result = await run(t)
  assert.deepEqual(result.stats, empty)
  assert.deepEqual(JSON.parse(result.contents), empty)
})

test('incomplete or invalid configuration remains hidden without leaking credentials', async (t) => {
  for (const configuration of [
    { GA4_PROPERTY_ID: '123456789' },
    { ...env, GA4_PROPERTY_ID: 'G-89409729L9' },
    { ...env, GA4_SERVICE_ACCOUNT_JSON: 'SECRET_INVALID_JSON' },
  ]) {
    const result = await run(t, { env: configuration })
    assert.deepEqual(result.stats, empty)
    assert.doesNotMatch(
      result.logs.join('\n'),
      /SECRET_INVALID_JSON|PRIVATE KEY/,
    )
  }
})

test('uses a signed read-only Google assertion and publishes only the aggregate', async (t) => {
  const calls = []
  const result = await run(t, {
    env,
    fetchImpl: async (url, options) => {
      calls.push(url)
      assert.equal(options.redirect, 'error')
      assert.ok(options.signal instanceof AbortSignal)
      if (calls.length === 1) {
        assert.equal(url, 'https://oauth2.googleapis.com/token')
        assert.equal(
          options.body.get('grant_type'),
          'urn:ietf:params:oauth:grant-type:jwt-bearer',
        )
        const parts = options.body.get('assertion').split('.')
        assert.equal(parts.length, 3)
        assert.equal(
          verify(
            'RSA-SHA256',
            Buffer.from(parts.slice(0, 2).join('.')),
            publicKey,
            Buffer.from(parts[2], 'base64url'),
          ),
          true,
        )
        const claims = JSON.parse(Buffer.from(parts[1], 'base64url'))
        assert.equal(claims.iss, credentials.client_email)
        assert.equal(
          claims.scope,
          'https://www.googleapis.com/auth/analytics.readonly',
        )
        assert.equal(claims.aud, url)
        assert.equal(claims.iat, Math.floor(now.getTime() / 1000))
        assert.equal(claims.exp - claims.iat, 3600)
        return jsonResponse({ access_token: 'TEST_ACCESS_TOKEN' })
      }
      assert.equal(
        url,
        'https://analyticsdata.googleapis.com/v1beta/properties/123456789:runReport',
      )
      assert.equal(options.headers.authorization, 'Bearer TEST_ACCESS_TOKEN')
      assert.deepEqual(JSON.parse(options.body), reportRequest())
      return jsonResponse({ ...report(), privateDetail: 'DO_NOT_PUBLISH' })
    },
  })
  assert.equal(calls.length, 2)
  assert.deepEqual(result.stats, {
    totalUsers: 42,
    updatedAt: now.toISOString(),
    // At 02:00 UTC it is still October 22 in the property's timezone.
    throughDate: '2026-10-21',
  })
  assert.deepEqual(JSON.parse(result.contents), result.stats)
  assert.doesNotMatch(
    result.contents + result.logs.join('\n'),
    /TEST_ACCESS_TOKEN|DO_NOT_PUBLISH|gserviceaccount|PRIVATE KEY/,
  )
})

test('API rejection hides the counter and logs status without response details', async (t) => {
  const result = await run(t, {
    env: { ...env, GITHUB_ACTIONS: 'true' },
    fetchImpl: async () => ({
      ok: false,
      status: 403,
      json: () =>
        assert.fail('Must not inspect a potentially sensitive error body'),
    }),
  })
  assert.deepEqual(result.stats, empty)
  assert.match(result.logs.join('\n'), /::warning .*HTTP 403/)
  assert.doesNotMatch(result.logs.join('\n'), /gserviceaccount|PRIVATE KEY/)
})

test('network and invalid-report failures clear the number without exposing error text', async (t) => {
  const result = await run(t, {
    env,
    fetchImpl: async () => {
      throw new Error(`Network error with ${credentials.private_key}`)
    },
  })
  assert.deepEqual(result.stats, empty)
  assert.doesNotMatch(result.logs.join('\n'), /PRIVATE KEY|Network error/)

  let calls = 0
  const missingTimezone = await run(t, {
    env,
    fetchImpl: async () =>
      jsonResponse(
        ++calls === 1
          ? { access_token: 'test' }
          : { ...report(), metadata: {} },
      ),
  })
  assert.deepEqual(missingTimezone.stats, empty)
})
