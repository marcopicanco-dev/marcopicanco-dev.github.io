type SearchItem = {
  title: string
  description: string
  url: string
  keywords?: string
}
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
const roots = document.querySelectorAll<HTMLElement>('[data-search-root]')
roots.forEach((root) => {
  const dialog = root.querySelector<HTMLDialogElement>('[data-search-overlay]')
  const input = root.querySelector<HTMLInputElement>('[data-search-input]')
  const list = root.querySelector<HTMLElement>('[data-search-list]')
  const count = root.querySelector<HTMLElement>('[data-search-count]')
  const items = JSON.parse(root.dataset.searchItems ?? '[]') as SearchItem[]
  if (!dialog || !input || !list || !count) return
  root.querySelector('[data-search-open]')?.addEventListener('click', () => {
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    input.focus()
  })
  root
    .querySelector('[data-search-close]')
    ?.addEventListener('click', () => dialog.close())
  dialog.addEventListener('close', () => {
    document.body.style.overflow = ''
  })
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      dialog.close()
    }
  })
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect()
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close()
    }
  })
  input.addEventListener('input', () => {
    list.replaceChildren()
    const query = normalize(input.value.trim())
    if (query.length < 3) {
      count.textContent = 'Digite pelo menos 3 caracteres.'
      return
    }
    const words = query.split(/\s+/)
    const results = items.filter((item) => {
      const content = normalize(
        `${item.title} ${item.description} ${item.keywords ?? ''}`,
      )
      const numbers: string[] = content.match(/\d+/g) ?? []
      return words.every((word) =>
        /^\d+$/.test(word) ? numbers.includes(word) : content.includes(word),
      )
    })
    count.textContent = results.length
      ? `${results.length} ${results.length === 1 ? 'texto encontrado' : 'textos encontrados'}`
      : (root.dataset.noResults ?? 'Nenhum resultado')
    results.forEach((item) => {
      const link = document.createElement('a')
      link.href = item.url
      const title = document.createElement('h3')
      title.textContent = item.title
      const description = document.createElement('p')
      description.textContent = item.description
      link.append(title, description)
      list.append(link)
    })
  })
})

export {}
