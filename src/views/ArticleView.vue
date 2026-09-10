<script setup lang="ts">
import MarkdownView from '@/components/article/MarkdownView.vue'
import FieldFigure from '@/components/figures/FieldFigure.vue'
import LevelPill from '@/components/ui/LevelPill.vue'
import { extractToc, renderMarkdown, withHeadingIds } from '@/composables/useMarkdown'
import { articles, getArticle } from '@/content/articles'
import { categories } from '@/content/categories'
import { useLibraryStore } from '@/stores/library'
import { Bookmark, BookmarkCheck, Clock3 } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const library = useLibraryStore()

const article = computed(() => getArticle(String(route.params.slug)))
const category = computed(() => categories.find((item) => item.id === article.value?.category))
const html = computed(() => (article.value ? withHeadingIds(renderMarkdown(article.value.body)) : ''))
const toc = computed(() => extractToc(html.value))
const more = computed(() =>
  articles.filter((item) => item.category === article.value?.category && item.slug !== article.value?.slug).slice(0, 3),
)

watch(
  article,
  (value) => {
    if (value) library.touch(value.slug)
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="article" class="mx-auto max-w-6xl px-4 py-10 md:px-6">
    <div class="grid gap-10 lg:grid-cols-12">
      <article class="lg:col-span-8">
        <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">
          {{ category?.code }} · {{ category?.title }}
        </p>
        <h1 class="mt-3 font-display text-4xl leading-none font-extrabold tracking-wide uppercase md:text-6xl">
          {{ article.title }}
        </h1>
        <p class="mt-4 text-lg text-muted">{{ article.subtitle }}</p>
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <LevelPill :level="article.level" />
          <span class="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
            <Clock3 :size="13" /> {{ article.readMinutes }} min
          </span>
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-1 border border-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-200 hover:border-rust hover:text-rust"
            @click="library.toggleBookmark(article.slug)"
          >
            <BookmarkCheck v-if="library.isBookmarked(article.slug)" :size="13" />
            <Bookmark v-else :size="13" />
            {{ library.isBookmarked(article.slug) ? '已收藏' : '收藏' }}
          </button>
        </div>

        <div class="mt-8">
          <FieldFigure :name="article.figure" :code="`FIG. ${category?.code || ''}`" :caption="article.summary" />
        </div>

        <MarkdownView class="mt-10" :source="article.body" />

        <section class="mt-12 border-t border-line pt-8">
          <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">来源</p>
          <ul class="mt-3 space-y-2 text-sm text-muted">
            <li v-for="source in article.sources" :key="source.label">
              <strong class="text-ink">{{ source.label }}。</strong>
              {{ source.note }}
            </li>
          </ul>
        </section>
      </article>

      <aside class="lg:col-span-4">
        <div class="sticky top-24 space-y-6">
          <div class="border border-line bg-paper p-5">
            <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">Contents</p>
            <nav class="mt-3 flex flex-col gap-2">
              <a
                v-for="item in toc"
                :key="item.id"
                :href="`#${item.id}`"
                class="text-sm text-muted transition-colors duration-200 hover:text-rust"
                :class="item.level === 3 ? 'pl-3' : ''"
              >
                {{ item.text }}
              </a>
            </nav>
          </div>
          <div v-if="more.length" class="border border-line bg-paper p-5">
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">同板块</p>
            <RouterLink
              v-for="item in more"
              :key="item.slug"
              :to="`/article/${item.slug}`"
              class="mt-3 block cursor-pointer text-sm hover:text-rust"
            >
              {{ item.title }}
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div v-else class="mx-auto max-w-6xl px-4 py-24">
    <p class="font-display text-4xl font-extrabold uppercase">档案不存在</p>
    <RouterLink to="/field" class="mt-4 inline-block font-mono text-xs text-rust uppercase">返回知识库</RouterLink>
  </div>
</template>
