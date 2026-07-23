import { type LanguageKeys } from '@/i18n/ui'
import type { ThemeObjectOrShikiThemeName } from 'astro-expressive-code'

export const PROJECT_NAME = 'Marco Picanço'
// used for landing page heading and nav home link

export const SITE = {
  title: 'Marco Picanço',
  description: 'Blog estático construído com Astro.',
  defaultLanguage: 'en_US', // don't mistaken this with DEFAULT_LANGUAGE_CODE below, this is used only for meta tags
}
// used for meta tags

export const DEFAULT_LANGUAGE_CODE: LanguageKeys = 'en'
// when user is on '/' path, this will be the default language

export const TWITTER_USERNAME = null
// enter your twitter username if you have it

export const GITHUB_REPO_URL = 'https://github.com/marcopicanco-dev'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/marcopicanco/'

export const OG_IMAGE = 'og.png'
// enter name of the og image file you put inside public folder
// image should be 1200 X 630 pixels

export const LIGHT_MODE_CODE_BLOCK_THEME: ThemeObjectOrShikiThemeName =
  'dracula'

export const DARK_MODE_CODE_BLOCK_THEME: ThemeObjectOrShikiThemeName = 'dracula'

// list of all themes you can use: https://expressive-code.com/guides/themes/#available-themes
// if u change any of those code block theme values make sure to change them as well in astro.config.mjs inside expressiveCode in themes array
