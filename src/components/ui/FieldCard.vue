<script setup lang="ts">
defineProps<{
  code?: string
  title: string
  en?: string
  blurb: string
  to: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex cursor-pointer flex-col border border-line bg-paper/80 p-5 transition-colors duration-200 hover:border-rust hover:bg-paper"
  >
    <div class="mb-6 flex items-start justify-between gap-3">
      <p v-if="code" class="font-mono text-[10px] tracking-[0.18em] text-rust uppercase">
        {{ code }}
      </p>
      <p v-if="en" class="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
        {{ en }}
      </p>
    </div>
    <h3 class="font-display text-2xl font-extrabold tracking-wide text-ink uppercase">
      {{ title }}
    </h3>
    <p class="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-muted">
      {{ blurb }}
    </p>
    <slot />
    <span class="mt-6 font-mono text-[10px] tracking-[0.16em] text-rust uppercase transition-colors duration-200 group-hover:text-ember">
      打开档案 →
    </span>
  </RouterLink>
</template>
