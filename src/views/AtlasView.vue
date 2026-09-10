<script setup lang="ts">
import WorldChart from '@/components/atlas/WorldChart.vue'
import {
  atlasCountries,
  atlasLayers,
  atlasLegend,
  atlasSources,
  falkenmark,
  getAtlasCountry,
  ranked,
  relatedGuides,
  seismicLabel,
  stressLabel,
  type AtlasLayer,
} from '@/content/atlas'
import { getArticle } from '@/content/articles'
import { scenarios } from '@/content/scenarios'
import { Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const layer = ref<AtlasLayer>('water')
const query = ref('')

const activeIso3 = computed(() => {
  const id = String(route.params.id || 'CHN').toUpperCase()
  return getAtlasCountry(id) ? id : 'CHN'
})

const country = computed(() => getAtlasCountry(activeIso3.value) ?? atlasCountries[0])
const waterTag = computed(() => falkenmark(country.value.waterM3))
const stressTag = computed(() => stressLabel(country.value.stressPct))
const ranking = computed(() => ranked(layer.value))
const legend = computed(() => atlasLegend(layer.value))

const matches = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return atlasCountries
    .filter(
      (item) =>
        item.nameZh.includes(q) ||
        item.mapName.toLowerCase().includes(q) ||
        item.iso3.toLowerCase().includes(q),
    )
    .slice(0, 8)
})

const links = computed(() =>
  relatedGuides(country.value)
    .map((id) => {
      const article = getArticle(id)
      if (article) return { href: `/article/${article.slug}`, title: article.title }
      const scenario = scenarios.find((item) => item.id === id)
      if (scenario) return { href: `/scenarios/${scenario.id}`, title: scenario.title }
      return null
    })
    .filter((item): item is { href: string; title: string } => Boolean(item)),
)

function select(iso3: string) {
  query.value = ''
  router.replace({ path: `/atlas/${iso3}` })
}

function rankText(value: number) {
  if (layer.value === 'water') return `${value.toLocaleString()} m³`
  if (layer.value === 'stress') return `${value}%`
  if (layer.value === 'seismic') return value === 2 ? '高' : value === 1 ? '中' : '低'
  return value ? '影响区' : '—'
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6">
    <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Field atlas</p>
    <h1 class="mt-3 font-display text-5xl font-extrabold tracking-wide uppercase">全球地理图</h1>
    <p class="mt-4 max-w-2xl text-muted">
      色块来自世界银行人均可再生淡水与用水紧张度；地震与气旋按 USGS / GEM 与 WMO 公开灾害带划分。点击国家查看数值。
    </p>

    <div class="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in atlasLayers"
          :key="item.id"
          type="button"
          class="cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-200"
          :class="layer === item.id ? 'border-rust bg-rust text-paper' : 'border-line text-muted hover:border-rust hover:text-rust'"
          @click="layer = item.id"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="relative w-full md:w-72">
        <Search
          class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          :size="16"
          stroke-width="1.75"
        />
        <input
          v-model="query"
          type="search"
          placeholder="国家 / ISO3"
          class="h-10 w-full border border-line bg-paper pr-3 pl-9 font-mono text-xs text-ink placeholder:text-muted/80 focus:border-rust focus:outline-none"
          aria-label="检索国家"
        />
        <ul
          v-if="matches.length"
          class="absolute top-full right-0 left-0 z-20 mt-1 border border-line bg-paper"
        >
          <li v-for="item in matches" :key="item.iso3">
            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-sm hover:bg-bg-deep hover:text-rust"
              @click="select(item.iso3)"
            >
              <span>{{ item.nameZh }}</span>
              <span class="font-mono text-[10px] text-muted">{{ item.iso3 }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-12">
      <div class="border border-line bg-paper lg:col-span-8">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2">
          <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">
            {{ atlasLayers.find((item) => item.id === layer)?.label }}
          </p>
          <p class="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">拖拽缩放 · 点击国家</p>
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-2 border-b border-line px-4 py-2">
          <span v-for="item in legend" :key="item.label" class="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.08em] text-muted uppercase">
            <span class="inline-block h-2.5 w-2.5" :style="{ background: item.color }" />
            {{ item.label }}
          </span>
        </div>
        <WorldChart :active-iso3="activeIso3" :layer="layer" @select="select" />
      </div>

      <aside class="border border-line bg-paper lg:col-span-4">
        <div class="border-b border-line px-5 py-4">
          <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">
            {{ country.iso3 }} · {{ country.mapName }}
          </p>
          <h2 class="mt-2 font-display text-4xl font-extrabold tracking-wide uppercase">{{ country.nameZh }}</h2>
        </div>
        <div class="space-y-4 px-5 py-5 text-sm">
          <div>
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">人均可再生淡水</p>
            <p class="mt-1 font-display text-3xl font-extrabold">
              {{ country.waterM3 == null ? '—' : country.waterM3.toLocaleString() }}
              <span class="text-base font-normal text-muted"> m³/人·年</span>
            </p>
            <p class="mt-1 text-muted">
              {{ country.waterYear ? `${country.waterYear} 年` : '' }}
              · {{ waterTag.label }}
            </p>
          </div>
          <div>
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">用水紧张度</p>
            <p class="mt-1 font-display text-3xl font-extrabold">
              {{ country.stressPct == null ? '—' : country.stressPct }}
              <span class="text-base font-normal text-muted"> %</span>
            </p>
            <p class="mt-1 text-muted">
              {{ country.stressYear ? `${country.stressYear} 年` : '' }}
              · {{ stressTag.label }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="border border-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase">
              地震 {{ seismicLabel(country.seismic) }}
            </span>
            <span
              class="border px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase"
              :class="country.cyclone ? 'border-rust text-rust' : 'border-line text-muted'"
            >
              {{ country.cyclone ? '热带气旋影响区' : '非主要气旋盆地' }}
            </span>
          </div>
        </div>
        <div v-if="links.length" class="border-t border-line px-5 py-4">
          <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">手册对照</p>
          <div class="mt-3 flex flex-col gap-2">
            <RouterLink v-for="item in links" :key="item.href" :to="item.href" class="cursor-pointer text-sm hover:text-rust">
              {{ item.title }}
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>

    <section class="mt-6 border border-line bg-paper">
      <div class="border-b border-line px-5 py-3">
        <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">
          {{ layer === 'water' ? '淡水最紧缺' : layer === 'stress' ? '用水压力最高' : layer === 'seismic' ? '地震高危带优先' : '气旋影响区' }}
        </p>
      </div>
      <div class="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <button
          v-for="row in ranking"
          :key="row.country.iso3"
          type="button"
          class="cursor-pointer bg-paper px-4 py-3 text-left transition-colors duration-200 hover:text-rust"
          :class="activeIso3 === row.country.iso3 ? 'text-rust' : ''"
          @click="select(row.country.iso3)"
        >
          <span class="block font-mono text-[10px] tracking-[0.12em] text-muted">{{ row.country.iso3 }}</span>
          <span class="font-display text-xl font-extrabold uppercase">{{ row.country.nameZh }}</span>
          <span class="mt-1 block text-sm text-muted">{{ rankText(row.value) }}</span>
        </button>
      </div>
    </section>

    <ul class="mt-6 space-y-2 text-sm text-muted">
      <li v-for="item in atlasSources" :key="item.label">
        <strong class="text-ink">{{ item.label }}。</strong>
        {{ item.note }}
      </li>
    </ul>
  </div>
</template>
