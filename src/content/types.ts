export type ArticleLevel = '基础' | '进阶' | '情景'

export type FigureId =
  | 'threes'
  | 'water'
  | 'shelter'
  | 'fire'
  | 'kit'
  | 'signal'
  | 'bleed'
  | 'blackout'
  | 'mind'
  | 'hygiene'

export interface Category {
  id: string
  code: string
  title: string
  en: string
  blurb: string
  figure: FigureId
}

export interface Article {
  slug: string
  title: string
  subtitle: string
  category: string
  level: ArticleLevel
  readMinutes: number
  updated: string
  tags: string[]
  summary: string
  figure: FigureId
  sources: { label: string; note: string }[]
  body: string
}

export interface Scenario {
  id: string
  title: string
  en: string
  threat: string
  window: string
  summary: string
  now: string[]
  next: string[]
  later: string[]
  related: string[]
}

export interface KitItem {
  id: string
  group: string
  label: string
  hint: string
  essential: boolean
}
