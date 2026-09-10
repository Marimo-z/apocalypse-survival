<script setup lang="ts">
import {
  atlasCountries,
  atlasSwatches,
  findByMapName,
  layerValue,
  seismicLabel,
  type AtlasLayer,
} from '@/content/atlas'
import { useThemeStore } from '@/stores/theme'
import * as echarts from 'echarts'
import type { EChartsOption, VisualMapComponentOption } from 'echarts'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  activeIso3: string
  layer: AtlasLayer
}>()

const emit = defineEmits<{
  select: [iso3: string]
}>()

const theme = useThemeStore()
const el = ref<HTMLDivElement | null>(null)
const ready = ref(false)
const failed = ref(false)
let chart: echarts.ECharts | null = null
let registered = false
let observer: ResizeObserver | null = null

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

async function ensureWorld() {
  if (registered) return
  const res = await fetch('/geo/world.json')
  if (!res.ok) throw new Error('map missing')
  const geo = await res.json()
  echarts.registerMap('world', geo)
  registered = true
}

function visualMap(): VisualMapComponentOption {
  const textStyle = { color: token('--muted'), fontFamily: 'IBM Plex Mono', fontSize: 10 }
  if (props.layer === 'water') {
    return {
      type: 'piecewise',
      show: false,
      pieces: [
        { lte: 500, color: atlasSwatches.rust },
        { gt: 500, lte: 1000, color: atlasSwatches.ember },
        { gt: 1000, lte: 1700, color: atlasSwatches.sand },
        { gt: 1700, lte: 5000, color: atlasSwatches.moss },
        { gt: 5000, color: atlasSwatches.olive },
      ],
      textStyle,
    }
  }
  if (props.layer === 'stress') {
    return {
      type: 'piecewise',
      show: false,
      pieces: [
        { lte: 25, color: atlasSwatches.olive },
        { gt: 25, lte: 50, color: atlasSwatches.moss },
        { gt: 50, lte: 75, color: atlasSwatches.sand },
        { gt: 75, lte: 100, color: atlasSwatches.ember },
        { gt: 100, color: atlasSwatches.rust },
      ],
      textStyle,
    }
  }
  if (props.layer === 'seismic') {
    return {
      type: 'piecewise',
      show: false,
      pieces: [
        { min: 1.5, max: 2.5, color: atlasSwatches.rust },
        { min: 0.5, max: 1.5, color: atlasSwatches.ember },
        { min: -0.5, max: 0.5, color: atlasSwatches.olive },
      ],
      textStyle,
    }
  }
  return {
    type: 'piecewise',
    show: false,
    pieces: [
      { min: 0.5, max: 1.5, color: atlasSwatches.rust },
      { min: -0.5, max: 0.5, color: atlasSwatches.muted },
    ],
    textStyle,
  }
}

function tooltipValue(iso3: string) {
  const country = atlasCountries.find((item) => item.iso3 === iso3)
  if (!country) return ''
  if (props.layer === 'water') {
    return country.waterM3 == null ? '无数据' : `${country.waterM3.toLocaleString()} m³/人·年（${country.waterYear}）`
  }
  if (props.layer === 'stress') {
    return country.stressPct == null ? '无数据' : `${country.stressPct}%（${country.stressYear}）`
  }
  if (props.layer === 'seismic') return seismicLabel(country.seismic)
  return country.cyclone ? '主要热带气旋影响区' : '非主要气旋盆地'
}

function option(): EChartsOption {
  const ink = token('--ink')
  const line = token('--line')
  const paper = token('--paper')
  const rust = token('--rust')
  const data = atlasCountries.map((country) => {
    const value = layerValue(country, props.layer)
    return {
      name: country.mapName,
      iso3: country.iso3,
      value: value == null ? undefined : value,
    }
  })
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      borderColor: line,
      backgroundColor: paper,
      textStyle: { color: ink, fontFamily: 'Newsreader, Noto Serif SC, serif', fontSize: 13 },
      formatter: (params) => {
        const item = params as { name: string }
        const country = findByMapName(item.name)
        if (!country) return item.name
        return `<strong>${country.nameZh}</strong><br/>${tooltipValue(country.iso3)}`
      },
    },
    visualMap: {
      ...visualMap(),
      left: 12,
      bottom: 12,
      itemWidth: 12,
      itemHeight: 10,
      itemGap: 6,
    },
    series: [
      {
        id: 'world',
        type: 'map',
        map: 'world',
        roam: true,
        selectedMode: 'single',
        zoom: 1.2,
        center: [12, 18],
        scaleLimit: { min: 0.7, max: 12 },
        nameProperty: 'name',
        data,
        itemStyle: {
          borderColor: line,
          borderWidth: 0.55,
          areaColor: paper,
        },
        emphasis: {
          itemStyle: {
            areaColor: rust,
            borderColor: rust,
          },
          label: { show: false },
        },
        select: {
          itemStyle: {
            borderColor: rust,
            borderWidth: 1.8,
          },
          label: { show: false },
        },
        label: { show: false },
      },
    ],
  }
}

async function render() {
  if (!el.value) return
  try {
    await ensureWorld()
  } catch {
    failed.value = true
    return
  }
  if (!chart) {
    chart = echarts.init(el.value, undefined, { renderer: 'canvas' })
    chart.on('click', (params) => {
      const country = findByMapName(String(params.name))
      if (country) emit('select', country.iso3)
    })
  }
  chart.setOption(option(), true)
  const active = atlasCountries.find((item) => item.iso3 === props.activeIso3)
  if (active) {
    chart.dispatchAction({ type: 'select', seriesId: 'world', name: active.mapName })
  }
  ready.value = true
}

function resize() {
  chart?.resize()
}

onMounted(async () => {
  await render()
  window.addEventListener('resize', resize)
  if (el.value) {
    observer = new ResizeObserver(resize)
    observer.observe(el.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  observer?.disconnect()
  chart?.dispose()
  chart = null
})

watch(
  () => [props.layer, props.activeIso3, theme.isDark] as const,
  async () => {
    await nextTick()
    void render()
  },
)
</script>

<template>
  <div class="relative">
    <p
      v-if="failed"
      class="grid h-[min(72vh,680px)] place-items-center px-6 text-center text-sm text-muted"
    >
      世界地图未能加载。请确认本机可以访问 /geo/world.json。
    </p>
    <p
      v-else-if="!ready"
      class="pointer-events-none absolute inset-0 z-10 grid place-items-center font-mono text-[11px] tracking-[0.16em] text-muted uppercase"
    >
      载入地图
    </p>
    <div ref="el" class="h-[min(72vh,680px)] w-full" role="img" aria-label="世界地图" />
  </div>
</template>
