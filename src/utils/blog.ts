import { type MarkdownInstance } from 'astro'
import { type SearchRecord } from '@/types'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  publishedAt?: string
  heroImage?: string
  heroImageAlt?: string
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

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' e ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getBlogPostSlug = (frontmatter: BlogFrontmatter) =>
  `${frontmatter.date}-${slugify(frontmatter.title)}`

export const getBlogPostUrl = (frontmatter: BlogFrontmatter) =>
  `/${getBlogPostSlug(frontmatter)}/`

export const formatBlogDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const getBlogPostKeywords = (frontmatter: BlogFrontmatter) => {
  const url = getBlogPostUrl(frontmatter)

  if (url.includes('parte-')) {
    return url.match(/parte-(\d+)/)?.[0].replace('-', ' ')
  }

  return frontmatter.title.includes('Corrigindo headers') ? 'parte 1' : ''
}

const siteSearchRecords: SearchRecord[] = [
  {
    title: 'Portfólio',
    description:
      'Projetos, estudos e consultoria em desenvolvimento de software, dados e tecnologia.',
    url: '/portfolio/',
    keywords: 'home marco picanço desenvolvedor full stack ruby rails',
  },
  {
    title: 'Projetos',
    description:
      'Projetos orientados a problemas reais de empresa, APIs, backoffice, bugs, testes e integrações.',
    url: '/portfolio/#projetos',
    keywords:
      'portfolio soluções backoffice apis integrações bugs sustentação testes confiabilidade',
  },
  {
    title: 'Consultoria',
    description:
      'Apoio técnico para Ruby on Rails, APIs RESTful, Webhooks, correção de bugs e testes automatizados.',
    url: '/portfolio/#consultoria',
    keywords: 'consultoria rails api webhooks testes backoffice',
  },
  {
    title: 'Sobre Marco Picanço',
    description:
      'Desenvolvedor Full Stack com experiência em Ruby on Rails, APIs, testes, Backoffice, Engenharia de Software e Big Data.',
    url: '/portfolio/#sobre',
    keywords:
      'sobre experiência formação carreira engenharia software big data administração',
  },
  {
    title: 'Contato',
    description:
      'Canais para conversar sobre projetos, consultoria, desenvolvimento e colaboração.',
    url: '/portfolio/#contato',
    keywords: 'contato email linkedin github contratar projeto',
  },
  {
    title: 'Blog',
    description:
      'Artigos sobre desenvolvimento, segurança, sites estáticos, Python, Astro e tecnologia.',
    url: '/blog/',
    keywords: 'artigos posts arquivo segurança cloudflare astro python',
  },
]

export const getSearchRecords = (): SearchRecord[] => [
  ...siteSearchRecords,
  ...sortBlogPostsByDateDesc(getBlogPosts()).map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: getBlogPostUrl(post.frontmatter),
    keywords: getBlogPostKeywords(post.frontmatter),
  })),
]
