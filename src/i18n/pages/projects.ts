import { type LanguageKeys } from '@/i18n/ui'

export type ProjectId = 'hexa_alerts' | 'brasil_eleitoral'

type ProjectText = {
  tagline: string
  category: string
  description: string
  proposal: string
  delivery: string
  screenshotAlt: string
  challenges: { title: string; description: string }[]
}

type ProjectsContent = {
  carouselRole: string
  carouselLabel: string
  pagerLabel: string
  previous: string
  next: string
  // {name}, {current} and {total} are filled in for each slide.
  slideLabel: string
  previewLabel: string
  status: string
  proposal: string
  technologies: string
  delivery: string
  architecture: string
  repository: string
  challenges: string
  items: Record<ProjectId, ProjectText>
}

export const PROJECTS: Record<LanguageKeys, ProjectsContent> = {
  pt: {
    carouselRole: 'carrossel',
    carouselLabel: 'Projetos em destaque',
    pagerLabel: 'Escolher projeto',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    slideLabel: '{name}, {current} de {total}',
    previewLabel: '{name} / {stack}: ver o projeto no GitHub',
    status: 'Projeto {current} de {total}: {name}',
    proposal: 'A proposta',
    technologies: 'Tecnologias',
    delivery: 'A entrega',
    architecture: 'Conhecer a arquitetura',
    repository: 'Ver repositório ↗',
    challenges: 'Principais desafios',
    items: {
      hexa_alerts: {
        tagline: 'A Copa, lance a lance.',
        category: 'Projeto autoral / Aplicação web',
        description:
          'A ideia surgiu para não perder nenhum lance da Copa do Mundo e aproveitar o projeto para praticar conceitos importantes de programação: Redis, Sidekiq, webhooks e integração entre provedores de dados.',
        proposal:
          'Reunir partidas, placares e lances em um painel, com alertas conforme as preferências de cada torcedor.',
        delivery:
          'Um acervo de resultados, estatísticas e lances da Copa, com sincronização em segundo plano e atualização no navegador.',
        screenshotAlt:
          'Painel do HexaAlerts com resultados da Copa, rankings e acesso às partidas',
        challenges: [
          {
            title: 'Webhooks sem duplicação',
            description:
              'Receber o mesmo evento mais de uma vez sem registrar outro lance ou somar o mesmo gol novamente. Identificadores únicos, índice no banco e bloqueio da partida protegem o processamento concorrente.',
          },
          {
            title: 'Uma partida, vários provedores',
            description:
              'Conciliar IDs e horários diferentes usando as equipes, uma janela de horário e referências externas alternativas. Eventos e assinaturas ficam vinculados à mesma partida.',
          },
          {
            title: 'Filas sem travar o painel',
            description:
              'Responder ao webhook rapidamente e processar os eventos no Sidekiq, com Redis nas filas. Os dados ficam no PostgreSQL, e o Hotwire atualiza o navegador após a persistência.',
          },
          {
            title: 'Sincronização sem perder dados',
            description:
              'Manter a aplicação demonstrável quando uma API fica indisponível, usando um acervo local. A importação protege os placares e estados mais recentes ao combinar dados de fontes diferentes.',
          },
        ],
      },
      brasil_eleitoral: {
        tagline: 'O país, governo a governo.',
        category: 'Projeto autoral / Dashboard de dados',
        description:
          'Um dashboard sobre os presidentes que governaram o país desde a redemocratização, em 1985, com contexto político, economia, políticas e resultados eleitorais. Cada número exibido pode ser rastreado até a fonte oficial.',
        proposal:
          'Reunir em um só lugar como cada presidente chegou ao poder e o que marcou cada gestão, com comparação lado a lado entre governos.',
        delivery:
          'Uma linha do tempo com 8 presidentes, 9 governos e 10 eleições, com filtros, gráfico do IPCA, página de metodologia e exportação em CSV.',
        screenshotAlt:
          'Dashboard do Brasil Eleitoral com indicadores e a linha do tempo dos governos desde 1985',
        challenges: [
          {
            title: 'Números que podem ser conferidos',
            description:
              'Votos, inflação e leis vêm de fontes oficiais, como TSE, IBGE e Planalto. Cada registro guarda a URL, o arquivo e a data da consulta, para que qualquer pessoa refaça a conta e chegue ao mesmo resultado.',
          },
          {
            title: 'Uma base por eleição',
            description:
              'Somar a votação por turno e candidatura nos arquivos do TSE sem duplicar totais nem misturar consolidações diferentes. Os percentuais são recalculados sobre os votos válidos da mesma fonte.',
          },
          {
            title: 'Navegação sem depender de APIs',
            description:
              'Os dados ficam em arquivos versionados e são importados para o PostgreSQL em uma única transação. A carga é idempotente, e o dashboard continua funcionando quando uma fonte externa fica fora do ar.',
          },
          {
            title: 'Critérios editoriais à vista',
            description:
              'Posições políticas e seleção de políticas são sínteses editoriais, identificadas como tal. Lacunas das fontes aparecem no perfil em vez de serem preenchidas com outra base, e a metodologia explica cada escolha.',
          },
        ],
      },
    },
  },
  en: {
    carouselRole: 'carousel',
    carouselLabel: 'Featured projects',
    pagerLabel: 'Choose a project',
    previous: 'Previous project',
    next: 'Next project',
    slideLabel: '{name}, {current} of {total}',
    previewLabel: '{name} / {stack}: see the project on GitHub',
    status: 'Project {current} of {total}: {name}',
    proposal: 'The idea',
    technologies: 'Technologies',
    delivery: 'The result',
    architecture: 'Explore the architecture',
    repository: 'View repository ↗',
    challenges: 'Main challenges',
    items: {
      hexa_alerts: {
        tagline: 'The World Cup, play by play.',
        category: 'Personal project / Web application',
        description:
          'The idea came from wanting to follow every moment of the FIFA World Cup, and from using the project to practice key programming concepts: Redis, Sidekiq, webhooks and integration between data providers.',
        proposal:
          'Bring matches, scores and key moments together in one dashboard, with alerts based on each fan’s preferences.',
        delivery:
          'An archive of World Cup results, statistics and key moments, with background synchronization and live updates in the browser.',
        screenshotAlt:
          'HexaAlerts dashboard with World Cup results, rankings and access to the matches',
        challenges: [
          {
            title: 'Webhooks without duplicates',
            description:
              'Receive the same event more than once without recording another play or counting the same goal twice. Unique identifiers, a database index and a lock on the match protect concurrent processing.',
          },
          {
            title: 'One match, several providers',
            description:
              'Reconcile different IDs and kickoff times using the teams, a time window and alternative external references. Events and subscriptions stay linked to the same match.',
          },
          {
            title: 'Queues that never freeze the dashboard',
            description:
              'Respond to the webhook quickly and process events in Sidekiq, with Redis for the queues. Data is stored in PostgreSQL, and Hotwire updates the browser once it is saved.',
          },
          {
            title: 'Synchronization without data loss',
            description:
              'Keep the application demoable when an API is down, using a local archive. The import protects the latest scores and match states when combining data from different sources.',
          },
        ],
      },
      brasil_eleitoral: {
        tagline: 'Brazil, one government at a time.',
        category: 'Personal project / Data dashboard',
        description:
          'A dashboard about the presidents who have governed Brazil since the return to democracy in 1985, with political context, the economy, policies and election results. Every number shown can be traced back to its official source.',
        proposal:
          'Bring together in one place how each president came to power and what defined each term, with side-by-side comparisons between governments.',
        delivery:
          'A timeline with 8 presidents, 9 governments and 10 elections, with filters, an IPCA inflation chart, a methodology page and CSV export.',
        screenshotAlt:
          'Brasil Eleitoral dashboard with indicators and a timeline of governments since 1985',
        challenges: [
          {
            title: 'Numbers anyone can check',
            description:
              'Votes, inflation and laws come from official sources such as the TSE electoral court, IBGE and the Presidency. Each record stores the URL, the file and the date it was retrieved, so anyone can redo the math and reach the same result.',
          },
          {
            title: 'One dataset per election',
            description:
              'Add up votes by round and candidacy in the TSE files without duplicating totals or mixing different consolidations. Percentages are recalculated over valid votes from the same source.',
          },
          {
            title: 'Browsing without depending on APIs',
            description:
              'The data lives in versioned files and is imported into PostgreSQL in a single transaction. The load is idempotent, and the dashboard keeps working when an external source is offline.',
          },
          {
            title: 'Editorial criteria in plain sight',
            description:
              'Political positions and the selection of policies are editorial summaries, labeled as such. Gaps in the sources are shown on the profile instead of being filled with another dataset, and the methodology explains every choice.',
          },
        ],
      },
    },
  },
  fr: {
    carouselRole: 'carrousel',
    carouselLabel: 'Projets à la une',
    pagerLabel: 'Choisir un projet',
    previous: 'Projet précédent',
    next: 'Projet suivant',
    slideLabel: '{name}, {current} sur {total}',
    previewLabel: '{name} / {stack} : voir le projet sur GitHub',
    status: 'Projet {current} sur {total} : {name}',
    proposal: 'La proposition',
    technologies: 'Technologies',
    delivery: 'Le résultat',
    architecture: 'Découvrir l’architecture',
    repository: 'Voir le dépôt ↗',
    challenges: 'Principaux défis',
    items: {
      hexa_alerts: {
        tagline: 'La Coupe du monde, action par action.',
        category: 'Projet personnel / Application web',
        description:
          'L’idée est née de l’envie de ne manquer aucune action de la Coupe du monde, et de profiter du projet pour pratiquer des notions importantes de programmation : Redis, Sidekiq, webhooks et intégration entre fournisseurs de données.',
        proposal:
          'Réunir matchs, scores et actions dans un tableau de bord, avec des alertes selon les préférences de chaque supporter.',
        delivery:
          'Une base de résultats, de statistiques et d’actions de la Coupe du monde, avec une synchronisation en arrière-plan et une mise à jour dans le navigateur.',
        screenshotAlt:
          'Tableau de bord HexaAlerts avec les résultats de la Coupe du monde, les classements et l’accès aux matchs',
        challenges: [
          {
            title: 'Des webhooks sans doublons',
            description:
              'Recevoir le même événement plusieurs fois sans enregistrer une autre action ni compter deux fois le même but. Des identifiants uniques, un index en base et un verrou sur le match protègent le traitement concurrent.',
          },
          {
            title: 'Un match, plusieurs fournisseurs',
            description:
              'Rapprocher des identifiants et des horaires différents à partir des équipes, d’une plage horaire et de références externes alternatives. Événements et abonnements restent liés au même match.',
          },
          {
            title: 'Des files d’attente sans bloquer le tableau de bord',
            description:
              'Répondre rapidement au webhook et traiter les événements dans Sidekiq, avec Redis pour les files. Les données sont stockées dans PostgreSQL, et Hotwire met à jour le navigateur après l’enregistrement.',
          },
          {
            title: 'Une synchronisation sans perte de données',
            description:
              'Garder l’application démontrable quand une API est indisponible, grâce à une base locale. L’import protège les scores et les états les plus récents lorsqu’il combine des données de sources différentes.',
          },
        ],
      },
      brasil_eleitoral: {
        tagline: 'Le Brésil, gouvernement par gouvernement.',
        category: 'Projet personnel / Tableau de bord de données',
        description:
          'Un tableau de bord sur les présidents qui ont gouverné le Brésil depuis le retour à la démocratie en 1985, avec le contexte politique, l’économie, les politiques menées et les résultats électoraux. Chaque chiffre affiché peut être retracé jusqu’à sa source officielle.',
        proposal:
          'Réunir en un seul endroit la façon dont chaque président est arrivé au pouvoir et ce qui a marqué chaque mandat, avec une comparaison côte à côte des gouvernements.',
        delivery:
          'Une frise chronologique avec 8 présidents, 9 gouvernements et 10 élections, des filtres, un graphique de l’inflation (IPCA), une page de méthodologie et un export CSV.',
        screenshotAlt:
          'Tableau de bord Brasil Eleitoral avec des indicateurs et la frise des gouvernements depuis 1985',
        challenges: [
          {
            title: 'Des chiffres vérifiables',
            description:
              'Votes, inflation et lois proviennent de sources officielles comme le TSE (tribunal électoral), l’IBGE et la présidence. Chaque enregistrement conserve l’URL, le fichier et la date de consultation, pour que chacun puisse refaire le calcul et obtenir le même résultat.',
          },
          {
            title: 'Une base par élection',
            description:
              'Additionner les votes par tour et par candidature dans les fichiers du TSE sans dupliquer les totaux ni mélanger des consolidations différentes. Les pourcentages sont recalculés sur les suffrages exprimés de la même source.',
          },
          {
            title: 'Une navigation sans dépendre d’API',
            description:
              'Les données sont stockées dans des fichiers versionnés et importées dans PostgreSQL en une seule transaction. Le chargement est idempotent, et le tableau de bord continue de fonctionner quand une source externe est hors ligne.',
          },
          {
            title: 'Des critères éditoriaux visibles',
            description:
              'Les positions politiques et la sélection des politiques sont des synthèses éditoriales, présentées comme telles. Les lacunes des sources apparaissent sur le profil au lieu d’être comblées avec une autre base, et la méthodologie explique chaque choix.',
          },
        ],
      },
    },
  },
}
