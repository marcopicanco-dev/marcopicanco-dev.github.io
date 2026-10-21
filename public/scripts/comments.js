/* global document, window, IntersectionObserver, MutationObserver */
// Loads giscus only when the reader gets close to the comments, so readers who
// never scroll there make no request to giscus.app, and keeps its theme in
// sync with the site theme switcher.
const giscusOrigin = 'https://giscus.app'

function getGiscusTheme() {
  return document.documentElement.classList.contains('dark')
    ? 'dark_dimmed'
    : 'light'
}

function loadGiscus(container) {
  const script = document.createElement('script')

  script.src = `${giscusOrigin}/client.js`
  script.async = true
  script.crossOrigin = 'anonymous'
  Object.assign(script.dataset, container.dataset, {
    theme: getGiscusTheme(),
  })
  container.after(script)
}

function syncGiscusTheme() {
  const frame = document.querySelector('iframe.giscus-frame')

  frame?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: getGiscusTheme() } } },
    giscusOrigin,
  )
}

const container = document.querySelector('.giscus[data-repo]')

if (container) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        loadGiscus(container)
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(container)
  } else {
    loadGiscus(container)
  }

  new MutationObserver(syncGiscusTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}
