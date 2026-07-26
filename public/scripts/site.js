/* global document, HTMLAnchorElement, localStorage, window */

const lightModeCodeBlockTheme = 'dracula'
const darkModeCodeBlockTheme = 'dracula'

function initSiteTheme() {
  document.documentElement.classList.add('scroll-smooth')

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
    document.documentElement.setAttribute('data-theme', darkModeCodeBlockTheme)
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.setAttribute('data-theme', lightModeCodeBlockTheme)
  }

  setTimeout(() => {
    document.body.classList.add('duration-300', 'transition-colors')
  }, 300)
}

function setupEmailLinks() {
  const links = document.querySelectorAll('[data-email-link]')

  links.forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return

    const { emailUser, emailDomain } = link.dataset

    if (!emailUser || !emailDomain) return

    const scheme = ['mai', 'lto:'].join('')

    link.href = `${scheme}${emailUser}@${emailDomain}`
  })
}

initSiteTheme()
setupEmailLinks()
document.addEventListener('astro:after-swap', initSiteTheme)
document.addEventListener('astro:after-swap', setupEmailLinks)
