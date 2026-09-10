<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { Moon, Sun } from 'lucide-vue-next'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-line bg-paper text-ink transition-colors duration-200 hover:border-rust hover:text-rust"
    :aria-label="theme.isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="theme.toggle($event)"
  >
    <Sun v-if="theme.isDark" :size="18" stroke-width="1.75" />
    <Moon v-else :size="18" stroke-width="1.75" />
  </button>
</template>
