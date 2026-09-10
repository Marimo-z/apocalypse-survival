<script setup lang="ts">
import FieldCard from '@/components/ui/FieldCard.vue'
import LevelPill from '@/components/ui/LevelPill.vue'
import { articles, articlesByCategory } from '@/content/articles'
import { categories } from '@/content/categories'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const current = computed(() => categories.find((item) => item.id === route.params.categoryId))
const list = computed(() => {
  if (!current.value) return articles
  return articlesByCategory(current.value.id)
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6">
    <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Knowledge field</p>
    <h1 class="mt-3 font-display text-5xl font-extrabold tracking-wide uppercase md:text-6xl">
      {{ current ? current.title : '知识库' }}
    </h1>
    <p v-if="current" class="mt-4 max-w-2xl text-muted">
      {{ current.blurb }}
    </p>

    <div class="mt-8 flex flex-wrap gap-2">
      <RouterLink
        to="/field"
        class="cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
        :class="!current ? 'border-rust bg-rust text-paper' : 'border-line text-muted hover:border-rust hover:text-rust'"
      >
        全部
      </RouterLink>
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        :to="`/field/${category.id}`"
        class="cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
        :class="current?.id === category.id ? 'border-rust bg-rust text-paper' : 'border-line text-muted hover:border-rust hover:text-rust'"
      >
        {{ category.title }}
      </RouterLink>
    </div>

    <div v-if="!current" class="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <FieldCard
        v-for="category in categories"
        :key="category.id"
        :code="category.code"
        :title="category.title"
        :en="category.en"
        :blurb="category.blurb"
        :to="`/field/${category.id}`"
      />
    </div>

    <div class="mt-10 divide-y divide-line border-y border-line">
      <RouterLink
        v-for="article in list"
        :key="article.slug"
        :to="`/article/${article.slug}`"
        class="group grid cursor-pointer gap-3 py-6 md:grid-cols-12"
      >
        <div class="md:col-span-3">
          <LevelPill :level="article.level" />
          <p class="mt-2 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
            {{ article.readMinutes }} min · {{ article.updated }}
          </p>
        </div>
        <div class="md:col-span-9">
          <h2 class="font-display text-2xl font-extrabold tracking-wide uppercase group-hover:text-rust">
            {{ article.title }}
          </h2>
          <p class="mt-2 max-w-2xl text-sm text-muted">{{ article.summary }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
