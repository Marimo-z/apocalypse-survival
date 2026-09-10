<script setup lang="ts">
import { articlesBySlugs } from '@/content/articles'
import { scenarios } from '@/content/scenarios'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const current = computed(() => scenarios.find((item) => item.id === route.params.id) ?? scenarios[0])
const related = computed(() => articlesBySlugs(current.value.related))
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6">
    <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Scenario deck</p>
    <h1 class="mt-3 font-display text-5xl font-extrabold tracking-wide uppercase">情景预案</h1>

    <div class="mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
      <RouterLink
        v-for="item in scenarios"
        :key="item.id"
        :to="`/scenarios/${item.id}`"
        class="cursor-pointer border px-3 py-3 transition-colors duration-200"
        :class="current.id === item.id ? 'border-rust bg-rust text-paper' : 'border-line bg-paper hover:border-rust'"
      >
        <p class="font-mono text-[10px] tracking-[0.14em] uppercase opacity-70">{{ item.en }}</p>
        <p class="mt-1 font-display text-xl font-extrabold uppercase">{{ item.title }}</p>
      </RouterLink>
    </div>

    <article v-if="current" class="mt-10 border border-line bg-paper">
      <div class="grid gap-6 border-b border-line p-6 md:grid-cols-3">
        <div>
          <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Threat</p>
          <p class="mt-2">{{ current.threat }}</p>
        </div>
        <div>
          <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Window</p>
          <p class="mt-2">{{ current.window }}</p>
        </div>
        <div>
          <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Brief</p>
          <p class="mt-2">{{ current.summary }}</p>
        </div>
      </div>
      <div class="grid gap-px bg-line md:grid-cols-3">
        <section class="bg-paper p-6">
          <h2 class="font-display text-2xl font-extrabold uppercase text-rust">立即</h2>
          <ol class="mt-4 list-decimal space-y-3 pl-5 text-sm">
            <li v-for="step in current.now" :key="step">{{ step }}</li>
          </ol>
        </section>
        <section class="bg-paper p-6">
          <h2 class="font-display text-2xl font-extrabold uppercase">随后</h2>
          <ol class="mt-4 list-decimal space-y-3 pl-5 text-sm">
            <li v-for="step in current.next" :key="step">{{ step }}</li>
          </ol>
        </section>
        <section class="bg-paper p-6">
          <h2 class="font-display text-2xl font-extrabold uppercase">之后</h2>
          <ol class="mt-4 list-decimal space-y-3 pl-5 text-sm">
            <li v-for="step in current.later" :key="step">{{ step }}</li>
          </ol>
        </section>
      </div>
    </article>

    <div v-if="related.length" class="mt-8">
      <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">延伸阅读</p>
      <div class="mt-3 flex flex-wrap gap-3">
        <RouterLink
          v-for="article in related"
          :key="article.slug"
          :to="`/article/${article.slug}`"
          class="cursor-pointer border border-line px-3 py-2 text-sm hover:border-rust hover:text-rust"
        >
          {{ article.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
