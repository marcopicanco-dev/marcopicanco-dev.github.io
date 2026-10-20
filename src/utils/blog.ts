import { type MarkdownInstance } from 'astro'
import { type SearchRecord } from '@/types'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  slug?: string
  tags?: string[]
  publishedAt?: string
  heroImage?: string
  heroImageAlt?: string
  heroImageLayout?: 'logo'
  series?: string
  seriesLabel?: string
}

export type BlogPostModule = MarkdownInstance<BlogFrontmatter>

const blogPostModules = import.meta.glob<BlogPostModule>(
  '/src/content/blog/*.mdx',
  {
    eager: true,
  },
)

export const getBlogPosts = () => Object.values(blogPostModules)

const getPublishedTime = (post: BlogPostModule) =>
  new Date(`${post.frontmatter.publishedAt ?? post.frontmatter.date}`).getTime()

const getSeriesPart = (post: BlogPostModule) => {
  const match = post.frontmatter.title.match(/parte\s+(\d+)/i)

  return match ? Number(match[1]) : 1
}

export const sortBlogPostsByDateDesc = (posts: BlogPostModule[]) =>
  [...posts].sort((a, b) => {
    const timeDiff = getPublishedTime(b) - getPublishedTime(a)

    if (timeDiff !== 0) return timeDiff

    return getSeriesPart(b) - getSeriesPart(a)
  })

export const getSeriesPosts = (series: string) =>
  getBlogPosts()
    .filter((post) => post.frontmatter.series === series)
    .sort((a, b) => getSeriesPart(a) - getSeriesPart(b))

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' e ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getBlogPostSlug = (frontmatter: BlogFrontmatter) =>
  frontmatter.slug ?? `${frontmatter.date}-${slugify(frontmatter.title)}`

export const getBlogPostUrl = (frontmatter: BlogFrontmatter) =>
  `/${getBlogPostSlug(frontmatter)}/`

// A tag page with a single post is thin content, so the tag stays plain text
// until a second post joins it.
export const MIN_POSTS_PER_TAG_PAGE = 2

export const getTagSlug = (tag: string) => slugify(tag)

export const getTagUrl = (tag: string) => `/tags/${getTagSlug(tag)}/`

export const getPostsByTag = () => {
  const postsByTag = new Map<string, BlogPostModule[]>()

  for (const post of getBlogPosts()) {
    for (const tag of post.frontmatter.tags ?? []) {
      postsByTag.set(tag, [...(postsByTag.get(tag) ?? []), post])
    }
  }

  return postsByTag
}

export const hasTagPage = (tag: string) =>
  (getPostsByTag().get(tag)?.length ?? 0) >= MIN_POSTS_PER_TAG_PAGE

// Series siblings are already linked by the series navigation.
export const getRelatedPosts = (frontmatter: BlogFrontmatter, limit = 3) => {
  const tags = new Set(frontmatter.tags ?? [])
  const slug = getBlogPostSlug(frontmatter)

  return sortBlogPostsByDateDesc(getBlogPosts())
    .filter(
      (post) =>
        getBlogPostSlug(post.frontmatter) !== slug &&
        (!frontmatter.series || post.frontmatter.series !== frontmatter.series),
    )
    .map((post) => ({
      post,
      sharedTags: (post.frontmatter.tags ?? []).filter((tag) => tags.has(tag))
        .length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map(({ post }) => post)
}

export const formatBlogDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const getBlogPostKeywords = (frontmatter: BlogFrontmatter) => {
  const url = getBlogPostUrl(frontmatter)
  const seriesPart = url.includes('parte-')
    ? url.match(/parte-(\d+)/)?.[0].replace('-', ' ')
    : frontmatter.title.includes('Corrigindo headers')
      ? 'parte 1'
      : ''

  return [...(frontmatter.tags ?? []), seriesPart].filter(Boolean).join(' ')
}

const siteSearchRecords: SearchRecord[] = [
  {
    title: 'Desenvolvimento web',
    description:
      'Sites, sistemas e aplicações web para facilitar o dia a dia do seu negócio.',
    url: '/',
    keywords: 'home marco picanço desenvolvedor full stack ruby rails',
  },
  {
    title: 'Projetos — HexaAlerts',
    description:
      'Aplicação para acompanhar a Copa, com Redis, Sidekiq, webhooks idempotentes e reconciliação de partidas entre provedores.',
    url: '/#projetos',
    keywords:
      'portfolio hexa alerts copa futebol rails redis sidekiq webhook filas idempotencia reconciliacao provedores apis testes',
  },
  {
    title: 'Serviços',
    description:
      'Sites e presença digital, sistemas e aplicações web, integrações, manutenção e evolução.',
    url: '/#servicos',
    keywords: 'consultoria rails api webhooks testes backoffice',
  },
  {
    title: 'Sobre Marco Picanço',
    description:
      'Desenvolvedor Full Stack com experiência em Ruby on Rails, APIs, testes, Backoffice, Engenharia de Software e Big Data.',
    url: '/sobre/',
    keywords:
      'sobre experiência formação carreira engenharia software big data administração',
  },
  {
    title: 'Contato',
    description:
      'Canais para conversar sobre projetos, consultoria, desenvolvimento e colaboração.',
    url: '/#contato',
    keywords: 'contato email linkedin github contratar projeto',
  },
  {
    title: 'Blog',
    description:
      'Artigos sobre desenvolvimento, segurança, sites estáticos, Cloudflare, Astro e tecnologia.',
    url: '/blog/',
    keywords: 'artigos posts arquivo segurança cloudflare astro métricas seo',
  },
]

export const getSearchRecords = (): SearchRecord[] => [
  ...siteSearchRecords,
  ...getBlogSearchRecords(),
]

export const getBlogSearchRecords = (): SearchRecord[] =>
  sortBlogPostsByDateDesc(getBlogPosts()).map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: getBlogPostUrl(post.frontmatter),
    keywords: getBlogPostKeywords(post.frontmatter),
  }))
