<script setup lang="ts">
import FieldFigure from '@/components/figures/FieldFigure.vue'
import FieldCard from '@/components/ui/FieldCard.vue'
import Stamp from '@/components/ui/Stamp.vue'
import { articles } from '@/content/articles'
import { categories } from '@/content/categories'
import { scenarios } from '@/content/scenarios'

const featured = articles.slice(0, 4)
const spotlight = categories.slice(0, 6)
const rules = [
  { t: '3 分钟', d: '空气 / 冰水' },
  { t: '3 小时', d: '恶劣环境庇护' },
  { t: '3 天', d: '安全饮水' },
  { t: '3 周', d: '食物在最后' },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden border-b border-line field-grid">
      <div
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-rust/10 to-transparent lg:block" />
      <div class="mx-auto grid max-w-6xl items-end gap-10 px-4 pt-14 pb-16 md:px-6 lg:grid-cols-12 lg:pt-20">
        <div class="lg:col-span-8">
          <p class="reveal font-mono text-[11px] tracking-[0.28em] text-rust uppercase">
            Field dossier
          </p>
          <h1
            class="reveal reveal-d1 mt-4 font-display text-[clamp(3.4rem,12vw,8.5rem)] leading-[1] font-extrabold tracking-wide uppercase">
            末日<br />生存指南
          </h1>
          <p class="reveal reveal-d2 mt-6 max-w-xl text-lg text-muted">
            当电网、供水和物流同时停摆，判断力比库存更值钱。
          </p>
          <div class="reveal reveal-d3 mt-8 flex flex-wrap gap-3">
            <RouterLink to="/field"
              class="inline-flex h-12 cursor-pointer items-center bg-rust px-5 font-mono text-[11px] tracking-[0.16em] text-paper uppercase transition-colors duration-200 hover:bg-ember">
              进入知识库
            </RouterLink>
            <RouterLink to="/kit"
              class="inline-flex h-12 cursor-pointer items-center border border-ink px-5 font-mono text-[11px] tracking-[0.16em] text-ink uppercase transition-colors duration-200 hover:border-rust hover:text-rust">
              72 小时清单
            </RouterLink>
          </div>
        </div>
        <div class="reveal reveal-d4 relative lg:col-span-4 lg:justify-self-end">
          <Stamp label="READY / 非恐慌" />
          <dl class="mt-8 space-y-3 border-l border-line pl-4">
            <div>
              <dt class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Edition</dt>
              <dd class="font-display text-2xl font-extrabold">FM-09 / 2026</dd>
            </div>
            <div>
              <dt class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Scope</dt>
              <dd class="text-sm text-muted">家庭预案 · 城市停摆 · 野外基础</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-bg-deep">
      <div class="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        <div v-for="(rule, index) in rules" :key="rule.t" class="border-line px-4 py-6 md:px-6"
          :class="index < 3 ? 'border-r' : ''">
          <p class="font-display text-3xl font-extrabold tracking-wide text-rust md:text-4xl">
            {{ rule.t }}
          </p>
          <p class="mt-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{{ rule.d }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Chapters</p>
          <h2 class="mt-2 font-display text-4xl font-extrabold tracking-wide uppercase">十个板块</h2>
        </div>
        <RouterLink to="/field" class="font-mono text-[11px] tracking-[0.14em] text-rust uppercase hover:text-ember">
          全部档案 →
        </RouterLink>
      </div>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <FieldCard v-for="category in spotlight" :key="category.id" :code="category.code" :title="category.title"
          :en="category.en" :blurb="category.blurb" :to="`/field/${category.id}`" />
      </div>
    </section>

    <section class="border-y border-line bg-paper/50">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <FieldFigure name="threes" code="FIG. 01" caption="时间尺度决定资源分配：先空气与体温，再水，最后才是口粮。" />
        <div class="flex flex-col justify-center">
          <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Lead article</p>
          <h2 class="mt-3 font-display text-4xl font-extrabold tracking-wide uppercase">先学会排序</h2>
          <p class="mt-4 max-w-md text-muted">
            把火柴花在热饭上、却在雨里过夜，是最常见的失败。
          </p>
          <RouterLink to="/article/rule-of-threes"
            class="mt-6 inline-flex w-fit cursor-pointer border-b border-rust pb-1 font-mono text-[11px] tracking-[0.16em] text-rust uppercase">
            阅读三日法则
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Reading list</p>
      <h2 class="mt-2 font-display text-4xl font-extrabold tracking-wide uppercase">推荐篇目</h2>
      <div class="mt-8 divide-y divide-line border-y border-line">
        <RouterLink v-for="article in featured" :key="article.slug" :to="`/article/${article.slug}`"
          class="group grid cursor-pointer gap-2 py-5 md:grid-cols-12 md:items-center">
          <p class="font-mono text-[10px] tracking-[0.14em] text-muted uppercase md:col-span-2">
            {{ article.level }} · {{ article.readMinutes }} MIN
          </p>
          <h3 class="font-display text-2xl font-extrabold tracking-wide uppercase md:col-span-5 group-hover:text-rust">
            {{ article.title }}
          </h3>
          <p class="text-sm text-muted md:col-span-5">{{ article.summary }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="border-t border-line bg-bg-deep">
      <div class="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div class="mb-8 flex items-end justify-between">
          <div>
            <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Scenarios</p>
            <h2 class="mt-2 font-display text-4xl font-extrabold tracking-wide uppercase">情景卡片</h2>
          </div>
          <RouterLink to="/scenarios" class="font-mono text-[11px] tracking-[0.14em] text-rust uppercase">
            全部情景 →
          </RouterLink>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <RouterLink v-for="item in scenarios.slice(0, 3)" :key="item.id" :to="`/scenarios/${item.id}`"
            class="cursor-pointer border border-line bg-bg p-5 transition-colors duration-200 hover:border-rust">
            <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">{{ item.en }}</p>
            <h3 class="mt-3 font-display text-3xl font-extrabold uppercase">{{ item.title }}</h3>
            <p class="mt-3 text-sm text-muted">{{ item.summary }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
