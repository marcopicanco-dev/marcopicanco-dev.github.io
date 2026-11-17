import { useMemo, useState } from 'react'

export type BlogArchivePost = {
  title: string
  description: string
  date: string
  formattedDate: string
  url: string
}

// Translated on the server; {count} and {title} are filled in here.
export type BlogArchiveLabels = {
  title: string
  filterByMonth: string
  all: string
  countOne: string
  countOther: string
  clearFilter: string
  featured: string
  readLabel: string
  readArticle: string
  more: string
}

const getMonthKey = (date: string) => date.slice(0, 7)
const formatArchiveMonth = (key: string, locale: string) => {
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month - 1, 1, 12).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogArchive({
  posts,
  locale,
  labels,
}: {
  posts: BlogArchivePost[]
  locale: string
  labels: BlogArchiveLabels
}) {
  const [activeMonth, setActiveMonth] = useState<string | null>(null)
  const months = useMemo(
    () => [...new Set(posts.map((post) => getMonthKey(post.date)))],
    [posts],
  )
  const filtered = activeMonth
    ? posts.filter((post) => getMonthKey(post.date) === activeMonth)
    : posts
  const featured = filtered.slice(0, 2)
  const other = filtered.slice(2)
  return (
    <div className="archive-layout">
      <aside className="archive-sidebar">
        <h2 className="eyebrow">{labels.title}</h2>
        <nav aria-label={labels.filterByMonth}>
          <button
            type="button"
            aria-pressed={activeMonth === null}
            onClick={() => setActiveMonth(null)}
          >
            {labels.all}{' '}
            <span className="mono">
              {String(posts.length).padStart(2, '0')}
            </span>
          </button>
          {months.map((month) => (
            <button
              type="button"
              key={month}
              aria-pressed={activeMonth === month}
              onClick={() => setActiveMonth(month)}
            >
              {formatArchiveMonth(month, locale)}
            </button>
          ))}
        </nav>
      </aside>
      <div className="archive-content">
        <div className="archive-count">
          <p role="status">
            {(filtered.length === 1
              ? labels.countOne
              : labels.countOther
            ).replace('{count}', String(filtered.length))}
          </p>
          {activeMonth && (
            <button type="button" onClick={() => setActiveMonth(null)}>
              {labels.clearFilter}
            </button>
          )}
        </div>
        <section className="archive-featured" aria-label={labels.featured}>
          {featured.map((post, index) => (
            <article className="archive-feature" key={post.url}>
              <div className="article-meta">
                <time className="mono" dateTime={post.date}>
                  {post.formattedDate}
                </time>
                <span className="mono" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h2>
                <a href={post.url}>{post.title}</a>
              </h2>
              <p>{post.description}</p>
              <a
                className="text-link"
                href={post.url}
                aria-label={labels.readLabel.replace('{title}', post.title)}
              >
                {labels.readArticle} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </section>
        {other.length > 0 && (
          <section className="archive-older" aria-labelledby="older-title">
            <h2 id="older-title" className="eyebrow">
              {labels.more}
            </h2>
            {other.map((post) => (
              <article className="archive-row" key={post.url}>
                <time className="mono" dateTime={post.date}>
                  {post.formattedDate}
                </time>
                <div>
                  <h3>
                    <a href={post.url}>
                      {post.title}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </h3>
                  <p>{post.description}</p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
