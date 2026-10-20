type TitleDesc = {
  title: string
  description: string
}

export type Frontmatter = {
  layout: string
  file: string
  date?: string
  heroImage?: string
  heroImageAlt?: string
} & TitleDesc

export type SearchRecord = {
  url: string
  keywords?: string
} & TitleDesc
