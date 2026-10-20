const homeAliases = new Set(['/portfolio/', '/pt/', '/sr/'])

export const getCanonicalUrl = (pathname: string, site: URL | undefined) => {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`
  const canonicalPath = homeAliases.has(normalizedPath) ? '/' : normalizedPath

  return new URL(canonicalPath, site)
}
