<script setup lang="ts">
import SearchField from '@/components/ui/SearchField.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)

const links = [
  { to: '/field', label: '知识库' },
  { to: '/scenarios', label: '情景' },
  { to: '/atlas', label: '资源图' },
  { to: '/kit', label: '装备清单' },
  { to: '/about', label: '关于' },
]

function isActive(to: string) {
  if (to === '/field') return route.path.startsWith('/field') || route.path.startsWith('/article')
  return route.path.startsWith(to)
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
      <RouterLink to="/" class="group flex min-w-0 items-center gap-3" @click="open = false">
        <span class="grid h-10 w-10 place-items-center border border-rust text-rust">
          <svg viewBox="0 0 32 32" class="h-6 w-6" aria-hidden="true">
            <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M16 6 L18 16 L16 26 L14 16 Z" fill="currentColor" />
            <path d="M6 16 L16 14 L26 16 L16 18 Z" fill="currentColor" opacity="0.45" />
            <circle cx="16" cy="16" r="2" fill="var(--bg)" stroke="currentColor" />
          </svg>
        </span>
        <span class="min-w-0">
          <span class="block font-mono text-[10px] tracking-[0.22em] text-rust uppercase">FM-09</span>
          <span class="block truncate font-display text-lg leading-none font-extrabold tracking-wide uppercase">
            末日生存指南
          </span>
        </span>
      </RouterLink>

      <nav class="ml-4 hidden items-center gap-1 lg:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="cursor-pointer px-3 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200"
          :class="isActive(link.to) ? 'text-rust' : 'text-muted hover:text-ink'"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="ml-auto hidden w-64 md:block">
        <SearchField compact />
      </div>
      <ThemeToggle />
      <button
        type="button"
        class="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-line bg-paper lg:hidden"
        :aria-expanded="open"
        aria-label="打开菜单"
        @click="open = !open"
      >
        <X v-if="open" :size="18" />
        <Menu v-else :size="18" />
      </button>
    </div>

    <div v-if="open" class="border-t border-line bg-paper px-4 py-4 lg:hidden">
      <div class="mb-4 md:hidden">
        <SearchField compact />
      </div>
      <nav class="flex flex-col">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="cursor-pointer border-b border-line py-3 font-mono text-xs tracking-[0.16em] uppercase"
          :class="isActive(link.to) ? 'text-rust' : 'text-ink'"
          @click="open = false"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
