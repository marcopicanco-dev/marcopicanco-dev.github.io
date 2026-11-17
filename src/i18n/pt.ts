// Source of truth for interface text. en.ts and fr.ts must define every key.
// {name} placeholders are filled by the translator returned from getTranslations.
export const pt = {
  'site.description':
    'Desenvolvimento de sites, aplicações web e integrações. Conheça o trabalho de Marco Picanço e seus artigos sobre software e tecnologia.',
  'a11y.shortcuts': 'Atalhos',
  'a11y.skipToContent': 'Pular para o conteúdo',
  'a11y.reportProblem': 'Relatar problema de acessibilidade',
  'a11y.newTab': 'abre em nova aba',

  'nav.main': 'Navegação principal',
  'nav.homeLabel': '{name} — início',
  'nav.projects': 'Projetos',
  'nav.services': 'Serviços',
  'nav.about': 'Sobre',
  'nav.contact': 'Contato',
  'nav.blog': 'Blog',
  'nav.openMenu': 'Abrir menu de navegação',
  'nav.closeMenu': 'Fechar menu de navegação',
  'nav.menu': 'Menu de navegação',
  'nav.menuTitle': 'Navegação',
  'nav.mobile': 'Navegação móvel',
  'nav.menuNoteLine1': 'Desenvolvimento web.',
  'nav.menuNoteLine2': 'Do problema à solução.',

  'language.switcher': 'Idioma do site',
  'language.comingSoon': 'em breve',

  'theme.change': 'Alterar tema',
  'theme.light': 'Claro',
  'theme.dark': 'Escuro',

  'footer.taglineLine1': 'Software bem construído.',
  'footer.taglineLine2': 'Relações bem cuidadas.',
  'footer.links': 'Links do rodapé',
  'footer.email': 'E-mail',
  'footer.legal': 'Privacidade, termos e acessibilidade',
  'footer.privacy': 'Privacidade',
  'footer.terms': 'Termos de uso',
  'footer.accessibility': 'Acessibilidade',

  'cookies.preferences': 'Preferências de cookies',
  'cookies.bannerTitle': 'Cookies e privacidade',
  'cookies.bannerText':
    'Uso cookies necessários para o site funcionar com segurança. Com a sua permissão, também uso o Google Analytics para saber quais páginas são lidas. Você pode mudar a escolha quando quiser, em “Preferências de cookies”, no rodapé.',
  'cookies.privacyPolicy': 'Política de privacidade',
  'cookies.reject': 'Recusar',
  'cookies.accept': 'Aceitar',
  'cookies.customize': 'Personalizar',
  'cookies.closeWithoutSaving': 'Fechar sem salvar',
  'cookies.dialogIntro':
    'Escolha o que pode ser usado neste navegador. Detalhes de cada item estão na',
  'cookies.dialogIntroLink': 'política de privacidade',
  'cookies.necessary': 'Necessários',
  'cookies.alwaysOn': 'Sempre ativos',
  'cookies.necessaryText':
    'Proteção contra bots da Cloudflare, tema claro ou escuro, sua escolha sobre cookies e a sessão dos comentários quando você entra com o GitHub.',
  'cookies.analytics': 'Estatísticas',
  'cookies.analyticsText':
    'Google Analytics 4: páginas visitadas, origem do acesso e cliques em links de contato e projetos.',
  'cookies.analyticsCookies': 'Cookies',
  'cookies.analyticsNoAds': 'Não é usado para publicidade.',
  'cookies.rejectAll': 'Recusar tudo',
  'cookies.acceptAll': 'Aceitar tudo',
  'cookies.save': 'Salvar escolha',
  'common.and': 'e',

  'search.open': 'Buscar nos textos',
  'search.title': 'Buscar no blog',
  'search.close': 'Fechar busca',
  'search.label': 'O que você está procurando?',
  'search.placeholder': 'Tente Rails, Astro, segurança…',
  'search.minChars': 'Digite pelo menos 3 caracteres.',
  'search.found.one': '{count} texto encontrado',
  'search.found.other': '{count} textos encontrados',
  'search.noResults': 'Nenhum resultado',

  'blog.metaTitle': 'Blog de programação e desenvolvimento web',
  'blog.metaDescription':
    'Notas sobre programação, segurança, matemática e tecnologia. Experimentos, decisões de engenharia e aprendizados de Marco Picanço.',
  'blog.sideLabel': 'Caderno aberto',
  'blog.eyebrow': 'Programação, matemática e tecnologia',
  'blog.titleLine1': 'Ideias em código.',
  'blog.titleLine2': 'Escrevendo pra não ficar falando sozinho.',
  'blog.intro':
    'Estudos, pesquisas e aprendizados sobre programação, segurança, matemática, tecnologia e esportes.',

  'archive.title': 'Arquivo',
  'archive.filterByMonth': 'Filtrar artigos por mês',
  'archive.all': 'Todos os textos',
  'archive.count.one': '{count} texto publicado',
  'archive.count.other': '{count} textos publicados',
  'archive.clearFilter': 'Limpar filtro ×',
  'archive.featured': 'Artigos em destaque',
  'archive.readLabel': 'Ler artigo: {title}',
  'archive.readArticle': 'Ler artigo',
  'archive.more': 'Mais textos',
  'archive.empty': 'Ainda não há textos publicados neste idioma.',

  'post.allPosts': '← Todos os textos',
  'post.eyebrow': 'Artigos',
  'post.by': 'Por',
  'post.tags': 'Tags',
  'post.seriesPosition': 'Série · Parte {current} de {total}',
  'post.seriesPart': 'Parte {number} — {title}',
  'post.related': 'Leia também',
  'post.backToBlog': '← Voltar para o blog',
  'post.backToTop': 'Voltar ao início ↑',

  'tag.metaTitle': 'Artigos sobre {tag}',
  'tag.metaDescription':
    '{count} textos de Marco Picanço sobre {tag}: estudos, experimentos e aprendizados aplicados no próprio site.',
  'tag.eyebrow': 'Tag',
  'tag.description':
    '{count} textos sobre {tag}, do mais recente ao mais antigo.',

  'comments.title': 'Comentários',
  'comments.intro':
    'Para comentar ou reagir, entre com sua conta do GitHub. Os comentários ficam públicos nas',
  'comments.discussions': 'discussões do repositório',
  'comments.see': 'Veja as',
  'comments.rules': 'regras',
  'comments.andThe': 'e a',
  'comments.privacy': 'política de privacidade',

  'legal.eyebrow': 'Informações legais',
  'legal.updated': 'Última atualização',
}

export type UiStrings = Record<keyof typeof pt, string>
