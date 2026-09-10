<script setup lang="ts">
import FieldFigure from '@/components/figures/FieldFigure.vue'
import { kitItems } from '@/content/kit'
import { useKitStore } from '@/stores/kit'
import { computed } from 'vue'

const kit = useKitStore()
const groups = computed(() => {
  const map = new Map<string, typeof kitItems>()
  for (const item of kitItems) {
    const list = map.get(item.group) ?? []
    list.push(item)
    map.set(item.group, list)
  }
  return [...map.entries()]
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:px-6">
    <div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Go-kit ledger</p>
        <h1 class="mt-3 font-display text-5xl font-extrabold tracking-wide uppercase">装备清单</h1>
        <p class="mt-4 max-w-xl text-muted">
          撤离至少 3 天，居家争取 2 周。
        </p>
        <div class="mt-8 flex flex-wrap items-end gap-6 border border-line bg-paper p-5">
          <div>
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">完成度</p>
            <p class="font-display text-5xl font-extrabold text-rust">{{ kit.progress }}%</p>
          </div>
          <div>
            <p class="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">核心项</p>
            <p class="font-display text-3xl font-extrabold">{{ kit.essentialDone }} / {{ kit.essentialTotal }}</p>
          </div>
          <button
            type="button"
            class="ml-auto cursor-pointer border border-line px-3 py-2 font-mono text-[10px] tracking-[0.14em] uppercase hover:border-rust hover:text-rust"
            @click="kit.reset()"
          >
            清空勾选
          </button>
        </div>
      </div>
      <div class="lg:col-span-5">
        <FieldFigure name="kit" code="FIG. PACK" caption="重物沉底，夜间要用的东西放在最上面。" />
      </div>
    </div>

    <div class="mt-12 space-y-10">
      <section v-for="[group, items] in groups" :key="group">
        <h2 class="font-display text-3xl font-extrabold tracking-wide uppercase">{{ group }}</h2>
        <ul class="mt-4 divide-y divide-line border-y border-line">
          <li v-for="item in items" :key="item.id">
            <label class="flex cursor-pointer items-start gap-4 py-4">
              <input
                class="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-rust"
                type="checkbox"
                :checked="kit.checkedSet.has(item.id)"
                @change="kit.toggle(item.id)"
              />
              <span class="min-w-0">
                <span class="flex flex-wrap items-center gap-2">
                  <span class="font-medium">{{ item.label }}</span>
                  <span
                    v-if="item.essential"
                    class="border border-rust px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-rust uppercase"
                  >
                    核心
                  </span>
                </span>
                <span class="mt-1 block text-sm text-muted">{{ item.hint }}</span>
              </span>
            </label>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
