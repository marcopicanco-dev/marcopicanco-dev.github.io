import { en } from '@/i18n/en'
import { fr } from '@/i18n/fr'
import { pt, type UiStrings } from '@/i18n/pt'

// Keep in sync with i18n.locales in astro.config.mjs.
export const LANGUAGES = {
  pt: 'Português',
  en: 'English',
  fr: 'Français',
} as const

export type LanguageKeys = keyof typeof LANGUAGES
export type UiKey = keyof UiStrings

type LocaleInfo = {
  htmlLang: string
  // English and French target every reader of the language, not one country.
  hreflang: string
  ogLocale: string
  // Sharing image in public/, with the headline in this language.
  ogImage: string
  flagLabel: string
  name: string
  // Flip to true once the language has its pages under /<code>/; until then
  // the switcher shows it as "coming soon" instead of linking to a 404.
  published: boolean
}

export const LOCALE_INFO: Record<LanguageKeys, LocaleInfo> = {
  pt: {
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    ogImage: 'og.png',
    flagLabel: 'Br',
    name: 'Português (Brasil)',
    published: true,
  },
  en: {
    htmlLang: 'en-US',
    hreflang: 'en',
    ogLocale: 'en_US',
    ogImage: 'og-en.png',
    flagLabel: 'En',
    name: 'English (US)',
    published: true,
  },
  fr: {
    htmlLang: 'fr-FR',
    hreflang: 'fr',
    ogLocale: 'fr_FR',
    ogImage: 'og-fr.png',
    flagLabel: 'Fr',
    name: 'Français (France)',
    published: true,
  },
}

export const UI: Record<LanguageKeys, UiStrings> = { pt, en, fr }
