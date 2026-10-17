/* global document, localStorage, window */
function initSiteTheme() {
  let savedTheme
  try {
    savedTheme = localStorage.getItem('theme')
  } catch {
    // Fall back to the system preference when browser storage is unavailable.
  }
  const dark =
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.setAttribute('data-theme', 'dracula')
}
initSiteTheme()
document.addEventListener('astro:after-swap', initSiteTheme)
