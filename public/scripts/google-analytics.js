/* global document, Element, window */

;(() => {
  const measurementId = 'G-EELP6HSE1R'
  const productionHosts = ['www.marcopicanco.com', 'marcopicanco.com']

  if (
    window.location.protocol !== 'https:' ||
    !productionHosts.includes(window.location.hostname)
  ) {
    return
  }

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.append(script)

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return

    const link = event.target.closest(
      'a[data-analytics-contact], a[data-analytics-project]',
    )
    if (!link) return

    const linkLocation = link.dataset.analyticsLocation

    if (link.dataset.analyticsContact) {
      gtag('event', 'contact_click', {
        contact_method: link.dataset.analyticsContact,
        link_location: linkLocation,
      })
    } else {
      gtag('event', 'project_click', {
        project_id: link.dataset.analyticsProject,
        link_location: linkLocation,
      })
    }
  })
})()
