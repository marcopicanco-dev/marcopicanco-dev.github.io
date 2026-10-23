// Runs on the build server. Never import credentials into browser code.
import { createPrivateKey, sign } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const READ_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
const OUTPUT_FILE = fileURLToPath(
  new URL('../src/data/public-visitor-count.json', import.meta.url),
)
const EMPTY_STATS = { totalUsers: null, updatedAt: null, throughDate: null }

class CounterError extends Error {}

export function reportRequest() {
  return {
    // Covers the property's GA4 history, including only the site's two hosts.
    dateRanges: [{ startDate: '2020-01-01', endDate: 'yesterday' }],
    metrics: [{ name: 'totalUsers' }],
    // No date dimension: adding daily unique counts would duplicate visitors.
    dimensionFilter: {
      filter: {
        fieldName: 'hostName',
        inListFilter: {
          values: ['www.marcopicanco.com', 'marcopicanco.com'],
          caseSensitive: false,
        },
      },
    },
    limit: '1',
  }
}

export function parseTotalUsers(report) {
  if (
    report?.metricHeaders?.length !== 1 ||
    report.metricHeaders[0].name !== 'totalUsers' ||
    (report.dimensionHeaders?.length ?? 0) !== 0 ||
    report.metadata?.subjectToThresholding ||
    report.metadata?.dataLossFromOtherRow ||
    report.metadata?.emptyReason ||
    (report.metadata?.dataTruncationReasons?.length ?? 0) > 0 ||
    (report.metadata?.samplingMetadatas?.length ?? 0) > 0
  ) {
    throw new CounterError(
      'O relatório não oferece um total agregado utilizável.',
    )
  }

  // Protobuf JSON may omit fields with their default value, including rowCount 0.
  if ((report.rowCount ?? 0) === 0 && (report.rows?.length ?? 0) === 0) return 0
  if (
    report.rowCount !== 1 ||
    report.rows?.length !== 1 ||
    report.rows[0].metricValues?.length !== 1
  ) {
    throw new CounterError(
      'O relatório não retornou um único total de usuários.',
    )
  }

  const raw = report.rows[0].metricValues[0].value
  if (typeof raw !== 'string' || !/^(0|[1-9]\d*)$/.test(raw)) {
    throw new CounterError('O total retornado não é um número inteiro válido.')
  }
  const count = Number(raw)
  if (!Number.isSafeInteger(count)) {
    throw new CounterError(
      'O total retornado está fora do intervalo permitido.',
    )
  }
  return count
}

function yesterdayInTimeZone(now, timeZone) {
  if (typeof timeZone !== 'string' || !timeZone) {
    throw new CounterError(
      'O relatório não informou o fuso horário da propriedade.',
    )
  }
  try {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('en', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
        .formatToParts(now)
        .map(({ type, value }) => [type, value]),
    )
    return new Date(
      Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day) - 1,
      ),
    )
      .toISOString()
      .slice(0, 10)
  } catch {
    throw new CounterError(
      'O fuso horário do relatório não pôde ser interpretado.',
    )
  }
}

async function googleJson(fetchImpl, url, options, label) {
  const response = await fetchImpl(url, {
    ...options,
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) {
    // Do not log response bodies, tokens, credentials or API error details.
    throw new CounterError(`${label} retornou HTTP ${response.status}.`)
  }
  return response.json()
}

async function fetchStats(env, fetchImpl, now) {
  const propertyId = env.GA4_PROPERTY_ID?.trim()
  const credentialsJson = env.GA4_SERVICE_ACCOUNT_JSON?.trim()
  if (!propertyId && !credentialsJson) return null
  if (!propertyId || !credentialsJson) {
    throw new CounterError('A configuração do contador está incompleta.')
  }
  if (!/^[1-9]\d*$/.test(propertyId)) {
    throw new CounterError(
      'GA4_PROPERTY_ID deve ser o ID numérico da propriedade.',
    )
  }

  let credentials, privateKey
  try {
    credentials = JSON.parse(credentialsJson)
    if (
      credentials.type !== 'service_account' ||
      typeof credentials.client_email !== 'string' ||
      !credentials.client_email.endsWith('.gserviceaccount.com') ||
      typeof credentials.private_key !== 'string'
    ) {
      throw new Error('Invalid service account')
    }
    privateKey = createPrivateKey(credentials.private_key)
    if (privateKey.asymmetricKeyType !== 'rsa')
      throw new Error('Invalid key type')
  } catch {
    throw new CounterError('A credencial da conta de serviço não é válida.')
  }

  const issuedAt = Math.floor(now.getTime() / 1000)
  const encode = (value) =>
    Buffer.from(JSON.stringify(value)).toString('base64url')
  const unsigned = [
    encode({ alg: 'RS256', typ: 'JWT' }),
    encode({
      iss: credentials.client_email,
      scope: READ_SCOPE,
      aud: TOKEN_URL,
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
  ].join('.')
  const assertion = `${unsigned}.${sign('RSA-SHA256', Buffer.from(unsigned), privateKey).toString('base64url')}`

  const token = await googleJson(
    fetchImpl,
    TOKEN_URL,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
    },
    'A autenticação do Google',
  )
  if (typeof token.access_token !== 'string' || !token.access_token) {
    throw new CounterError('O Google não retornou um token de acesso válido.')
  }

  const report = await googleJson(
    fetchImpl,
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token.access_token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(reportRequest()),
    },
    'A consulta ao Analytics',
  )

  // Publish only this allowlist, never the response or service-account object.
  return {
    totalUsers: parseTotalUsers(report),
    updatedAt: now.toISOString(),
    throughDate: yesterdayInTimeZone(now, report.metadata?.timeZone),
  }
}

export async function updatePublicVisitorCount({
  env = process.env,
  fetchImpl = fetch,
  now = new Date(),
  outputFile = OUTPUT_FILE,
  logger = console,
} = {}) {
  let stats = { ...EMPTY_STATS }
  try {
    const fetched = await fetchStats(env, fetchImpl, now)
    if (fetched) {
      stats = fetched
      logger.info('Contador público atualizado a partir do GA4.')
    } else {
      logger.info(
        'Contador público não configurado; o rodapé ficará sem a métrica.',
      )
    }
  } catch (error) {
    const reason =
      error instanceof CounterError
        ? error.message
        : 'Não foi possível concluir a consulta ao Google Analytics.'
    const message = `${reason} O site será publicado sem o contador.`
    logger.warn(
      env.GITHUB_ACTIONS
        ? `::warning title=Contador de visitantes indisponível::${message}`
        : message,
    )
  }

  // Also resets a stale local/generated value if credentials are unavailable.
  await mkdir(dirname(outputFile), { recursive: true })
  await writeFile(outputFile, `${JSON.stringify(stats, null, 2)}\n`, 'utf8')
  return stats
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await updatePublicVisitorCount()
}
