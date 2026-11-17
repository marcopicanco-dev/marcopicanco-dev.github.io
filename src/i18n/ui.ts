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
  ogLocale: string
  flagLabel: string
  name: string
  // Flip to true once the language has its pages under /<code>/; until then
  // the switcher shows it as "coming soon" instead of linking to a 404.
  published: boolean
}

export const LOCALE_INFO: Record<LanguageKeys, LocaleInfo> = {
  pt: {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    flagLabel: 'Br',
    name: 'Português (Brasil)',
    published: true,
  },
  en: {
    htmlLang: 'en-US',
    ogLocale: 'en_US',
    flagLabel: 'En',
    name: 'English (US)',
    published: false,
  },
  fr: {
    htmlLang: 'fr-FR',
    ogLocale: 'fr_FR',
    flagLabel: 'Fr',
    name: 'Français (France)',
    published: false,
  },
}

export const UI: Record<LanguageKeys, UiStrings> = { pt, en, fr }
