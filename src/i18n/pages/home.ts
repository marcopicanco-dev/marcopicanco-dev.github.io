import { type LanguageKeys } from '@/i18n/ui'

type HomeContent = {
  metaTitle: string
  metaDescription: string
  hero: {
    axis: string
    eyebrow: string
    // The last line is highlighted.
    titleLines: [string, string, string]
    description: string
    primaryCta: string
    secondaryCta: string
    footnote: string
  }
  services: {
    axis: string
    eyebrow: string
    titleLines: [string, string]
    intro: string
    // {service} is the service title in lower case.
    contactLabel: string
    items: { title: string; description: string; detail: string }[]
  }
  projects: {
    axis: string
    eyebrow: string
    title: string
    githubCta: string
  }
  process: {
    axis: string
    eyebrow: string
    title: string
    intro: string
    steps: { title: string; text: string }[]
  }
  about: {
    axis: string
    caption: string
    eyebrow: string
    titleLines: [string, string]
    paragraphs: string[]
    cta: string
  }
  writing: {
    axis: string
    eyebrow: string
    title: string
    cta: string
  }
  contact: {
    axis: string
    eyebrow: string
    // Followed by the highlighted question mark.
    titleLines: [string, string]
    text: string
    emailCta: string
    linkedinCta: string
  }
}

