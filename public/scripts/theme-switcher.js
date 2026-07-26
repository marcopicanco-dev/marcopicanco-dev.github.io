/* global document, localStorage */

const themeSwitcherButtonSelector = '.theme-switcher-button'
const themeSwitcherMenuSelector = '.theme-switcher-menu'

function applyTheme(theme) {
  const element = document.documentElement

  if (theme === 'dark') {
    element.classList.add('dark')
    element.setAttribute('data-theme', 'dracula')
  } else {
    element.classList.remove('dark')
    element.setAttribute('data-theme', 'dracula')
  }

  localStorage.setItem('theme', theme)
  updateThemeChecks(theme)
}

function getCurrentTheme() {
  if (localStorage.theme === 'dark' || localStorage.theme === 'light') {
    return localStorage.theme
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function updateThemeChecks(theme) {
  const options = document.querySelectorAll('.theme-option')

  options.forEach((option) => {
    const isSelected = option.dataset.themeValue === theme
    const check = option.querySelector('.theme-check')

    check?.classList.toggle('hidden', !isSelected)
  })
}

function closeThemeMenus() {
  const switchers = document.querySelectorAll('.theme-switcher')

  switchers.forEach((root) => {
    const button = root.querySelector(themeSwitcherButtonSelector)
    const menu = root.querySelector(themeSwitcherMenuSelector)

    button?.setAttribute('aria-expanded', 'false')
    menu?.classList.add('invisible', 'opacity-0')
    menu?.classList.remove('visible', 'opacity-100')
  })
}

function setupThemeSwitcher() {
  updateThemeChecks(getCurrentTheme())

  const switchers = document.querySelectorAll('.theme-switcher')

  switchers.forEach((root) => {
    if (root.dataset.bound === 'true') return
    root.dataset.bound = 'true'

    const button = root.querySelector(themeSwitcherButtonSelector)
    const menu = root.querySelector(themeSwitcherMenuSelector)

    button?.addEventListener('click', (event) => {
      event.stopPropagation()
      const isOpen = button.getAttribute('aria-expanded') === 'true'

      closeThemeMenus()

      if (!isOpen) {
        button.setAttribute('aria-expanded', 'true')
        menu?.classList.add('visible', 'opacity-100')
        menu?.classList.remove('invisible', 'opacity-0')
      }
    })

    const options = root.querySelectorAll('.theme-option')

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const theme = option.dataset.themeValue

        if (theme === 'light' || theme === 'dark') {
          applyTheme(theme)
          closeThemeMenus()
        }
      })
    })
  })
}

setupThemeSwitcher()
document.addEventListener('click', closeThemeMenus)
document.addEventListener('astro:after-swap', setupThemeSwitcher)
