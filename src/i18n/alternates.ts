import { LOCALE_INFO, type LanguageKeys } from '@/i18n/ui'
import {
  isLanguageAvailable,
  localizePath,
  stripLangPrefix,
} from '@/i18n/utils'
import { getBlogPosts, hasTagSlugPage } from '@/utils/blog'

const languages = Object.keys(LOCALE_INFO) as LanguageKeys[]

const postPath = (slug: string) => `/${slug}/`

const allPostPaths = () =>
  new Set(
    languages.flatMap((lang) =>
      getBlogPosts(lang).map((post) => postPath(post.frontmatter.slug)),
    ),
  )

const toBasePath = (pathname: string) => {
  const path = stripLangPrefix(pathname)

  return path.endsWith('/') ? path : `${path}/`
}

// Pages exist in every language, but a post only once translated and a tag
// only where that language has a page for it (tag names are translated).
const existsIn = (path: string, lang: LanguageKeys) => {
  const tagSlug = path.match(/^\/tags\/([^/]+)\/$/)?.[1]

  if (tagSlug) return hasTagSlugPage(tagSlug, lang)
  if (allPostPaths().has(path)) {
    return getBlogPosts(lang).some(
      (post) => postPath(post.frontmatter.slug) === path,
    )
  }

  return true
}

// Where the language switcher sends a reader: the same page in the other
// language, or that language's blog when the page has no equivalent there.
export const getAlternatePath = (pathname: string, lang: LanguageKeys) => {
  const path = toBasePath(pathname)

  return existsIn(path, lang)
    ? localizePath(path, lang)
    : localizePath('/blog/', lang)
}

// Real equivalents of a page, for hreflang: published languages only, and
// no fallbacks.
export const getAlternateLinks = (pathname: string) => {
  const path = toBasePath(pathname)

  return languages
    .filter((lang) => isLanguageAvailable(lang) && existsIn(path, lang))
    .map((lang) => ({ lang, path: localizePath(path, lang) }))
}
