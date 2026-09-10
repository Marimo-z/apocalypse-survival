<script setup lang="ts">
defineProps<{
  level: string
}>()
</script>

<template>
  <span
    class="inline-flex items-center border border-line bg-paper px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-muted uppercase"
  >
    {{ level }}
  </span>
</template>
