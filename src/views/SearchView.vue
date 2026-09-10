<script setup lang="ts">
import SearchField from '@/components/ui/SearchField.vue'
import { articlesBySlugs } from '@/content/articles'
import { useSearch } from '@/composables/useSearch'
import { useLibraryStore } from '@/stores/library'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const library = useLibraryStore()
const query = computed(() => String(route.query.q ?? ''))
const { results } = useSearch(() => query.value)
const saved = computed(() => articlesBySlugs(library.bookmarks))
const recent = computed(() => articlesBySlugs(library.recent))

const kindLabel = {
  article: '篇目',
  scenario: '情景',
  category: '板块',
} as const
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 md:px-6">
    <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Index</p>
    <h1 class="mt-3 font-display text-5xl font-extrabold tracking-wide uppercase">检索</h1>
    <div class="mt-6">
      <SearchField :initial="query" />
    </div>

    <div v-if="query && !results.length" class="mt-10 border border-line bg-paper p-6 text-muted">
      没有匹配「{{ query }}」。试着换「净水」「失温」「地震」或「清单」。
    </div>

    <ul v-if="results.length" class="mt-8 divide-y divide-line border-y border-line">
      <li v-for="hit in results" :key="hit.kind + hit.id">
        <RouterLink :to="hit.href" class="block cursor-pointer py-5 hover:text-rust">
          <p class="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
            {{ kindLabel[hit.kind] }}
          </p>
          <h2 class="mt-1 font-display text-2xl font-extrabold uppercase">{{ hit.title }}</h2>
          <p class="mt-2 line-clamp-2 text-sm text-muted">{{ hit.excerpt }}</p>
        </RouterLink>
      </li>
    </ul>

    <section v-if="!query" class="mt-12 space-y-10">
      <div v-if="saved.length">
        <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">收藏</p>
        <div class="mt-3 flex flex-col gap-2">
          <RouterLink
            v-for="article in saved"
            :key="article.slug"
            :to="`/article/${article.slug}`"
            class="cursor-pointer text-sm hover:text-rust"
          >
            {{ article.title }}
          </RouterLink>
        </div>
      </div>
      <div v-if="recent.length">
        <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">最近阅读</p>
        <div class="mt-3 flex flex-col gap-2">
          <RouterLink
            v-for="article in recent"
            :key="article.slug"
            :to="`/article/${article.slug}`"
            class="cursor-pointer text-sm hover:text-rust"
          >
            {{ article.title }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
