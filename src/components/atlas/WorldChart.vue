<script setup lang="ts">
import {
  atlasRegions,
  regionLayerScore,
  type AtlasLayer,
} from '@/content/atlas'

const props = defineProps<{
  activeId: string
  layer: AtlasLayer
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

function markerFill(id: string, score: number) {
  if (props.activeId === id) return 'var(--rust)'
  if (props.layer === 'hazard') return 'var(--ember)'
  const alpha = 0.28 + score * 0.14
  return `color-mix(in srgb, var(--olive) ${Math.round(alpha * 100)}%, var(--paper))`
}
</script>

<template>
  <svg
    viewBox="0 0 1000 500"
    class="h-auto w-full text-ink"
    role="img"
    aria-label="全球生存资源图"
  >
    <rect width="1000" height="500" fill="var(--bg-deep)" />
    <g stroke="var(--line)" stroke-width="0.6" opacity="0.55">
      <line v-for="x in 13" :key="'v' + x" :x1="x * 72" y1="20" :x2="x * 72" y2="470" />
      <line v-for="y in 7" :key="'h' + y" x1="40" :y1="y * 62" x2="960" :y2="y * 62" />
    </g>
    <text x="48" y="36" fill="var(--muted)" font-family="IBM Plex Mono" font-size="11">180W</text>
    <text x="478" y="36" fill="var(--muted)" font-family="IBM Plex Mono" font-size="11">0</text>
    <text x="900" y="36" fill="var(--muted)" font-family="IBM Plex Mono" font-size="11">180E</text>

    <g fill="var(--paper)" stroke="var(--line)" stroke-width="1.4">
      <path d="M78 86 L150 70 L168 92 L148 118 L92 112 Z" />
      <path
        d="M150 78 L248 62 L318 92 L338 148 L292 228 L238 258 L198 228 L168 168 L158 112 Z"
      />
      <path d="M238 258 L268 278 L252 308 L222 282 Z" />
      <path d="M248 292 L302 282 L328 348 L302 428 L262 438 L228 368 L236 318 Z" />
      <path d="M478 86 L548 74 L572 118 L548 158 L498 154 L476 118 Z" />
      <path d="M498 168 L568 158 L602 228 L582 338 L528 368 L498 312 L486 228 Z" />
      <path d="M608 308 L628 304 L632 342 L612 346 Z" />
      <path
        d="M552 64 L718 48 L888 86 L918 148 L848 208 L762 186 L688 164 L608 138 L558 108 Z"
      />
      <path d="M708 186 L768 176 L786 238 L742 262 L704 218 Z" />
      <path d="M772 208 L858 218 L872 262 L798 258 Z" />
      <path d="M848 92 L878 108 L868 148 L838 132 Z" />
      <path d="M818 308 L912 298 L938 348 L888 382 L812 358 Z" />
      <path d="M168 74 L248 58 L236 78 L170 92 Z" opacity="0.9" />
      <rect x="140" y="462" width="720" height="22" />
    </g>

    <g v-for="region in atlasRegions" :key="region.id">
      <circle
        :cx="region.x"
        :cy="region.y"
        r="28"
        fill="transparent"
        class="cursor-pointer"
        @click="emit('select', region.id)"
      />
      <circle
        :cx="region.x"
        :cy="region.y"
        :r="activeId === region.id ? 16 : 12"
        :fill="markerFill(region.id, regionLayerScore(region, layer))"
        :stroke="activeId === region.id ? 'var(--rust)' : 'var(--ink)'"
        :stroke-width="activeId === region.id ? 2.4 : 1.2"
        class="cursor-pointer transition-[r,fill] duration-200"
        @click="emit('select', region.id)"
      />
      <text
        :x="region.x"
        :y="region.y + 4"
        text-anchor="middle"
        class="cursor-pointer"
        fill="var(--ink)"
        font-family="IBM Plex Mono"
        font-size="9"
        @click="emit('select', region.id)"
      >
        {{ region.code.slice(-2) }}
      </text>
    </g>
  </svg>
</template>
