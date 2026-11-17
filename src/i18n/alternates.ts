import { LOCALE_INFO, type LanguageKeys } from '@/i18n/ui'
import { localizePath, stripLangPrefix } from '@/i18n/utils'
import { getBlogPosts, hasTagSlugPage } from '@/utils/blog'

const allPostPaths = () =>
  new Set(
    (Object.keys(LOCALE_INFO) as LanguageKeys[]).flatMap((lang) =>
      getBlogPosts(lang).map((post) => `/${post.frontmatter.slug}/`),
    ),
  )

// The same page in another language. Pages exist in every language, but a
// post only once translated and a tag only where it has its own page, so
// those fall back to that language's blog.
export const getAlternatePath = (pathname: string, lang: LanguageKeys) => {
  const path = stripLangPrefix(pathname)
  const blogPath = localizePath('/blog/', lang)
  const tagSlug = path.match(/^\/tags\/([^/]+)\/?$/)?.[1]

  if (tagSlug) {
    return hasTagSlugPage(tagSlug, lang) ? localizePath(path, lang) : blogPath
  }
  if (allPostPaths().has(path)) {
    const translated = getBlogPosts(lang).some(
      (post) => `/${post.frontmatter.slug}/` === path,
    )

    return translated ? localizePath(path, lang) : blogPath
  }

  return localizePath(path, lang)
}
