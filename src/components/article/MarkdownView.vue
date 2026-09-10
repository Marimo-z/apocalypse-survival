<script setup lang="ts">
import { extractToc, renderMarkdown, withHeadingIds } from '@/composables/useMarkdown'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  source: string
}>()

const router = useRouter()
const html = computed(() => withHeadingIds(renderMarkdown(props.source)))
const toc = computed(() => extractToc(html.value))

function onClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return
  const anchor = target.closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('http') || href.startsWith('#')) return
  event.preventDefault()
  router.push(href)
}

defineExpose({ toc })
</script>

<template>
  <div class="prose-field" @click="onClick" v-html="html" />
</template>
