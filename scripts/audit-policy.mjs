// Decides which `npm audit --json` advisories block CI. An advisory passes only
// through a dated exception naming its id and package; once the date passes it
// blocks again, so every exception is reviewed instead of lingering.

const SEVERITY_RANK = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 }
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const advisoryId = (url = '') =>
  url.match(/GHSA(?:-[a-z0-9]{4}){3}/i)?.[0] ?? url

// Advisories that npm attributes directly to a package. Packages that are only
// affected through a dependency list that dependency's name in `via` instead,
// so each advisory is counted once, at its source.
export function listAdvisories(report) {
  const advisories = new Map()

  for (const vulnerability of Object.values(report.vulnerabilities)) {
    for (const via of vulnerability.via) {
      if (typeof via !== 'object') continue

      const id = advisoryId(via.url)
      advisories.set(`${id} ${via.name}`, {
        id,
        package: via.name,
        severity: via.severity,
        title: via.title,
        range: via.range,
        url: via.url,
      })
    }
  }

  return [...advisories.values()]
}

function validateExceptions(exceptions) {
  for (const exception of exceptions) {
    const { id, package: name, expires, reason } = exception ?? {}

    if (!id || !name || !reason?.trim() || !ISO_DATE.test(expires ?? '')) {
      throw new Error(
        `Invalid audit exception ${JSON.stringify(exception)}: id, package, reason and expires (YYYY-MM-DD) are required.`,
      )
    }
  }
}

const matches = (exception, advisory) =>
  exception.id === advisory.id && exception.package === advisory.package

export function evaluateAudit(
  report,
  exceptions,
  today,
  minimumSeverity = 'moderate',
) {
  // Fail closed: a report npm could not produce must not read as "clean".
  if (report?.error || typeof report?.vulnerabilities !== 'object') {
    throw new Error(
      `npm audit did not return a report: ${JSON.stringify(report?.error ?? report)}`,
    )
  }
  validateExceptions(exceptions)

  const threshold = SEVERITY_RANK[minimumSeverity]
  const relevant = listAdvisories(report).filter(
    // An unknown severity is treated as the worst case.
    (advisory) => (SEVERITY_RANK[advisory.severity] ?? Infinity) >= threshold,
  )

  const blocking = []
  const accepted = []

  for (const advisory of relevant) {
    const exception = exceptions.find((entry) => matches(entry, advisory))

    if (!exception) {
      blocking.push({ advisory, reason: 'no exception' })
    } else if (exception.expires < today) {
      blocking.push({
        advisory,
        reason: `exception expired on ${exception.expires}`,
      })
    } else {
      accepted.push({ advisory, exception })
    }
  }

  const unused = exceptions.filter(
    (exception) => !relevant.some((advisory) => matches(exception, advisory)),
  )

  return { blocking, accepted, unused }
}
