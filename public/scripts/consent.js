/* global document, Element, localStorage, window */
// Cookie consent (LGPD): Google Analytics only loads after the reader opts in,
// and the choice can be changed at any time from the footer.
const storageKey = 'cookie-consent'
// Bump when the privacy policy changes what is collected, to ask again.
const consentVersion = 1
const consentMaxAgeMs = 365 * 24 * 60 * 60 * 1000
const analyticsScriptSrc = '/scripts/google-analytics.js'

const banner = document.querySelector('[data-cookie-banner]')
const dialog = document.querySelector('[data-cookie-dialog]')
const analyticsToggle = document.querySelector('[data-cookie-analytics]')

function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    const isCurrent =
      saved?.version === consentVersion &&
      Date.now() - Date.parse(saved.date) < consentMaxAgeMs

    return isCurrent ? saved : null
  } catch {
    return null
  }
}

let consent = readConsent()

function loadAnalytics() {
  if (document.querySelector(`script[src="${analyticsScriptSrc}"]`)) return

  const script = document.createElement('script')
  script.src = analyticsScriptSrc
  document.head.append(script)
}

// GA sets its cookies on the registrable domain, so clear both scopes.
function deleteAnalyticsCookies() {
  const host = window.location.hostname
  const domains = [
    '',
    `; domain=${host}`,
    `; domain=.${host.replace(/^www\./, '')}`,
  ]

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!name.startsWith('_ga')) continue

    for (const domain of domains) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`
    }
  }
}

function saveConsent(analytics) {
  const hadAnalytics = consent?.analytics === true

  consent = {
    version: consentVersion,
    analytics,
    date: new Date().toISOString(),
  }
  try {
    localStorage.setItem(storageKey, JSON.stringify(consent))
  } catch {
    // Without storage the choice still applies to the current page.
  }

  document.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }))

  if (analytics) {
    loadAnalytics()
  } else if (hadAnalytics) {
    deleteAnalyticsCookies()
  }
  banner?.setAttribute('hidden', '')
}

function openPreferences() {
  if (!dialog || !analyticsToggle) return

  analyticsToggle.checked = consent?.analytics === true
  dialog.showModal()
}

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return

  const control = event.target.closest('[data-cookie-action]')
  if (!control) return

  const action = control.dataset.cookieAction

  if (action === 'preferences') {
    openPreferences()
    return
  }
  if (action === 'accept') saveConsent(true)
  if (action === 'reject') saveConsent(false)
  if (action === 'save') saveConsent(analyticsToggle?.checked === true)
  if (dialog?.open) dialog.close()
})

if (consent?.analytics) {
  loadAnalytics()
} else if (!consent) {
  banner?.removeAttribute('hidden')
}
