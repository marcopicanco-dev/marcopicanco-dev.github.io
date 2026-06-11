export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  heroImage?: string
  heroImageAlt?: string
}

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
