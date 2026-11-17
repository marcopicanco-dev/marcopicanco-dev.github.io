import { type LanguageKeys } from '@/i18n/ui'

export type EducationId = 'puc' | 'descomplica' | 'anhanguera' | 'estacio'

type EducationText = {
  title: string
  period: string
  summary: string
  skills: string[]
}

type AboutContent = {
  metaTitle: string
  metaDescription: string
  breadcrumbHome: string
  breadcrumbCurrent: string
  axis: string
  eyebrow: string
  // The second line is highlighted.
  titleLines: [string, string]
  jobTitle: string
  heading: string
  paragraphs: string[]
  educationEyebrow: string
  educationTitle: string
  skillsLabel: string
  education: Record<EducationId, EducationText>
  invitation: string
  contactCta: string
}

export const ABOUT: Record<LanguageKeys, AboutContent> = {
  pt: {
    metaTitle: 'Desenvolvedor Full Stack Ruby on Rails',
    metaDescription:
      'Conheça a trajetória de Marco Picanço: desenvolvimento web, Ruby on Rails, Engenharia de Software e uma visão de negócios construída com pessoas.',
    breadcrumbHome: 'Início',
    breadcrumbCurrent: 'Sobre',
    axis: 'Trajetória',
    eyebrow: 'Pessoas, negócios e software.',
    titleLines: ['Sou Marco Picanço.', 'Prazer em construir.'],
    jobTitle: 'Desenvolvedor Full Stack',
    heading: 'Entender o problema faz parte de escrever o código.',
    paragraphs: [
      'Minha trajetória passa por Administração, vendas e sucesso do cliente antes de chegar ao desenvolvimento de software. Trabalhar perto de pessoas e negócios me ensinou a fazer perguntas, entender prioridades e cuidar da comunicação.',
      'No desenvolvimento Full Stack, minha experiência inclui APIs, testes automatizados e evolução de backoffice com Ruby on Rails na OrçaFascio. Trabalho com regras de negócio, integrações e manutenção de sistemas, com atenção à qualidade e à clareza do código.',
      'A formação em Engenharia de Software, Big Data e Ciência da Computação complementa essa prática. Fora do código, o jiu-jitsu me ajuda a cultivar disciplina e calma para lidar com desafios.',
    ],
    educationEyebrow: 'Base para a prática',
    educationTitle: 'Formação acadêmica.',
    skillsLabel: 'Competências:',
    education: {
      puc: {
        title: 'Pós-graduação em Engenharia de Software',
        period: 'mar de 2023 - abr de 2024',
        summary:
          'Formação com base em Ciência da Computação, Matemática e Produção, voltada à construção, operação, manutenção e evolução de soluções de software de alta qualidade. Integra práticas técnicas e gerenciais, tecnologias modernas e inovação, considerando aspectos éticos, sociais, legais, econômicos e de segurança. Abrange arquitetura de software, liderança técnica, gestão de projetos, pesquisa e melhoria contínua dos processos de desenvolvimento.',
        skills: [
          'Análise, modelagem e especificação de software',
          'Arquitetura e projeto de software',
          'Programação e construção de software',
          'Testes de software e garantia da qualidade',
          'Gestão de projetos de software',
          'Gerência de configuração e evolução de software',
          'Gestão da produção e melhoria contínua de processos',
          'Gestão de equipes e liderança técnica',
          'Comunicação com stakeholders',
          'Interação humano-computador',
          'Lógica matemática e estatística aplicada',
          'Bancos de dados',
          'Redes de computadores e sistemas operacionais',
          'Sistemas distribuídos',
          'Segurança de software',
          'Tecnologias móveis e computação em nuvem',
        ],
      },
      descomplica: {
        title: 'MBA em Big Data',
        period: '2020 - 2021',
        summary:
          'Estudo conceitual e prático de Big Data e Business Analytics, com foco em análise de problemas empresariais, projetos com grandes volumes de dados, qualidade e governança.',
        skills: [
          'Conceitos fundamentais e aplicações de Big Data e Analytics',
          'Filtragem e processamento de dados brutos para geração de informações úteis',
          'Introdução a ferramentas do ecossistema de dados, como Hadoop, Spark e Kafka',
          'Metodologias aplicadas à inteligência competitiva e de mercado',
        ],
      },
      anhanguera: {
        title: 'Ciência da Computação',
        period: '2017 - 2021',
        summary:
          'Formação em técnicas, métodos e ferramentas computacionais para automatizar processos e desenvolver sistemas, incluindo modelagem, testes, redes, bancos de dados e inteligência artificial.',
        skills: [
          'Algoritmos e estruturas de dados',
          'Programação orientada a objetos com Java',
          'Desenvolvimento web e mobile',
          'Engenharia de Software',
          'Matemática computacional',
          'Lógica',
          'Sistemas operacionais',
          'Arquitetura de computadores',
          'Computação em nuvem',
          'Fundamentos de inteligência artificial (IA)',
          'Machine Learning',
          'Segurança da informação',
          'Redes de computadores',
          'Bancos de dados',
          'Internet das Coisas (IoT)',
        ],
      },
      estacio: {
        title: 'Bacharelado em Administração',
        period: '2002 - 2006',
        summary:
          'Formação em Administração com foco em gestão estratégica, empreendedorismo, finanças, contabilidade, marketing e negociação. Abrange gestão de pessoas, logística e cadeia de suprimentos, além de direito empresarial, cenários econômicos e estatística aplicada ao planejamento e à tomada de decisão nos negócios.',
        skills: [
          'Teoria Geral da Administração',
          'Planejamento estratégico',
          'Empreendedorismo',
          'Administração financeira',
          'Contabilidade geral',
          'Orçamentos e custos',
          'Administração de marketing',
          'Comportamento do consumidor',
          'Negociação',
          'Gestão de recursos humanos',
          'Logística e cadeia de suprimentos',
          'Direito empresarial',
          'Cenários econômicos',
          'Estatística aplicada',
        ],
      },
    },
    invitation: 'Vamos conversar sobre o seu projeto?',
    contactCta: 'Entrar em contato',
  },
  en: {
    metaTitle: 'Full Stack Ruby on Rails developer',
    metaDescription:
      'The career path of Marco Picanço: web development, Ruby on Rails, Software Engineering and a business mindset built by working with people.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'About',
    axis: 'Career path',
    eyebrow: 'People, business and software.',
    titleLines: ['I’m Marco Picanço.', 'I enjoy building things.'],
    jobTitle: 'Full Stack Developer',
    heading: 'Understanding the problem is part of writing the code.',
    paragraphs: [
      'My path went through Business Administration, sales and customer success before I moved into software development. Working close to people and businesses taught me to ask questions, understand priorities and take care of communication.',
      'As a Full Stack developer, my experience includes APIs, automated testing and evolving the back office with Ruby on Rails at OrçaFascio. I work with business rules, integrations and system maintenance, with attention to quality and clear code.',
      'My education in Software Engineering, Big Data and Computer Science complements this practice. Away from the code, jiu-jitsu helps me build the discipline and calm to face challenges.',
    ],
    educationEyebrow: 'The foundation for practice',
    educationTitle: 'Education.',
    skillsLabel: 'Skills:',
    education: {
      puc: {
        title: 'Graduate degree in Software Engineering',
        period: 'Mar 2023 - Apr 2024',
        summary:
          'A program grounded in Computer Science, Mathematics and Production, focused on building, operating, maintaining and evolving high-quality software. It combines technical and management practices, modern technologies and innovation, taking into account ethical, social, legal, economic and security aspects. It covers software architecture, technical leadership, project management, research and continuous improvement of development processes.',
        skills: [
          'Software analysis, modeling and specification',
          'Software architecture and design',
          'Programming and software construction',
          'Software testing and quality assurance',
          'Software project management',
          'Configuration management and software evolution',
          'Production management and continuous process improvement',
          'Team management and technical leadership',
          'Stakeholder communication',
          'Human-computer interaction',
          'Mathematical logic and applied statistics',
          'Databases',
          'Computer networks and operating systems',
          'Distributed systems',
          'Software security',
          'Mobile technologies and cloud computing',
        ],
      },
      descomplica: {
        title: 'MBA in Big Data',
        period: '2020 - 2021',
        summary:
          'Conceptual and practical study of Big Data and Business Analytics, focused on analyzing business problems, projects with large volumes of data, quality and governance.',
        skills: [
          'Core concepts and applications of Big Data and Analytics',
          'Filtering and processing raw data to produce useful information',
          'Introduction to data ecosystem tools such as Hadoop, Spark and Kafka',
          'Methodologies for competitive and market intelligence',
        ],
      },
      anhanguera: {
        title: 'Bachelor’s degree in Computer Science',
        period: '2017 - 2021',
        summary:
          'Training in computational techniques, methods and tools to automate processes and develop systems, including modeling, testing, networks, databases and artificial intelligence.',
        skills: [
          'Algorithms and data structures',
          'Object-oriented programming with Java',
          'Web and mobile development',
          'Software Engineering',
          'Computational mathematics',
          'Logic',
          'Operating systems',
          'Computer architecture',
          'Cloud computing',
          'Fundamentals of artificial intelligence (AI)',
          'Machine Learning',
          'Information security',
          'Computer networks',
          'Databases',
          'Internet of Things (IoT)',
        ],
      },
      estacio: {
        title: 'Bachelor’s degree in Business Administration',
        period: '2002 - 2006',
        summary:
          'A Business Administration degree focused on strategic management, entrepreneurship, finance, accounting, marketing and negotiation. It covers people management, logistics and supply chain, as well as business law, economic scenarios and statistics applied to planning and business decision-making.',
        skills: [
          'General Theory of Administration',
          'Strategic planning',
          'Entrepreneurship',
          'Financial management',
          'General accounting',
          'Budgets and costs',
          'Marketing management',
          'Consumer behavior',
          'Negotiation',
          'Human resources management',
          'Logistics and supply chain',
          'Business law',
          'Economic scenarios',
          'Applied statistics',
        ],
      },
    },
    invitation: 'Shall we talk about your project?',
    contactCta: 'Get in touch',
  },
  fr: {
    metaTitle: 'Développeur Full Stack Ruby on Rails',
    metaDescription:
      'Le parcours de Marco Picanço : développement web, Ruby on Rails, génie logiciel et une vision métier construite au contact des gens.',
    breadcrumbHome: 'Accueil',
    breadcrumbCurrent: 'À propos',
    axis: 'Parcours',
    eyebrow: 'Des personnes, des entreprises et du logiciel.',
    titleLines: ['Je suis Marco Picanço.', 'J’aime construire.'],
    jobTitle: 'Développeur Full Stack',
    heading: 'Comprendre le problème fait partie de l’écriture du code.',
    paragraphs: [
      'Mon parcours est passé par l’administration des entreprises, la vente et la réussite client avant d’arriver au développement logiciel. Travailler au plus près des gens et des entreprises m’a appris à poser des questions, à comprendre les priorités et à soigner la communication.',
      'En tant que développeur Full Stack, mon expérience comprend des API, des tests automatisés et l’évolution du back-office avec Ruby on Rails chez OrçaFascio. Je travaille sur des règles métier, des intégrations et la maintenance de systèmes, avec une attention particulière à la qualité et à la clarté du code.',
      'Ma formation en génie logiciel, en Big Data et en informatique complète cette pratique. En dehors du code, le jiu-jitsu m’aide à cultiver la discipline et le calme pour relever les défis.',
    ],
    educationEyebrow: 'Les bases de la pratique',
    educationTitle: 'Formation.',
    skillsLabel: 'Compétences :',
    education: {
      puc: {
        title: 'Spécialisation de troisième cycle en génie logiciel',
        period: 'mars 2023 - avr. 2024',
        summary:
          'Une formation fondée sur l’informatique, les mathématiques et la production, orientée vers la construction, l’exploitation, la maintenance et l’évolution de logiciels de haute qualité. Elle associe pratiques techniques et managériales, technologies modernes et innovation, en tenant compte des aspects éthiques, sociaux, juridiques, économiques et de sécurité. Elle couvre l’architecture logicielle, le leadership technique, la gestion de projet, la recherche et l’amélioration continue des processus de développement.',
        skills: [
          'Analyse, modélisation et spécification de logiciels',
          'Architecture et conception logicielles',
          'Programmation et construction de logiciels',
          'Tests logiciels et assurance qualité',
          'Gestion de projets logiciels',
          'Gestion de configuration et évolution des logiciels',
          'Gestion de la production et amélioration continue des processus',
          'Gestion d’équipe et leadership technique',
          'Communication avec les parties prenantes',
          'Interaction homme-machine',
          'Logique mathématique et statistique appliquée',
          'Bases de données',
          'Réseaux informatiques et systèmes d’exploitation',
          'Systèmes distribués',
          'Sécurité logicielle',
          'Technologies mobiles et cloud computing',
        ],
      },
      descomplica: {
        title: 'MBA en Big Data',
        period: '2020 - 2021',
        summary:
          'Étude théorique et pratique du Big Data et de la Business Analytics, centrée sur l’analyse de problèmes d’entreprise, les projets à grands volumes de données, la qualité et la gouvernance.',
        skills: [
          'Concepts fondamentaux et applications du Big Data et de l’analytique',
          'Filtrage et traitement de données brutes pour produire des informations utiles',
          'Introduction aux outils de l’écosystème des données, comme Hadoop, Spark et Kafka',
          'Méthodologies appliquées à l’intelligence économique et de marché',
        ],
      },
      anhanguera: {
        title: 'Licence en informatique',
        period: '2017 - 2021',
        summary:
          'Formation aux techniques, méthodes et outils informatiques pour automatiser des processus et développer des systèmes, notamment la modélisation, les tests, les réseaux, les bases de données et l’intelligence artificielle.',
        skills: [
          'Algorithmes et structures de données',
          'Programmation orientée objet avec Java',
          'Développement web et mobile',
          'Génie logiciel',
          'Mathématiques pour l’informatique',
          'Logique',
          'Systèmes d’exploitation',
          'Architecture des ordinateurs',
          'Cloud computing',
          'Fondamentaux de l’intelligence artificielle (IA)',
          'Machine Learning',
          'Sécurité de l’information',
          'Réseaux informatiques',
          'Bases de données',
          'Internet des objets (IoT)',
        ],
      },
      estacio: {
        title: 'Licence en administration des entreprises',
        period: '2002 - 2006',
        summary:
          'Une formation en administration centrée sur la gestion stratégique, l’entrepreneuriat, la finance, la comptabilité, le marketing et la négociation. Elle couvre la gestion des personnes, la logistique et la chaîne d’approvisionnement, ainsi que le droit des affaires, les scénarios économiques et la statistique appliquée à la planification et à la prise de décision.',
        skills: [
          'Théorie générale de l’administration',
          'Planification stratégique',
          'Entrepreneuriat',
          'Gestion financière',
          'Comptabilité générale',
          'Budgets et coûts',
          'Gestion marketing',
          'Comportement du consommateur',
          'Négociation',
          'Gestion des ressources humaines',
          'Logistique et chaîne d’approvisionnement',
          'Droit des affaires',
          'Scénarios économiques',
          'Statistique appliquée',
        ],
      },
    },
    invitation: 'Parlons de votre projet ?',
    contactCta: 'Me contacter',
  },
}
