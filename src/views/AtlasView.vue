<script setup lang="ts">
import WorldChart from '@/components/atlas/WorldChart.vue'
import {
  atlasLayers,
  atlasRegions,
  getAtlasRegion,
  hazardLabels,
  resourceLabels,
  type AtlasLayer,
  type ResourceKey,
} from '@/content/atlas'
import { getArticle } from '@/content/articles'
import { scenarios } from '@/content/scenarios'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const layer = ref<AtlasLayer>('all')
const resources = Object.keys(resourceLabels) as ResourceKey[]

const activeId = computed(() => {
  const fromRoute = String(route.params.id || '')
  if (atlasRegions.some((region) => region.id === fromRoute)) return fromRoute
  return atlasRegions[0].id
})

const region = computed(() => getAtlasRegion(activeId.value) ?? atlasRegions[0])

const links = computed(() =>
  region.value.related
    .map((id) => {
      const article = getArticle(id)
      if (article) return { href: `/article/${article.slug}`, title: article.title }
      const scenario = scenarios.find((item) => item.id === id)
      if (scenario) return { href: `/scenarios/${scenario.id}`, title: scenario.title }
      return null
    })
    .filter((item): item is { href: string; title: string } => Boolean(item)),
)

function select(id: string) {
  router.replace({ path: `/atlas/${id}` })
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6">
    <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Field atlas</p>
    <h1 class="mt-3 font-display text-5xl font-extrabold tracking-wide uppercase">全球资源图</h1>

    <div class="mt-8 flex flex-wrap gap-2">
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

    <div class="mt-6 grid gap-6 lg:grid-cols-12">
      <div class="border border-line bg-paper lg:col-span-8">
        <div class="flex items-center justify-between border-b border-line px-4 py-2">
          <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">FIG. WORLD</p>
          <p class="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">示意投影 · 非航海图</p>
        </div>
        <WorldChart :active-id="activeId" :layer="layer" @select="select" />
        <div class="grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
          <button
            v-for="item in atlasRegions"
            :key="item.id"
            type="button"
            class="cursor-pointer bg-paper px-3 py-2 text-left transition-colors duration-200 hover:bg-bg"
            :class="activeId === item.id ? 'text-rust' : 'text-ink'"
            @click="select(item.id)"
          >
            <span class="block font-mono text-[10px] tracking-[0.12em] text-muted">{{ item.code }}</span>
            <span class="font-display text-lg font-extrabold uppercase">{{ item.name }}</span>
          </button>
        </div>
      </div>

      <aside class="border border-line bg-paper lg:col-span-4">
        <div class="border-b border-line px-5 py-4">
          <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">{{ region.code }} · {{ region.en }}</p>
          <h2 class="mt-2 font-display text-4xl font-extrabold tracking-wide uppercase">{{ region.name }}</h2>
          <p class="mt-2 text-sm text-muted">{{ region.biome }}</p>
        </div>

        <div class="space-y-4 px-5 py-5">
          <div>
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">资源评级</p>
            <ul class="mt-3 space-y-2">
              <li v-for="key in resources" :key="key">
                <div class="mb-1 flex justify-between font-mono text-[11px] tracking-[0.08em] uppercase">
                  <span>{{ resourceLabels[key] }}</span>
                  <span class="text-rust">{{ region.scores[key] }} / 5</span>
                </div>
                <div class="flex gap-1">
                  <span
                    v-for="n in 5"
                    :key="n"
                    class="h-1.5 flex-1"
                    :class="n <= region.scores[key] ? 'bg-olive' : 'bg-line'"
                  />
                </div>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">灾害带</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="hazard in region.hazards"
                :key="hazard"
                class="border border-rust px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-rust uppercase"
              >
                {{ hazardLabels[hazard] }}
              </span>
            </div>
          </div>

          <ul class="space-y-2 text-sm leading-relaxed">
            <li v-for="line in region.intel" :key="line">{{ line }}</li>
          </ul>
        </div>

        <div v-if="links.length" class="border-t border-line px-5 py-4">
          <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">延伸阅读</p>
          <div class="mt-3 flex flex-col gap-2">
            <RouterLink
              v-for="item in links"
              :key="item.href"
              :to="item.href"
              class="cursor-pointer text-sm hover:text-rust"
            >
              {{ item.title }}
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
