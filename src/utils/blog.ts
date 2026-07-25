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
  new Date(post.frontmatter.publishedAt ?? post.frontmatter.date).getTime()

export const sortBlogPostsByDateDesc = (posts: BlogPostModule[]) =>
  [...posts].sort((a, b) => getPublishedTime(b) - getPublishedTime(a))

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
  new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
