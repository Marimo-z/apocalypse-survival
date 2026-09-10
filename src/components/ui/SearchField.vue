<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  initial?: string
  compact?: boolean
}>()

const router = useRouter()
const value = ref(props.initial ?? '')

watch(
  () => props.initial,
  (next) => {
    if (next !== undefined) value.value = next
  },
)

function submit() {
  const q = value.value.trim()
  if (!q) {
    router.push('/search')
    return
  }
  router.push({ path: '/search', query: { q } })
}
</script>

<template>
  <form class="relative" @submit.prevent="submit">
    <Search
      class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
      :size="16"
      stroke-width="1.75"
    />
    <input
      v-model="value"
      type="search"
      name="q"
      placeholder="检索手册…"
      :class="[
        'w-full border border-line bg-paper text-ink placeholder:text-muted/80 focus:border-rust focus:outline-none',
        compact ? 'h-10 pr-3 pl-9 font-mono text-xs' : 'h-12 pr-4 pl-10 font-serif text-base',
      ]"
      aria-label="检索手册"
    />
  </form>
</template>
