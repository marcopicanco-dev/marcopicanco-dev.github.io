import { type LanguageKeys } from '@/i18n/ui'
import type { ThemeObjectOrShikiThemeName } from 'astro-expressive-code'

export const PROJECT_NAME = 'Marco Picanço'
// used for landing page heading and nav home link

export const SITE = {
  title: 'Marco Picanço',
}
// used for meta tags; the per-language description and og:locale live in src/i18n

export const DEFAULT_LANGUAGE_CODE: LanguageKeys = 'pt'
// when user is on '/' path, this will be the default language

export const TWITTER_USERNAME = null
// enter your twitter username if you have it

export const GITHUB_REPO_URL = 'https://github.com/marcopicanco-dev'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/marcopicanco/'
export const CONTACT_EMAIL = 'marcopicanco@live.com'

export const GISCUS = {
  repo: 'marcopicanco-dev/giscus',
  repoId: 'R_kgDOVRipTA',
  category: 'Announcements',
  // Comments stay hidden while this id is empty.
  categoryId: 'DIC_kwDOVRipTM4DJNZM',
}
// comments on blog posts, stored in that repository's GitHub Discussions

// The sharing image (1200 × 630, in public/) is set per language in
// src/i18n/ui.ts as ogImage.

export const LIGHT_MODE_CODE_BLOCK_THEME: ThemeObjectOrShikiThemeName =
  'dracula'

export const DARK_MODE_CODE_BLOCK_THEME: ThemeObjectOrShikiThemeName = 'dracula'

// list of all themes you can use: https://expressive-code.com/guides/themes/#available-themes
// if u change any of those code block theme values make sure to change them as well in astro.config.mjs inside expressiveCode in themes array
