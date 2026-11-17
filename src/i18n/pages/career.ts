import { type LanguageKeys } from '@/i18n/ui'

export type ExperienceId =
  | 'telensino'
  | 'monaco'
  | 'anglo'
  | 'speed'
  | 'proesc'
  | 'orca-sales-assistant'
  | 'orca-sales-consultant'
  | 'orca-customer-success'
  | 'orca-developer'

type ExperienceText = {
  role: string
  summary: string
  highlights?: string[]
  technologies?: string[]
}

type CareerContent = {
  eyebrow: string
  titleLines: [string, string, string]
  lead: string
  companyText: string
  timelineLabel: string
  current: string
  present: string
  highlightsTitle: string
  technologiesLabel: string
  experiences: Record<ExperienceId, ExperienceText>
}

const orcaTechnologies = [
  'Ruby',
  'Ruby on Rails',
  'MongoDB',
  'PostgreSQL',
  'JavaScript',
  'HTML',
  'CSS',
  'RSpec',
  'Minitest',
]

export const CAREER: Record<LanguageKeys, CareerContent> = {
  pt: {
    eyebrow: 'Experiência profissional',
    titleLines: ['Antes do', 'código,', 'o contexto.'],
    lead: 'Minha trajetória começou ouvindo pessoas. Hoje, transformo esse entendimento em software.',
    companyText:
      'De vendas e sucesso do cliente ao desenvolvimento de sistemas.',
    timelineLabel: 'Experiências profissionais em ordem cronológica',
    current: 'Atual',
    present: 'atual',
    highlightsTitle: 'Principais entregas',
    technologiesLabel: 'Tecnologias:',
    experiences: {
      telensino: {
        role: 'Professor',
        summary:
          'Ministrei aulas no curso de Tecnologia em Recursos Humanos, abordando matemática financeira, empreendedorismo, recursos humanos, rotinas administrativas, treinamento e desenvolvimento pessoal.',
      },
      monaco: {
        role: 'Assistente administrativo de recursos humanos',
        summary:
          'Monitorei ponto eletrônico, folha de pagamento e férias. Também participei do planejamento de treinamentos e de ações de conscientização sobre o uso de EPI e a prevenção ao assédio moral e sexual.',
      },
      anglo: {
        role: 'Auxiliar administrativo',
        summary:
          'Participei de um processo de auditoria, realizando a digitação e a migração de documentos físicos para arquivos digitais.',
      },
      speed: {
        role: 'Professor',
        summary:
          'Ministrei disciplinas em cursos técnicos de Administração, incluindo matemática financeira, marketing, recursos humanos e empreendedorismo. Planejei aulas e atividades práticas para aproximar conceitos de gestão e finanças de situações do trabalho, fortalecendo a comunicação com diferentes públicos.',
      },
      proesc: {
        role: 'Consultor de implantação',
        summary:
          'Atuei na implantação do sistema Proesc, conduzindo treinamentos estruturados e rotinas semanais de acompanhamento. Monitorei indicadores de desempenho da implantação e ajudei as equipes a superar dificuldades durante a adoção do sistema.',
      },
      'orca-sales-assistant': {
        role: 'Assistente de vendas',
        summary:
          'Realizei prospecção ativa e qualificação de leads, levantando necessidades e registrando informações para a equipe comercial. Organizei oportunidades no pipeline de vendas e encaminhei leads qualificados para abordagens alinhadas ao perfil de cada potencial cliente.',
      },
      'orca-sales-consultant': {
        role: 'Consultor de vendas',
        summary:
          'Conduzi vendas consultivas de software, investigando os objetivos e desafios de cada cliente para apresentar soluções adequadas à sua operação. Acompanhei indicadores como churn e NPS e traduzi recursos do produto em benefícios práticos para orientar propostas e ações de relacionamento.',
      },
      'orca-customer-success': {
        role: 'Analista de sucesso do cliente',
        summary:
          'Acompanhei clientes na adoção e no uso da plataforma, identificando necessidades e obstáculos em seus processos. Analisei demandas e feedbacks para propor melhorias e apoiei estratégias de relacionamento e venda cruzada. Esse contato direto com os usuários construiu a visão de negócio que hoje aplico ao desenvolvimento do Backoffice.',
      },
      'orca-developer': {
        role: 'Desenvolvedor Full Stack',
        summary:
          'Lidero o desenvolvimento e a evolução do Backoffice da OrçaFascio, da sustentação à entrega de novas funcionalidades. Meu trabalho conecta necessidades das equipes a soluções web desenvolvidas com Ruby on Rails.',
        highlights: [
          'Modernizei o sistema financeiro e o fluxo de notas fiscais para adequação ao CNPJ alfanumérico. Integrei a Focus para emissão de múltiplas notas e desenvolvi um dashboard de indicadores financeiros para apoiar decisões.',
          'Projetei e desenvolvi um orquestrador de eventos para integrar leads, CRM, cobranças, módulos e métricas de uso à RD Station e a parceiros. A solução usa APIs e webhooks, com monitoramento e reprocessamento de falhas, ampliando o controle sobre as integrações e reduzindo custos de automação em relação ao Make.',
          'Atuo na sustentação do sistema legado com refatoração, otimização e manutenção contínua, garantindo estabilidade e desempenho.',
          'Crio, testo e documento APIs RESTful e desenvolvo testes automatizados com RSpec e Minitest, aplicando práticas de TDD/BDD na evolução do sistema.',
        ],
        technologies: [...orcaTechnologies, 'APIs RESTful', 'webhooks'],
      },
    },
  },
  en: {
    eyebrow: 'Professional experience',
    titleLines: ['Before the', 'code,', 'the context.'],
    lead: 'My career began by listening to people. Today, I turn that understanding into software.',
    companyText: 'From sales and customer success to software development.',
    timelineLabel: 'Professional experience in chronological order',
    current: 'Current',
    present: 'present',
    highlightsTitle: 'Key achievements',
    technologiesLabel: 'Technologies:',
    experiences: {
      telensino: {
        role: 'Teacher',
        summary:
          'Taught classes in the Human Resources Technology program, covering financial mathematics, entrepreneurship, human resources, administrative routines, training and personal development.',
      },
      monaco: {
        role: 'Human resources administrative assistant',
        summary:
          'Monitored time tracking, payroll and vacation. I also helped plan training sessions and awareness campaigns on the use of personal protective equipment and the prevention of workplace and sexual harassment.',
      },
      anglo: {
        role: 'Administrative assistant',
        summary:
          'Took part in an audit, typing up and migrating paper documents into digital files.',
      },
      speed: {
        role: 'Teacher',
        summary:
          'Taught subjects in vocational Business Administration courses, including financial mathematics, marketing, human resources and entrepreneurship. I planned classes and hands-on activities to connect management and finance concepts to real work situations, strengthening communication with different audiences.',
      },
      proesc: {
        role: 'Implementation consultant',
        summary:
          'Worked on rolling out the Proesc system, leading structured training sessions and weekly follow-up routines. I monitored rollout performance indicators and helped teams overcome difficulties while adopting the system.',
      },
      'orca-sales-assistant': {
        role: 'Sales assistant',
        summary:
          'Carried out outbound prospecting and lead qualification, gathering needs and recording information for the sales team. I organized opportunities in the sales pipeline and routed qualified leads to approaches suited to each prospect’s profile.',
      },
      'orca-sales-consultant': {
        role: 'Sales consultant',
        summary:
          'Led consultative software sales, exploring each customer’s goals and challenges to present solutions that fit their operations. I tracked indicators such as churn and NPS and translated product features into practical benefits to guide proposals and relationship actions.',
      },
      'orca-customer-success': {
        role: 'Customer success analyst',
        summary:
          'Supported customers in adopting and using the platform, identifying needs and obstacles in their processes. I analyzed requests and feedback to propose improvements and supported relationship and cross-selling strategies. That direct contact with users built the business mindset I now bring to developing the back office.',
      },
      'orca-developer': {
        role: 'Full Stack Developer',
        summary:
          'I lead the development and evolution of the OrçaFascio back office, from maintenance to delivering new features. My work connects the needs of internal teams to web solutions built with Ruby on Rails.',
        highlights: [
          'Modernized the financial system and the invoicing flow to support Brazil’s new alphanumeric company tax ID (CNPJ). I integrated Focus to issue multiple invoices and built a financial indicators dashboard to support decision-making.',
          'Designed and built an event orchestrator that integrates leads, CRM, billing, modules and usage metrics with RD Station and partners. The solution uses APIs and webhooks, with failure monitoring and reprocessing, giving more control over the integrations and lowering automation costs compared with Make.',
          'Maintain the legacy system through refactoring, optimization and ongoing maintenance, ensuring stability and performance.',
          'Build, test and document RESTful APIs and write automated tests with RSpec and Minitest, applying TDD/BDD practices as the system evolves.',
        ],
        technologies: [...orcaTechnologies, 'RESTful APIs', 'webhooks'],
      },
    },
  },
  fr: {
    eyebrow: 'Expérience professionnelle',
    titleLines: ['Avant le', 'code,', 'le contexte.'],
    lead: 'Mon parcours a commencé à l’écoute des gens. Aujourd’hui, je transforme cette compréhension en logiciels.',
    companyText:
      'De la vente et de la réussite client au développement de systèmes.',
    timelineLabel: 'Expériences professionnelles par ordre chronologique',
    current: 'Actuel',
    present: 'aujourd’hui',
    highlightsTitle: 'Principales réalisations',
    technologiesLabel: 'Technologies :',
    experiences: {
      telensino: {
        role: 'Enseignant',
        summary:
          'J’ai donné des cours dans la formation de technologue en ressources humaines : mathématiques financières, entrepreneuriat, ressources humaines, tâches administratives, formation et développement personnel.',
      },
      monaco: {
        role: 'Assistant administratif en ressources humaines',
        summary:
          'J’ai suivi le pointage électronique, la paie et les congés. J’ai aussi participé à la planification des formations et à des actions de sensibilisation sur le port des équipements de protection individuelle et la prévention du harcèlement moral et sexuel.',
      },
      anglo: {
        role: 'Employé administratif',
        summary:
          'J’ai participé à un audit, en saisissant et en numérisant des documents papier.',
      },
      speed: {
        role: 'Enseignant',
        summary:
          'J’ai enseigné dans des formations techniques en administration, notamment les mathématiques financières, le marketing, les ressources humaines et l’entrepreneuriat. J’ai préparé des cours et des activités pratiques pour rapprocher les notions de gestion et de finance des situations de travail, en renforçant la communication avec des publics variés.',
      },
      proesc: {
        role: 'Consultant en déploiement',
        summary:
          'J’ai participé au déploiement du système Proesc, en animant des formations structurées et des points de suivi hebdomadaires. J’ai suivi les indicateurs de performance du déploiement et aidé les équipes à surmonter les difficultés lors de l’adoption du système.',
      },
      'orca-sales-assistant': {
        role: 'Assistant commercial',
        summary:
          'J’ai mené de la prospection active et de la qualification de leads, en recueillant les besoins et en consignant les informations pour l’équipe commerciale. J’ai organisé les opportunités dans le pipeline de ventes et orienté les leads qualifiés vers des approches adaptées au profil de chaque prospect.',
      },
      'orca-sales-consultant': {
        role: 'Consultant commercial',
        summary:
          'J’ai mené des ventes conseil de logiciels, en étudiant les objectifs et les défis de chaque client pour proposer des solutions adaptées à son activité. J’ai suivi des indicateurs comme le churn et le NPS et traduit les fonctionnalités du produit en bénéfices concrets pour orienter les propositions et les actions de fidélisation.',
      },
      'orca-customer-success': {
        role: 'Analyste réussite client',
        summary:
          'J’ai accompagné les clients dans l’adoption et l’utilisation de la plateforme, en identifiant les besoins et les obstacles dans leurs processus. J’ai analysé les demandes et les retours pour proposer des améliorations et soutenu les stratégies de fidélisation et de vente croisée. Ce contact direct avec les utilisateurs a forgé la vision métier que j’applique aujourd’hui au développement du back-office.',
      },
      'orca-developer': {
        role: 'Développeur Full Stack',
        summary:
          'Je dirige le développement et l’évolution du back-office d’OrçaFascio, de la maintenance à la livraison de nouvelles fonctionnalités. Mon travail relie les besoins des équipes à des solutions web développées avec Ruby on Rails.',
        highlights: [
          'J’ai modernisé le système financier et le flux de facturation pour l’adapter au nouveau numéro d’entreprise alphanumérique brésilien (CNPJ). J’ai intégré Focus pour l’émission de factures multiples et développé un tableau de bord d’indicateurs financiers pour éclairer les décisions.',
          'J’ai conçu et développé un orchestrateur d’événements qui relie leads, CRM, facturation, modules et métriques d’utilisation à RD Station et à des partenaires. La solution s’appuie sur des API et des webhooks, avec la surveillance et le retraitement des échecs, ce qui renforce le contrôle des intégrations et réduit les coûts d’automatisation par rapport à Make.',
          'J’assure la maintenance du système existant par la refactorisation, l’optimisation et une maintenance continue, pour garantir stabilité et performance.',
          'Je crée, teste et documente des API RESTful et j’écris des tests automatisés avec RSpec et Minitest, en appliquant les pratiques TDD/BDD à l’évolution du système.',
        ],
        technologies: [...orcaTechnologies, 'API RESTful', 'webhooks'],
      },
    },
  },
}
