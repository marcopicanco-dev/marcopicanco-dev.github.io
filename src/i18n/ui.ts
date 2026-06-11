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
    description: 'Modern type-safe documentation theme for Astro.',
    getStartedBtnText: 'Get started',
    githubBtnText: 'Source code',
  },
  fr: {
    description: 'Thème de documentation moderne et typé pour Astro.',
    getStartedBtnText: 'Commencer',
    githubBtnText: 'Code source',
  },
  pt: {
    description: 'Moderna Astro tema para documentação com suporte a Typescript.',
    getStartedBtnText: 'Começar',
    githubBtnText: 'Código fonte',
  },
} as const

export const NAV: LanguageObject<{
  documentation: string
  blog: string
}> = {
  en: {
    documentation: 'Docs',
    blog: 'Blog',
  },
  fr: {
    documentation: 'Docs',
    blog: 'Blog',
  },
  pt: {
    documentation: 'Docs',
    blog: 'Blog',
  },
} as const

export const ON_THIS_PAGE: LanguageObject<{
  onThisPage: string
  scrollToTop: string
}> = {
  en: {
    onThisPage: 'On this page',
    scrollToTop: 'Scroll to top',
  },
  fr: {
    onThisPage: 'Sur cette page',
    scrollToTop: 'Retour en haut',
  },
  pt: {
    onThisPage: 'Nesta página',
    scrollToTop: 'Ir para o topo',
  },
}

export const MISC: LanguageObject<{
  editThisPage: string
  previous: string
  next: string
}> = {
  en: {
    editThisPage: 'Edit this page',
    next: 'Next',
    previous: 'Previous',
  },
  fr: {
    editThisPage: 'Modifier cette page',
    next: 'Suivant',
    previous: 'Précédent',
  },
  pt: {
    editThisPage: 'Editar esta página',
    next: 'Avançar',
    previous: 'Voltar',
  },
}

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
