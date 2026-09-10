<template>
  <footer class="border-t border-line bg-bg-deep">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-12 md:px-6">
      <div class="md:col-span-5">
        <p class="font-mono text-[10px] tracking-[0.2em] text-rust uppercase">Disclaimer</p>
        <p class="mt-3 max-w-md text-sm leading-relaxed text-muted">
          本站整理公开应急与野外生存常识，供学习与家庭预案。不能替代专业救援、医疗处置或当地政府指令。危急情况先报警、再自救。
        </p>
      </div>
      <div class="md:col-span-3">
        <p class="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">档案</p>
        <div class="mt-3 flex flex-col gap-2 font-mono text-xs uppercase">
          <RouterLink class="text-ink hover:text-rust" to="/field">知识库</RouterLink>
          <RouterLink class="text-ink hover:text-rust" to="/scenarios">情景预案</RouterLink>
          <RouterLink class="text-ink hover:text-rust" to="/atlas">资源图</RouterLink>
          <RouterLink class="text-ink hover:text-rust" to="/kit">装备清单</RouterLink>
        </div>
      </div>
      <div class="md:col-span-4">
        <p class="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">Edition</p>
        <p class="mt-3 font-display text-3xl font-extrabold tracking-wide text-ink uppercase">
          FIELD MANUAL 09
        </p>
        <p class="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
          apocalypse-survival
        </p>
      </div>
    </div>
  </footer>
</template>
