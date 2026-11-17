import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluateAudit, listAdvisories } from '../scripts/audit-policy.mjs'

const advisory = (name, severity, ghsa) => ({
  source: 1,
  name,
  dependency: name,
  title: `${name} advisory`,
  url: `https://github.com/advisories/${ghsa}`,
  severity,
  range: '<=1.0.0',
})

// Shape of `npm audit --json`: the vulnerable package lists the advisory
// object, packages that depend on it list only the package name.
const report = (...advisories) => ({
  auditReportVersion: 2,
  vulnerabilities: Object.fromEntries([
    ...advisories.map((entry) => [
      entry.name,
      { name: entry.name, severity: entry.severity, via: [entry] },
    ]),
    ...advisories.map((entry) => [
      `uses-${entry.name}`,
      {
        name: `uses-${entry.name}`,
        severity: entry.severity,
        via: [entry.name],
      },
    ]),
  ]),
})

const picomatch = advisory('picomatch', 'high', 'GHSA-fc5q-39xc-vjpf')
const exception = {
  id: 'GHSA-fc5q-39xc-vjpf',
  package: 'picomatch',
  expires: '2026-12-17',
  reason: 'Build-time globs only.',
}

test('each advisory is listed once, at the package that has it', () => {
  assert.deepEqual(
    listAdvisories(report(picomatch)).map((entry) => entry.id),
    ['GHSA-fc5q-39xc-vjpf'],
  )
})

test('an advisory without an exception blocks', () => {
  const result = evaluateAudit(report(picomatch), [], '2026-11-17')

  assert.equal(result.blocking.length, 1)
  assert.equal(result.blocking[0].reason, 'no exception')
})

test('an exception accepts its advisory through the expiry date', () => {
  const result = evaluateAudit(report(picomatch), [exception], '2026-12-17')

  assert.deepEqual(result.blocking, [])
  assert.equal(result.accepted.length, 1)
})

test('an expired exception blocks again', () => {
  const result = evaluateAudit(report(picomatch), [exception], '2026-12-18')

  assert.equal(result.blocking[0].reason, 'exception expired on 2026-12-17')
})

test('an exception covers only the package it names', () => {
  const other = advisory('other-glob', 'high', 'GHSA-fc5q-39xc-vjpf')
  const result = evaluateAudit(report(other), [exception], '2026-11-17')

  assert.equal(result.blocking.length, 1)
  assert.deepEqual(result.unused, [exception])
})

test('low advisories pass and unknown severities block', () => {
  const low = advisory('low-pkg', 'low', 'GHSA-aaaa-bbbb-cccc')
  const odd = advisory('odd-pkg', 'unrated', 'GHSA-dddd-eeee-ffff')
  const result = evaluateAudit(report(low, odd), [], '2026-11-17')

  assert.deepEqual(
    result.blocking.map(({ advisory: entry }) => entry.package),
    ['odd-pkg'],
  )
})

test('a failed audit run blocks instead of passing as clean', () => {
  assert.throws(
    () => evaluateAudit({ error: { code: 'ENOTFOUND' } }, [], '2026-11-17'),
    /did not return a report/,
  )
})

test('an exception without a reason or a valid date is rejected', () => {
  assert.throws(
    () =>
      evaluateAudit(
        report(picomatch),
        [{ ...exception, reason: ' ' }],
        '2026-11-17',
      ),
    /Invalid audit exception/,
  )
  assert.throws(
    () =>
      evaluateAudit(
        report(picomatch),
        [{ ...exception, expires: '17/12/2026' }],
        '2026-11-17',
      ),
    /Invalid audit exception/,
  )
})
