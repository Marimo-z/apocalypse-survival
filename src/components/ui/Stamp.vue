<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div
    class="stamp-ring pointer-events-none grid h-28 w-28 rotate-[-12deg] place-items-center rounded-full text-stamp"
    aria-hidden="true"
  >
    <div class="grid h-[6.4rem] w-[6.4rem] place-items-center rounded-full border border-current">
      <p class="font-stamp text-[11px] leading-tight tracking-[0.18em] uppercase">
        {{ label || 'FIELD READY' }}
      </p>
    </div>
  </div>
</template>
