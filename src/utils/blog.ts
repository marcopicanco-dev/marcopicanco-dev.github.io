import { type MarkdownInstance } from 'astro'

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
