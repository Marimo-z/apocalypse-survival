<template>
  <div class="mx-auto max-w-6xl px-4 py-24 md:px-6">
    <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">404 / Missing folio</p>
    <h1 class="mt-4 font-display text-6xl font-extrabold tracking-wide uppercase">页码缺失</h1>
    <p class="mt-4 max-w-md text-muted">这份档案不在当前版本里。回到知识库或从检索入口再找一次。</p>
    <div class="mt-8 flex gap-3">
      <RouterLink to="/field" class="bg-rust px-4 py-3 font-mono text-[11px] tracking-[0.14em] text-paper uppercase">
        知识库
      </RouterLink>
      <RouterLink to="/search" class="border border-ink px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase">
        检索
      </RouterLink>
    </div>
  </div>
</template>
