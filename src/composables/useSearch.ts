import { atlasCountries } from '@/content/atlas'
import { articles } from '@/content/articles'
import { categories } from '@/content/categories'
import { scenarios } from '@/content/scenarios'
import Fuse from 'fuse.js'
import { computed } from 'vue'

export interface SearchHit {
  kind: 'article' | 'scenario' | 'category' | 'region'
  id: string
  title: string
  excerpt: string
  haystack: string
  href: string
}

function plain(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*`_[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const corpus: SearchHit[] = [
  ...articles.map((article) => ({
    kind: 'article' as const,
    id: article.slug,
    title: article.title,
    excerpt: article.summary,
    haystack: plain(`${article.summary} ${article.tags.join(' ')} ${article.body}`),
    href: `/article/${article.slug}`,
  })),
  ...scenarios.map((scenario) => ({
    kind: 'scenario' as const,
    id: scenario.id,
    title: scenario.title,
    excerpt: scenario.summary,
    haystack: plain(`${scenario.summary} ${scenario.threat} ${scenario.en}`),
    href: `/scenarios/${scenario.id}`,
  })),
  ...categories.map((category) => ({
    kind: 'category' as const,
    id: category.id,
    title: category.title,
    excerpt: category.blurb,
    haystack: plain(`${category.blurb} ${category.en}`),
    href: `/field/${category.id}`,
  })),
  ...atlasCountries.map((country) => ({
    kind: 'region' as const,
    id: country.iso3,
    title: country.nameZh,
    excerpt: `${country.mapName} · 人均淡水 ${country.waterM3 ?? '—'} m³`,
    haystack: plain(`${country.nameZh} ${country.mapName} ${country.iso3} 淡水 地震 气旋`),
    href: `/atlas/${country.iso3}`,
  })),
]

const fuse = new Fuse(corpus, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'haystack', weight: 0.5 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
})

export function useSearch(query: () => string) {
  const results = computed(() => {
    const q = query().trim()
    if (!q) return []
    const exact = corpus.filter(
      (item) => item.title.includes(q) || item.excerpt.includes(q) || item.haystack.includes(q),
    )
    const fuzzy = fuse.search(q).map((item) => item.item)
    const merged: SearchHit[] = []
    for (const item of [...exact, ...fuzzy]) {
      if (!merged.some((row) => row.kind === item.kind && row.id === item.id)) {
        merged.push(item)
      }
    }
    return merged.slice(0, 16)
  })

  return { results }
}
