import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'

const chromeVersion = '151.0.7922.47'
const home = process.env.HOME ?? ''
const chromePath = join(
  home,
  '.browser-driver-manager',
  'chrome',
  `linux-${chromeVersion}`,
  'chrome-linux64',
  'chrome',
)
const chromeDriverPath = join(
  home,
  '.browser-driver-manager',
  'chromedriver',
  `linux-${chromeVersion}`,
  'chromedriver-linux64',
  'chromedriver',
)
const urls =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : ['http://localhost:4321/', 'http://localhost:4321/portfolio/', 'http://localhost:4321/blog/']

if (!existsSync(chromePath) || !existsSync(chromeDriverPath)) {
  console.error('Chrome/ChromeDriver not found. Run:')
  console.error('npx browser-driver-manager install chrome')
  process.exit(1)
}

const result = spawnSync(
  'npx',
  ['axe', ...urls, '--chromedriver-path', chromeDriverPath, '--exit'],
  {
    env: {
      ...process.env,
      CHROME_BIN: chromePath,
    },
    stdio: 'inherit',
  },
)

process.exit(result.status ?? 1)
