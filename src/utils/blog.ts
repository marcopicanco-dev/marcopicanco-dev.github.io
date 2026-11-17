import { type MarkdownInstance } from 'astro'
import { type SearchRecord } from '@/types'
import { DEFAULT_LANGUAGE_CODE } from '@/config'
import { LOCALE_INFO, type LanguageKeys } from '@/i18n/ui'
import { isLanguage, localizePath } from '@/i18n/utils'

// Portuguese posts live in src/content/blog/; translations go in
// src/content/blog/<lang>/ with the same file name and keep its URL slug.
type BlogSourceFrontmatter = {
  title: string
  // Optional shorter <title> for search results when `title` is too long to
  // stay readable there; the page heading and social cards keep `title`.
  seoTitle?: string
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

export type BlogFrontmatter = BlogSourceFrontmatter & {
  slug: string
  lang: LanguageKeys
}

export type BlogPostModule = MarkdownInstance<BlogFrontmatter>

const blogPostModules = import.meta.glob<
  MarkdownInstance<BlogSourceFrontmatter>
>('/src/content/blog/**/*.mdx', { eager: true })

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' e ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getSourceSlug = (frontmatter: BlogSourceFrontmatter) =>
  frontmatter.slug ?? `${frontmatter.date}-${slugify(frontmatter.title)}`

const blogPostFiles = Object.entries(blogPostModules).map(([path, module]) => {
  const [folder, fileName] = path.split('/').slice(-2)

  return {
    module,
    fileName,
    lang: isLanguage(folder) ? folder : DEFAULT_LANGUAGE_CODE,
  }
})

const defaultSlugsByFile = new Map(
  blogPostFiles
    .filter(({ lang }) => lang === DEFAULT_LANGUAGE_CODE)
    .map(({ fileName, module }) => [
      fileName,
      getSourceSlug(module.frontmatter),
    ]),
)

const allBlogPosts: BlogPostModule[] = blogPostFiles.map(
  ({ module, fileName, lang }) => ({
    ...module,
    frontmatter: {
      ...module.frontmatter,
      lang,
      slug:
        module.frontmatter.slug ??
        defaultSlugsByFile.get(fileName) ??
        getSourceSlug(module.frontmatter),
    },
  }),
)

export const getBlogPosts = (lang: LanguageKeys = DEFAULT_LANGUAGE_CODE) =>
  allBlogPosts.filter((post) => post.frontmatter.lang === lang)

const getPublishedTime = (post: BlogPostModule) =>
  new Date(`${post.frontmatter.publishedAt ?? post.frontmatter.date}`).getTime()

export const getSeriesPart = (post: BlogPostModule) => {
  const match = post.frontmatter.title.match(/(?:parte|partie|part)\s+(\d+)/i)

  return match ? Number(match[1]) : 1
}

export const sortBlogPostsByDateDesc = (posts: BlogPostModule[]) =>
  [...posts].sort((a, b) => {
    const timeDiff = getPublishedTime(b) - getPublishedTime(a)

    if (timeDiff !== 0) return timeDiff

    return getSeriesPart(b) - getSeriesPart(a)
  })

export const getSeriesPosts = (series: string, lang: LanguageKeys) =>
  getBlogPosts(lang)
    .filter((post) => post.frontmatter.series === series)
    .sort((a, b) => getSeriesPart(a) - getSeriesPart(b))

export const getBlogPostSlug = (frontmatter: BlogFrontmatter) =>
  frontmatter.slug

export const getBlogPostUrl = (frontmatter: BlogFrontmatter) =>
  localizePath(`/${frontmatter.slug}/`, frontmatter.lang)

// A tag page with a single post is thin content, so the tag stays plain text
// until a second post joins it.
export const MIN_POSTS_PER_TAG_PAGE = 2

export const getTagSlug = (tag: string) => slugify(tag)

export const getTagUrl = (tag: string, lang: LanguageKeys) =>
  localizePath(`/tags/${getTagSlug(tag)}/`, lang)

export const getPostsByTag = (lang: LanguageKeys = DEFAULT_LANGUAGE_CODE) => {
  const postsByTag = new Map<string, BlogPostModule[]>()

  for (const post of getBlogPosts(lang)) {
    for (const tag of post.frontmatter.tags ?? []) {
      postsByTag.set(tag, [...(postsByTag.get(tag) ?? []), post])
    }
  }

  return postsByTag
}

export const hasTagPage = (tag: string, lang: LanguageKeys) =>
  (getPostsByTag(lang).get(tag)?.length ?? 0) >= MIN_POSTS_PER_TAG_PAGE

export const hasTagSlugPage = (tagSlug: string, lang: LanguageKeys) =>
  [...getPostsByTag(lang)].some(
    ([tag, posts]) =>
      getTagSlug(tag) === tagSlug && posts.length >= MIN_POSTS_PER_TAG_PAGE,
  )

// Tags come from each language's posts, so their pages differ per language.
export const getTagStaticPaths = (lang: LanguageKeys) =>
  [...getPostsByTag(lang)]
    .filter(([, posts]) => posts.length >= MIN_POSTS_PER_TAG_PAGE)
    .map(([tag, posts]) => ({
      params: { tag: getTagSlug(tag) },
      props: { tag, posts: sortBlogPostsByDateDesc(posts) },
    }))

export const getPostStaticPaths = (lang: LanguageKeys) =>
  getBlogPosts(lang).map((post) => ({
    params: { slug: post.frontmatter.slug },
    props: { post },
  }))

// Series siblings are already linked by the series navigation.
export const getRelatedPosts = (frontmatter: BlogFrontmatter, limit = 3) => {
  const tags = new Set(frontmatter.tags ?? [])
  const slug = getBlogPostSlug(frontmatter)

  return sortBlogPostsByDateDesc(getBlogPosts(frontmatter.lang))
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

export const formatBlogDate = (
  date: string,
  lang: LanguageKeys = DEFAULT_LANGUAGE_CODE,
) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(LOCALE_INFO[lang].htmlLang, {
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

export const getBlogSearchRecords = (
  lang: LanguageKeys = DEFAULT_LANGUAGE_CODE,
): SearchRecord[] =>
  sortBlogPostsByDateDesc(getBlogPosts(lang)).map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: getBlogPostUrl(post.frontmatter),
    keywords: getBlogPostKeywords(post.frontmatter),
  }))
