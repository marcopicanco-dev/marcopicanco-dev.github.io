import { useMemo, useState } from 'react'

export type BlogArchivePost = {
  title: string
  description: string
  date: string
  formattedDate: string
  url: string
}
const getMonthKey = (date: string) => date.slice(0, 7)
const formatArchiveMonth = (key: string) => {
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month - 1, 1, 12).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogArchive({ posts }: { posts: BlogArchivePost[] }) {
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
        <h2 className="eyebrow">Arquivo</h2>
        <nav aria-label="Filtrar artigos por mês">
          <button
            type="button"
            aria-pressed={activeMonth === null}
            onClick={() => setActiveMonth(null)}
          >
            Todos os textos{' '}
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
              {formatArchiveMonth(month)}
            </button>
          ))}
        </nav>
      </aside>
      <div className="archive-content">
        <div className="archive-count">
          <p role="status">
            {filtered.length}{' '}
            {filtered.length === 1 ? 'texto publicado' : 'textos publicados'}
          </p>
          {activeMonth && (
            <button type="button" onClick={() => setActiveMonth(null)}>
              Limpar filtro ×
            </button>
          )}
        </div>
        <section className="archive-featured" aria-label="Artigos em destaque">
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
                aria-label={`Ler: ${post.title}`}
              >
                Ler artigo <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </section>
        {other.length > 0 && (
          <section className="archive-older" aria-labelledby="older-title">
            <h2 id="older-title" className="eyebrow">
              Mais textos
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
