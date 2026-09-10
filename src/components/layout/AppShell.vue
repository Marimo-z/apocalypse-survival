<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="relative min-h-dvh bg-bg text-ink">
    <div class="flex min-h-dvh flex-col">
      <AppHeader />
      <main class="flex-1">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
