/* global document, Element, window */

;(() => {
  const measurementId = 'G-89409729L9'
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

  // consent.js only loads this file after the reader accepts analytics;
  // advertising stays denied because the site runs no ads.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  gtag('js', new Date())
  gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.append(script)

  document.addEventListener('cookie-consent', (event) => {
    const granted = event.detail.analytics === true

    window[`ga-disable-${measurementId}`] = !granted
    gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    })
  })

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
