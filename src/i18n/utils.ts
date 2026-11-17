import { DEFAULT_LANGUAGE_CODE } from '@/config'
import {
  LANGUAGES,
  LOCALE_INFO,
  UI,
  type LanguageKeys,
  type UiKey,
} from '@/i18n/ui'

export const isLanguage = (value: unknown): value is LanguageKeys =>
  typeof value === 'string' && Object.hasOwn(LANGUAGES, value)

// Pass Astro.currentLocale: Astro derives it from the URL prefix (/en/, /fr/)
// and falls back to the default locale for unprefixed pages.
export const getLang = (locale: string | undefined): LanguageKeys =>
  isLanguage(locale) ? locale : DEFAULT_LANGUAGE_CODE

export type Translate = (
  key: UiKey,
  params?: Record<string, string | number>,
) => string

// Fills {name} placeholders; unknown ones are kept for a later pass.
export const formatMessage = (
  template: string,
  params: Record<string, string | number> = {},
) =>
  template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in params ? String(params[name]) : placeholder,
  )

export const getTranslations =
  (lang: LanguageKeys): Translate =>
  (key, params) =>
    formatMessage(UI[lang][key], params)

// Paths are written in their Portuguese form ('/sobre/', '/#contato') and get
// the language prefix for the other locales.
export const localizePath = (path: string, lang: LanguageKeys) =>
  lang === DEFAULT_LANGUAGE_CODE ? path : `/${lang}${path}`

export const stripLangPrefix = (pathname: string) => {
  const [, first, ...rest] = pathname.split('/')

  return isLanguage(first) && first !== DEFAULT_LANGUAGE_CODE
    ? `/${rest.join('/')}`
    : pathname
}

// A language gets its pages once published. In dev every language is built,
// so translations can be previewed before they go live.
export const isLanguageAvailable = (lang: LanguageKeys) =>
  LOCALE_INFO[lang].published || import.meta.env.DEV

// getStaticPaths for src/pages/[lang]/: Portuguese is served from the root.
export const getLanguageStaticPaths = () =>
  (Object.keys(LOCALE_INFO) as LanguageKeys[])
    .filter(
      (lang) => lang !== DEFAULT_LANGUAGE_CODE && isLanguageAvailable(lang),
    )
    .map((lang) => ({ params: { lang } }))
