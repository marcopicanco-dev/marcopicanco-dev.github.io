export const getCanonicalUrl = (pathname: string, site: URL | undefined) => {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`

  return new URL(normalizedPath, site)
}
