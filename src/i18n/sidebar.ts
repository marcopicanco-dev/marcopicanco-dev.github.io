import { type LanguageKeys } from '@/i18n/ui'

type SidebarSchema = {
  [Lang in LanguageKeys]: {
    introduction: string
    'getting-started': string
    'sidebar-config': string
    'writing-docs': string
    'styling-config': string
    deploying: string
  }
}

export const SIDEBAR: SidebarSchema = {
  en: {
    introduction: 'Introduction',
    'getting-started': 'Getting started',
    'sidebar-config': 'Sidebar config',
    'writing-docs': 'Writing docs',
    'styling-config': 'Styling config',
    deploying: 'Deploying',
  },
  fr: {
    introduction: 'Introduction',
    'getting-started': 'Commencer',
    'sidebar-config': 'Configuration de la sidebar',
    'writing-docs': 'Ecrire la documentation',
    'styling-config': 'Configuration du style',
    deploying: 'Deploiement',
  },
  pt: {
    introduction: 'Introducao',
    'getting-started': 'Comecando',
    'sidebar-config': 'Configuracao da sidebar',
    'writing-docs': 'Escrevendo docs',
    'styling-config': 'Configuracao de estilo',
    deploying: 'Deploy',
  },
}
