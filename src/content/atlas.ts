import raw from './atlas-countries.json'

export type AtlasLayer = 'water' | 'stress' | 'seismic' | 'cyclone'
export type SeismicLevel = 'high' | 'moderate' | 'low'

export interface AtlasCountry {
  mapName: string
  iso3: string
  nameZh: string
  waterM3: number | null
  waterYear: string | null
  stressPct: number | null
  stressYear: string | null
  seismic: SeismicLevel
  cyclone: boolean
}

export const atlasCountries = raw as AtlasCountry[]

export const atlasLayers: { id: AtlasLayer; label: string; unit: string }[] = [
  { id: 'water', label: '人均淡水', unit: 'm³/人·年' },
  { id: 'stress', label: '用水紧张度', unit: '%' },
  { id: 'seismic', label: '地震危险', unit: '' },
  { id: 'cyclone', label: '热带气旋', unit: '' },
]

export const atlasSwatches = {
  rust: '#b44a1c',
  ember: '#c45c26',
  sand: '#c4a35a',
  moss: '#8a9a58',
  olive: '#4d5c2a',
  muted: '#7a7366',
} as const

export function atlasLegend(layer: AtlasLayer) {
  if (layer === 'water') {
    return [
      { label: '<500 绝对短缺', color: atlasSwatches.rust },
      { label: '500–1000 短缺', color: atlasSwatches.ember },
      { label: '1000–1700 紧张', color: atlasSwatches.sand },
      { label: '1700–5000', color: atlasSwatches.moss },
      { label: '>5000 充足', color: atlasSwatches.olive },
    ]
  }
  if (layer === 'stress') {
    return [
      { label: '<25% 低压力', color: atlasSwatches.olive },
      { label: '25–50%', color: atlasSwatches.moss },
      { label: '50–75%', color: atlasSwatches.sand },
      { label: '75–100%', color: atlasSwatches.ember },
      { label: '>100% 超采', color: atlasSwatches.rust },
    ]
  }
  if (layer === 'seismic') {
    return [
      { label: '高危带', color: atlasSwatches.rust },
      { label: '中', color: atlasSwatches.ember },
      { label: '低', color: atlasSwatches.olive },
    ]
  }
  return [
    { label: '气旋影响区', color: atlasSwatches.rust },
    { label: '非主要盆地', color: atlasSwatches.muted },
  ]
}

export const atlasSources = [
  { label: '人均可再生淡水', note: '世界银行 WDI ER.H2O.INTR.PC，原始来源 FAO AQUASTAT。取 2012–2021 最新可得年份。' },
  { label: '用水紧张度', note: '世界银行 WDI ER.H2O.FWST.ZS：淡水取用量占可用淡水资源的比例。取 2012–2021 最新可得年份。' },
  { label: 'Falkenmark 指标', note: '人均可再生淡水：>1700 相对充足；1000–1700 紧张；500–1000 短缺；<500 绝对短缺。' },
  { label: '地震危险', note: '按 USGS / GEM 公开的环太平洋与阿尔卑斯—喜马拉雅等高危险带划分高/中/低，不是峰值加速度数值。' },
  { label: '热带气旋', note: '按 WMO 主要气旋盆地（西北太、北大西洋、北印度洋、南印度洋、南太）的沿岸与岛屿影响区标记。' },
]

export function getAtlasCountry(iso3: string) {
  return atlasCountries.find((item) => item.iso3 === iso3)
}

export function findByMapName(name: string) {
  return atlasCountries.find((item) => item.mapName === name)
}

export function falkenmark(m3: number | null) {
  if (m3 == null) return { label: '无数据', tone: 'muted' as const }
  if (m3 > 1700) return { label: '相对充足', tone: 'olive' as const }
  if (m3 > 1000) return { label: '用水紧张', tone: 'ember' as const }
  if (m3 > 500) return { label: '淡水短缺', tone: 'rust' as const }
  return { label: '绝对短缺', tone: 'rust' as const }
}

export function stressLabel(pct: number | null) {
  if (pct == null) return { label: '无数据', tone: 'muted' as const }
  if (pct < 25) return { label: '低压力', tone: 'olive' as const }
  if (pct < 50) return { label: '中等压力', tone: 'ember' as const }
  if (pct < 100) return { label: '高压力', tone: 'rust' as const }
  return { label: '严重超采', tone: 'rust' as const }
}

export function seismicLabel(level: SeismicLevel) {
  if (level === 'high') return '高（板块边界 / 高危带）'
  if (level === 'moderate') return '中'
  return '低'
}

export function layerValue(country: AtlasCountry, layer: AtlasLayer): number | null {
  if (layer === 'water') return country.waterM3
  if (layer === 'stress') return country.stressPct
  if (layer === 'seismic') return country.seismic === 'high' ? 2 : country.seismic === 'moderate' ? 1 : 0
  return country.cyclone ? 1 : 0
}

export function relatedGuides(country: AtlasCountry) {
  const slugs: string[] = []
  if (country.waterM3 != null && country.waterM3 < 1700) slugs.push('water-store', 'water-purify')
  if (country.stressPct != null && country.stressPct >= 50) slugs.push('water-store')
  if (country.seismic === 'high') slugs.push('first-moves', 'earthquake')
  if (country.cyclone) slugs.push('typhoon', 'go-bag')
  if (country.waterM3 != null && country.waterM3 > 10000) slugs.push('flood')
  return [...new Set(slugs)]
}

export function ranked(layer: AtlasLayer) {
  const rows = atlasCountries
    .map((country) => ({ country, value: layerValue(country, layer) }))
    .filter((row) => row.value != null) as { country: AtlasCountry; value: number }[]
  rows.sort((a, b) => (layer === 'water' ? a.value - b.value : b.value - a.value))
  return rows.slice(0, 8)
}
