import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: false,
})

export function renderMarkdown(source: string) {
  return markdown.render(source.trim())
}

export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(html: string): TocItem[] {
  const matches = html.matchAll(/<h([2-3])>(.*?)<\/h\1>/g)
  return [...matches].map((match) => {
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    return {
      id: slugify(text),
      text,
      level: Number(match[1]),
    }
  })
}

export function withHeadingIds(html: string) {
  return html.replace(/<h([2-3])>(.*?)<\/h\1>/g, (_all, level, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, '').trim()
    return `<h${level} id="${slugify(text)}">${inner}</h${level}>`
  })
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/-+/g, '-')
}