export const HOME: Record<LanguageKeys, HomeContent> = {
  pt: {
    metaTitle: 'Desenvolvimento de sites e sistemas web',
    metaDescription:
      'Criação de sites, sistemas web e integrações com APIs. Conheça os projetos de Marco Picanço, desenvolvedor Full Stack, e converse sobre seu projeto.',
    hero: {
      axis: 'Clareza na ideia. Precisão na entrega.',
      eyebrow: 'Desenvolvimento web',
      titleLines: ['Boas ideias', 'merecem software', 'bem construído.'],
      description:
        'Sites, sistemas e aplicações web pensados para facilitar o dia a dia do seu negócio. Do entendimento do problema à evolução do produto.',
      primaryCta: 'Conversar sobre um projeto',
      secondaryCta: 'Conhecer soluções',
      footnote: 'Visão de negócio. Cuidado com o código.',
    },
    services: {
      axis: 'Serviços',
      eyebrow: 'O que podemos construir',
      titleLines: ['Tecnologia que resolve.', 'Sem complicar.'],
      intro:
        'Da primeira presença digital à evolução de um sistema. O ponto de partida é o que o seu negócio precisa.',
      contactLabel: 'Conversar sobre {service}',
      items: [
        {
          title: 'Sites e presença digital',
          description:
            'Um lugar claro para apresentar seu negócio. Sites rápidos, responsivos e fáceis de navegar, com conteúdo que ajuda seu cliente a dar o próximo passo.',
          detail: 'Sites institucionais · Landing pages · Blogs',
        },
        {
          title: 'Sistemas e aplicações web',
          description:
            'Menos planilhas paralelas, mais organização. Aplicações que funcionam no navegador para reunir informações, simplificar rotinas e apoiar a operação.',
          detail: 'Ruby on Rails · Backoffice · Bancos de dados',
        },
        {
          title: 'Integrações e evolução',
          description:
            'Seu software acompanhando o seu negócio. Conecto sistemas, investigo falhas e evoluo o que já existe, com testes e atenção às regras importantes.',
          detail: 'APIs · Webhooks · Manutenção · Testes',
        },
      ],
    },
    projects: {
      axis: 'Na prática',
      eyebrow: 'Portfólio',
      title: 'Projetos',
      githubCta: 'Explorar o GitHub',
    },
    process: {
      axis: 'Como trabalho',
      eyebrow: 'Um caminho compartilhado',
      title: 'Clareza em cada etapa.',
      intro:
        'Boas entregas começam com boas conversas. E continuam com decisões que fazem sentido para quem vai usar.',
      steps: [
        {
          title: 'Entender',
          text: 'Mapear o cenário atual para entender o problema, o contexto e os objetivos. O ponto de partida é a clareza do que precisa ser resolvido.',
        },
        {
          title: 'Definir',
          text: 'Alinhamos escopo, prioridades e responsabilidades. Você sabe o que será construído.',
        },
        {
          title: 'Construir',
          text: 'Desenvolvo em etapas, com testes e validações para ajustar o caminho com você.',
        },
        {
          title: 'Acompanhar',
          text: 'Publicamos a solução com documentação e combinamos os próximos passos da evolução.',
        },
      ],
    },
    about: {
      axis: 'Quem está por trás',
      caption: 'Marco Picanço / Desenvolvedor',
      eyebrow: 'Olá, meu nome é Marco Aurélio.',
      titleLines: ['Código com contexto.', 'Tecnologia com propósito.'],
      paragraphs: [
        'Sou desenvolvedor Full Stack, com experiência em Ruby on Rails, APIs e evolução de sistemas. Antes do software, trabalhei com vendas e sucesso do cliente. Essa trajetória me ensinou a ouvir antes de propor uma solução.',
        'Engenharia de Software, Big Data e Ciência da Computação fazem parte da minha formação. A curiosidade por matemática e computação também encontra espaço nos textos que publico por aqui.',
      ],
      cta: 'Conhecer minha trajetória',
    },
    writing: {
      axis: 'Escrita',
      eyebrow: 'VALE A PENA CONFERIR',
      title: 'Aprender. Fazer. Compartilhar.',
      cta: 'Todos os textos',
    },
    contact: {
      axis: 'Próximo passo',
      eyebrow: 'Uma boa conversa é o começo.',
      titleLines: ['O que vamos', 'construir juntos'],
      text: 'Conte o que você tem em mente, o que precisa resolver ou onde o seu projeto parou. Vamos encontrar um caminho.',
      emailCta: 'Conversar por e-mail',
      linkedinCta: 'Prefere o LinkedIn?',
    },
  },
  en: {
    metaTitle: 'Website and web application development',
    metaDescription:
      'Websites, web applications and API integrations. Explore the projects of Marco Picanço, Full Stack developer, and talk about your project.',
    hero: {
      axis: 'Clear ideas. Precise delivery.',
      eyebrow: 'Web development',
      titleLines: ['Good ideas', 'deserve software', 'that is well built.'],
      description:
        'Websites, systems and web applications designed to make your business run more smoothly. From understanding the problem to evolving the product.',
      primaryCta: 'Talk about a project',
      secondaryCta: 'See what I build',
      footnote: 'Business sense. Care for the code.',
    },
    services: {
      axis: 'Services',
      eyebrow: 'What we can build',
      titleLines: ['Technology that solves problems.', 'Without the fuss.'],
      intro:
        'From a first online presence to the evolution of an existing system. The starting point is what your business needs.',
      contactLabel: 'Talk about {service}',
      items: [
        {
          title: 'Websites and online presence',
          description:
            'A clear place to present your business. Fast, responsive, easy-to-navigate websites, with content that helps your customers take the next step.',
          detail: 'Company websites · Landing pages · Blogs',
        },
        {
          title: 'Systems and web applications',
          description:
            'Fewer side spreadsheets, more organization. Browser-based applications that bring information together, simplify routines and support your operations.',
          detail: 'Ruby on Rails · Back office · Databases',
        },
        {
          title: 'Integrations and evolution',
          description:
            'Software that keeps up with your business. I connect systems, investigate failures and improve what already exists, with tests and attention to the rules that matter.',
          detail: 'APIs · Webhooks · Maintenance · Testing',
        },
      ],
    },
    projects: {
      axis: 'In practice',
      eyebrow: 'Portfolio',
      title: 'Projects',
      githubCta: 'Explore GitHub',
    },
    process: {
      axis: 'How I work',
      eyebrow: 'A shared path',
      title: 'Clarity at every step.',
      intro:
        'Good deliveries start with good conversations. And they continue with decisions that make sense for the people who will use them.',
      steps: [
        {
          title: 'Understand',
          text: 'Map the current situation to understand the problem, the context and the goals. The starting point is clarity about what needs to be solved.',
        },
        {
          title: 'Define',
          text: 'We agree on scope, priorities and responsibilities. You know what will be built.',
        },
        {
          title: 'Build',
          text: 'I develop in stages, with tests and reviews so we can adjust the course together.',
        },
        {
          title: 'Follow up',
          text: 'We launch the solution with documentation and agree on the next steps for its evolution.',
        },
      ],
    },
    about: {
      axis: 'Who is behind it',
      caption: 'Marco Picanço / Developer',
      eyebrow: 'Hi, my name is Marco Aurélio.',
      titleLines: ['Code with context.', 'Technology with purpose.'],
      paragraphs: [
        'I am a Full Stack developer with experience in Ruby on Rails, APIs and evolving existing systems. Before software, I worked in sales and customer success. That path taught me to listen before proposing a solution.',
        'Software Engineering, Big Data and Computer Science are part of my education. My curiosity about mathematics and computing also finds its way into the articles I publish here.',
      ],
      cta: 'See my career path',
    },
    writing: {
      axis: 'Writing',
      eyebrow: 'WORTH A READ',
      title: 'Learn. Build. Share.',
      cta: 'All articles',
    },
    contact: {
      axis: 'Next step',
      eyebrow: 'A good conversation is the beginning.',
      titleLines: ['What shall we', 'build together'],
      text: 'Tell me what you have in mind, what you need to solve or where your project got stuck. Let’s find a way forward.',
      emailCta: 'Talk by email',
      linkedinCta: 'Prefer LinkedIn?',
    },
  },
  fr: {
    metaTitle: 'Création de sites et d’applications web',
    metaDescription:
      'Création de sites, d’applications web et d’intégrations d’API. Découvrez les projets de Marco Picanço, développeur Full Stack, et parlons de votre projet.',
    hero: {
      axis: 'Des idées claires. Une réalisation précise.',
      eyebrow: 'Développement web',
      titleLines: [
        'Les bonnes idées',
        'méritent des logiciels',
        'bien construits.',
      ],
      description:
        'Des sites, des systèmes et des applications web conçus pour faciliter le quotidien de votre entreprise. De la compréhension du problème à l’évolution du produit.',
      primaryCta: 'Parler d’un projet',
      secondaryCta: 'Découvrir les solutions',
      footnote: 'Vision métier. Soin du code.',
    },
    services: {
      axis: 'Services',
      eyebrow: 'Ce que nous pouvons construire',
      titleLines: ['Une technologie qui résout.', 'Sans compliquer.'],
      intro:
        'De la première présence en ligne à l’évolution d’un système. Le point de départ, ce sont les besoins de votre entreprise.',
      contactLabel: 'Parler de {service}',
      items: [
        {
          title: 'Sites et présence en ligne',
          description:
            'Un espace clair pour présenter votre activité. Des sites rapides, adaptés à tous les écrans et faciles à parcourir, avec un contenu qui aide vos clients à passer à l’étape suivante.',
          detail: 'Sites vitrines · Landing pages · Blogs',
        },
        {
          title: 'Systèmes et applications web',
          description:
            'Moins de tableurs en parallèle, plus d’organisation. Des applications dans le navigateur pour centraliser les informations, simplifier les tâches et soutenir l’activité.',
          detail: 'Ruby on Rails · Back-office · Bases de données',
        },
        {
          title: 'Intégrations et évolution',
          description:
            'Un logiciel qui suit votre entreprise. Je connecte des systèmes, j’analyse les pannes et je fais évoluer l’existant, avec des tests et une attention particulière aux règles importantes.',
          detail: 'API · Webhooks · Maintenance · Tests',
        },
      ],
    },
    projects: {
      axis: 'En pratique',
      eyebrow: 'Portfolio',
      title: 'Projets',
      githubCta: 'Explorer GitHub',
    },
    process: {
      axis: 'Ma méthode',
      eyebrow: 'Un chemin partagé',
      title: 'De la clarté à chaque étape.',
      intro:
        'Les bons résultats commencent par de bonnes conversations. Et se poursuivent avec des décisions qui ont du sens pour ceux qui vont les utiliser.',
      steps: [
        {
          title: 'Comprendre',
          text: 'Analyser la situation actuelle pour comprendre le problème, le contexte et les objectifs. Le point de départ, c’est savoir clairement ce qu’il faut résoudre.',
        },
        {
          title: 'Définir',
          text: 'Nous fixons ensemble le périmètre, les priorités et les responsabilités. Vous savez ce qui sera construit.',
        },
        {
          title: 'Construire',
          text: 'Je développe par étapes, avec des tests et des validations pour ajuster le cap avec vous.',
        },
        {
          title: 'Accompagner',
          text: 'Nous mettons la solution en ligne avec sa documentation et convenons des prochaines étapes de son évolution.',
        },
      ],
    },
    about: {
      axis: 'Qui est derrière',
      caption: 'Marco Picanço / Développeur',
      eyebrow: 'Bonjour, je m’appelle Marco Aurélio.',
      titleLines: [
        'Du code avec du contexte.',
        'De la technologie avec du sens.',
      ],
      paragraphs: [
        'Je suis développeur Full Stack, avec de l’expérience en Ruby on Rails, en API et dans l’évolution de systèmes. Avant le logiciel, j’ai travaillé dans la vente et la réussite client. Ce parcours m’a appris à écouter avant de proposer une solution.',
        'Le génie logiciel, le Big Data et l’informatique font partie de ma formation. Ma curiosité pour les mathématiques et l’informatique trouve aussi sa place dans les articles que je publie ici.',
      ],
      cta: 'Découvrir mon parcours',
    },
    writing: {
      axis: 'Écriture',
      eyebrow: 'À LIRE',
      title: 'Apprendre. Faire. Partager.',
      cta: 'Tous les articles',
    },
    contact: {
      axis: 'Prochaine étape',
      eyebrow: 'Une bonne conversation, c’est le début.',
      titleLines: ['Qu’allons-nous', 'construire ensemble '],
      text: 'Dites-moi ce que vous avez en tête, ce que vous devez résoudre ou là où votre projet s’est arrêté. Nous trouverons une solution.',
      emailCta: 'Écrire par e-mail',
      linkedinCta: 'Vous préférez LinkedIn ?',
    },
  },
}
