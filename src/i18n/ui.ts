export type LanguageKeys = keyof typeof LANGUAGES

type LanguageObject<T> = {
  [Lang in LanguageKeys]: T
}

export const LANGUAGES = {
  en: 'English',
  fr: 'French',
  pt: 'Portuguese',
} as const

export type LandingPageObj = {
  description: string
  getStartedBtnText: string
  githubBtnText: string
}

export const LANDING_PAGE: LanguageObject<LandingPageObj> = {
  en: {
    description:
      'Conteúdo sobre programação, matemática, ciência e tecnologia.',
    getStartedBtnText: 'Ler o blog',
    githubBtnText: 'Source code',
  },
  fr: {
    description:
      'Conteúdo sobre programação, matemática, ciência e tecnologia.',
    getStartedBtnText: 'Ler o blog',
    githubBtnText: 'Code source',
  },
  pt: {
    description:
      'Conteúdo sobre programação, matemática, ciência e tecnologia.',
    getStartedBtnText: 'Ler o blog',
    githubBtnText: 'Código fonte',
  },
} as const

export const NAV: LanguageObject<{
  blog: string
  portfolio: string
}> = {
  en: {
    blog: 'Blog',
    portfolio: 'Portfolio',
  },
  fr: {
    blog: 'Blog',
    portfolio: 'Portfolio',
  },
  pt: {
    blog: 'Blog',
    portfolio: 'Portifólio',
  },
} as const

export const SEARCH: LanguageObject<{
  search: string
  keepTyping: string
  noResults: string
  results: string
}> = {
  en: {
    search: 'Buscar',
    keepTyping: 'Pesquisando...',
    noResults: 'Sem resultados',
    results: 'Resulados',
  },
  fr: {
    search: 'Buscar',
    keepTyping: 'Continuez à taper...',
    noResults: 'Aucun résultat',
    results: 'Résultats',
  },
  pt: {
    search: 'Buscar',
    keepTyping: 'Continue digitando...',
    noResults: 'Nenhum resultado',
    results: 'Resultados',
  },
}
