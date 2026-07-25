import { useMemo, useState } from 'react'

export type BlogArchivePost = {
  title: string
  description: string
  date: string
  formattedDate: string
  url: string
}

type ArchiveMonth = {
  key: string
  label: string
}

const normalizeDate = (date: string) => new Date(`${date}T12:00:00`)

const getMonthKey = (date: string) => {
  const parsedDate = normalizeDate(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')

  return `${year}-${month}`
}

const formatArchiveMonth = (monthKey: string) => {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1, 1, 12)
  const monthName = date.toLocaleDateString('pt-BR', { month: 'long' })

  return `${year} - ${monthName[0].toUpperCase()}${monthName.slice(1)}`
}

export default function BlogArchive({ posts }: { posts: BlogArchivePost[] }) {
  const [activeMonth, setActiveMonth] = useState<string | null>(null)

  const months = useMemo<ArchiveMonth[]>(() => {
    const monthKeys = [...new Set(posts.map((post) => getMonthKey(post.date)))]

    return monthKeys.map((key) => ({
      key,
      label: formatArchiveMonth(key),
    }))
  }, [posts])

  const filteredPosts = activeMonth
    ? posts.filter((post) => getMonthKey(post.date) === activeMonth)
    : posts

  const featuredPosts = filteredPosts.slice(0, 2)
  const otherPosts = filteredPosts.slice(2)

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
      <div>
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-lightModeText/70 dark:text-darkModeText/70">
            <span>
              {filteredPosts.length}{' '}
              {filteredPosts.length === 1
                ? 'post encontrado'
                : 'posts encontrados'}
            </span>
            {activeMonth && (
              <button
                type="button"
                className="blog-ui font-semibold text-draculaAccent2 transition hover:text-draculaAccent"
                onClick={() => setActiveMonth(null)}
              >
                Limpar filtro
              </button>
            )}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <section className="rounded-[1.75rem] border border-draculaBorder/20 bg-draculaPanel/90 p-8 text-draculaMuted">
            Nenhum post encontrado para estes filtros.
          </section>
        ) : (
          <>
            <section className="grid gap-6 lg:grid-cols-2">
              {featuredPosts.map((post) => (
                <article
                  className="group rounded-[2rem] border border-draculaBorder/20 bg-draculaPanel/95 p-8 shadow-[0_28px_48px_-32px_rgba(0,0,0,0.55)] transition hover:-translate-y-1 hover:border-draculaAccent hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.45)]"
                  key={post.url}
                >
                  <a
                    className="blog-ui text-sm font-semibold uppercase tracking-[0.25em] text-draculaAccent2 transition hover:text-draculaAccent"
                    href={post.url}
                  >
                    {post.formattedDate}
                  </a>
                  <h2 className="mt-6 text-3xl font-semibold leading-tight text-draculaText">
                    <a href={post.url}>{post.title}</a>
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-draculaMuted">
                    {post.description}
                  </p>
                  <a
                    href={post.url}
                    className="blog-ui mt-8 inline-flex items-center gap-2 text-sm font-semibold text-draculaAccent2 transition hover:text-draculaAccent"
                  >
                    Ler mais →
                  </a>
                </article>
              ))}
            </section>

            {otherPosts.length > 0 && (
              <section className="mt-16">
                <div className="mb-8">
                  <span className="blog-ui text-sm uppercase tracking-[0.4em] text-lightModeText/60 dark:text-darkModeText/60">
                    Arquivos
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-lightModeText dark:text-darkModeText">
                    Posts anteriores
                  </h2>
                </div>

                <div className="space-y-4">
                  {otherPosts.map((post) => (
                    <article
                      className="rounded-[1.75rem] border border-draculaBorder/20 bg-draculaPanel/90 p-6 transition hover:-translate-y-0.5 hover:border-draculaAccent hover:shadow-[0_18px_28px_-24px_rgba(0,0,0,0.45)]"
                      key={post.url}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <a
                          className="blog-ui text-sm font-semibold text-draculaAccent2 hover:text-draculaAccent"
                          href={post.url}
                        >
                          {post.formattedDate}
                        </a>
                        <a
                          href={post.url}
                          className="text-xl font-semibold text-draculaText transition hover:text-draculaAccent"
                        >
                          {post.title}
                        </a>
                      </div>
                      <p className="mt-4 text-base leading-7 text-draculaMuted">
                        {post.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <aside className="lg:sticky lg:top-28">
        <div className="border-l border-draculaBorder/30 pl-5">
          <h2 className="blog-ui mb-5 inline-block bg-draculaPanel px-2 py-1 text-sm font-bold text-draculaText">
            Nesta página
          </h2>
          <nav className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            <button
              type="button"
              className={`blog-ui px-2 py-1 text-left text-sm transition ${
                activeMonth === null
                  ? 'bg-draculaPanel text-draculaText'
                  : 'text-draculaMuted hover:bg-draculaPanel/70 hover:text-draculaText'
              }`}
              onClick={() => setActiveMonth(null)}
            >
              Todos
            </button>
            {months.map((month) => (
              <button
                type="button"
                className={`blog-ui px-2 py-1 text-left text-sm transition ${
                  activeMonth === month.key
                    ? 'bg-draculaPanel text-draculaText'
                    : 'text-draculaMuted hover:bg-draculaPanel/70 hover:text-draculaText'
                }`}
                key={month.key}
                onClick={() => setActiveMonth(month.key)}
              >
                {month.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  )
}
