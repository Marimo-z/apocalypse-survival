import type { Article } from '../types'
import { fieldcraftArticles } from './fieldcraft'
import { fundamentalsArticles } from './fundamentals'
import { medicalArticles } from './medical'
import { shelterFireArticles } from './shelter-fire'
import { urbanArticles } from './urban'
import { waterFoodArticles } from './water-food'

export const articles: Article[] = [
  ...fundamentalsArticles,
  ...waterFoodArticles,
  ...shelterFireArticles,
  ...medicalArticles,
  ...fieldcraftArticles,
  ...urbanArticles,
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function articlesByCategory(categoryId: string) {
  return articles.filter((article) => article.category === categoryId)
}

export function articlesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getArticle(slug))
    .filter((article): article is Article => Boolean(article))
}
