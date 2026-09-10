<script setup lang="ts">
import type { FigureId } from '@/content/types'

defineProps<{
  name: FigureId
  caption: string
  code?: string
}>()
</script>

<template>
  <figure class="border border-line bg-paper">
    <div class="flex items-center justify-between border-b border-line px-4 py-2">
      <p class="font-mono text-[10px] tracking-[0.16em] text-rust uppercase">
        {{ code || 'FIG.' }}
      </p>
      <p class="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">Fig.</p>
    </div>
    <div class="field-grid px-4 py-6">
      <svg
        v-if="name === 'threes'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="三日法则时间尺度：空气、庇护、水、食物"
      >
        <text x="16" y="28" class="fill-current" font-family="IBM Plex Mono" font-size="11">RULE OF THREES</text>
        <rect x="16" y="48" width="70" height="148" fill="var(--rust)" />
        <rect x="96" y="78" width="90" height="118" fill="var(--ember)" opacity="0.85" />
        <rect x="196" y="108" width="130" height="88" fill="var(--olive)" />
        <rect x="336" y="128" width="168" height="68" fill="var(--olive-soft)" />
        <text x="28" y="88" fill="var(--paper)" font-family="IBM Plex Mono" font-size="10">3 MIN</text>
        <text x="28" y="168" fill="var(--paper)" font-size="16" font-family="Big Shoulders Display" font-weight="800">空气</text>
        <text x="110" y="108" fill="var(--paper)" font-family="IBM Plex Mono" font-size="10">3 HRS</text>
        <text x="110" y="168" fill="var(--paper)" font-size="16" font-family="Big Shoulders Display" font-weight="800">庇护</text>
        <text x="214" y="132" fill="var(--paper)" font-family="IBM Plex Mono" font-size="10">3 DAYS</text>
        <text x="214" y="176" fill="var(--paper)" font-size="18" font-family="Big Shoulders Display" font-weight="800">水</text>
        <text x="354" y="152" fill="var(--paper)" font-family="IBM Plex Mono" font-size="10">3 WEEKS</text>
        <text x="354" y="176" fill="var(--paper)" font-size="18" font-family="Big Shoulders Display" font-weight="800">食物</text>
      </svg>

      <svg
        v-else-if="name === 'water'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="净水三步：澄清、煮沸、化学消毒"
      >
        <g fill="none" stroke="currentColor" stroke-width="1.4">
          <rect x="20" y="40" width="140" height="140" />
          <rect x="190" y="40" width="140" height="140" />
          <rect x="360" y="40" width="140" height="140" />
        </g>
        <text x="36" y="64" font-family="IBM Plex Mono" font-size="10" fill="var(--rust)">01 澄清</text>
        <text x="206" y="64" font-family="IBM Plex Mono" font-size="10" fill="var(--rust)">02 煮沸</text>
        <text x="376" y="64" font-family="IBM Plex Mono" font-size="10" fill="var(--rust)">03 消毒</text>
        <path d="M48 150 C70 90, 110 90, 132 150" fill="var(--olive)" opacity="0.25" />
        <path d="M48 150 C70 90, 110 90, 132 150" fill="none" stroke="var(--olive)" stroke-width="2" />
        <circle cx="260" cy="128" r="28" fill="none" stroke="var(--ember)" stroke-width="3" />
        <path d="M248 150 L260 88 L272 150" fill="none" stroke="var(--ember)" stroke-width="2" />
        <circle cx="430" cy="128" r="8" fill="var(--olive)" />
        <circle cx="454" cy="140" r="5" fill="var(--olive-soft)" />
        <text x="36" y="172" font-size="12" fill="currentColor">布滤 / 静置</text>
        <text x="206" y="172" font-size="12" fill="currentColor">沸腾约 1 分钟</text>
        <text x="376" y="172" font-size="12" fill="currentColor">无香精漂白水</text>
        <path d="M162 110 L188 110" stroke="var(--rust)" stroke-width="1.5" />
        <path d="M332 110 L358 110" stroke="var(--rust)" stroke-width="1.5" />
      </svg>

      <svg
        v-else-if="name === 'shelter'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="简易掩体剖面：挡风层、睡眠腔、地面隔热"
      >
        <path d="M60 170 L260 40 L460 170" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M90 170 L260 58 L430 170" fill="var(--olive)" opacity="0.18" />
        <rect x="150" y="148" width="220" height="28" fill="var(--olive-soft)" />
        <ellipse cx="260" cy="138" rx="54" ry="16" fill="var(--ember)" opacity="0.7" />
        <text x="70" y="36" font-family="IBM Plex Mono" font-size="10" fill="var(--rust)">DEBRIS / TARP</text>
        <text x="168" y="128" font-size="12">睡眠腔宜小</text>
        <text x="168" y="194" font-size="12">地面隔热 ≥ 15cm</text>
      </svg>

      <svg
        v-else-if="name === 'fire'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="火三角：燃料、氧气、温度"
      >
        <polygon points="260,36 430,186 90,186" fill="none" stroke="currentColor" stroke-width="1.6" />
        <circle cx="260" cy="132" r="36" fill="var(--rust)" />
        <text x="236" y="138" fill="var(--paper)" font-family="Big Shoulders Display" font-size="22" font-weight="800">火</text>
        <text x="236" y="28" font-family="IBM Plex Mono" font-size="11">温度</text>
        <text x="400" y="208" font-family="IBM Plex Mono" font-size="11">氧气</text>
        <text x="70" y="208" font-family="IBM Plex Mono" font-size="11">燃料</text>
        <text x="160" y="100" font-size="12">引火 → 细枝 → 燃料木</text>
      </svg>

      <svg
        v-else-if="name === 'kit'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="撤离包分层：水与食物在底，证件手电在顶"
      >
        <rect x="150" y="30" width="220" height="160" fill="none" stroke="currentColor" stroke-width="1.6" />
        <rect x="160" y="40" width="200" height="36" fill="var(--rust)" />
        <rect x="160" y="84" width="200" height="48" fill="var(--olive)" opacity="0.85" />
        <rect x="160" y="140" width="200" height="40" fill="var(--olive-soft)" />
        <text x="176" y="63" fill="var(--paper)" font-size="13">顶层：药 / 光 / 证件</text>
        <text x="176" y="113" fill="var(--paper)" font-size="13">中层：衣物 / 卫生 / 工具</text>
        <text x="176" y="165" fill="var(--paper)" font-size="13">底层：水与罐头</text>
      </svg>

      <svg
        v-else-if="name === 'signal'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="求救信号：三短哨音与地面标志"
      >
        <path d="M40 110 H140" stroke="var(--rust)" stroke-width="8" stroke-linecap="round" />
        <path d="M170 110 H270" stroke="var(--rust)" stroke-width="8" stroke-linecap="round" />
        <path d="M300 110 H400" stroke="var(--rust)" stroke-width="8" stroke-linecap="round" />
        <text x="40" y="70" font-family="IBM Plex Mono" font-size="11" fill="var(--rust)">WHISTLE × 3</text>
        <text x="40" y="160" font-size="14">停留在已知点，让自己被看见</text>
        <polygon points="440,50 500,170 380,170" fill="none" stroke="currentColor" stroke-width="3" />
        <text x="428" y="130" font-family="IBM Plex Mono" font-size="16">V</text>
      </svg>

      <svg
        v-else-if="name === 'bleed'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="大出血处理顺序：安全、压迫、呼救"
      >
        <rect x="24" y="50" width="140" height="120" fill="none" stroke="currentColor" />
        <rect x="190" y="50" width="140" height="120" fill="var(--rust)" />
        <rect x="356" y="50" width="140" height="120" fill="none" stroke="currentColor" />
        <text x="40" y="88" font-family="IBM Plex Mono" font-size="11">01 场景安全</text>
        <text x="206" y="88" fill="var(--paper)" font-family="IBM Plex Mono" font-size="11">02 持续压迫</text>
        <text x="372" y="88" font-family="IBM Plex Mono" font-size="11">03 呼救转运</text>
        <text x="40" y="140" font-size="13">手套 / 远离危险</text>
        <text x="206" y="140" fill="var(--paper)" font-size="13">不要反复揭开</text>
        <text x="372" y="140" font-size="13">记录时间</text>
      </svg>

      <svg
        v-else-if="name === 'blackout'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="高层停电示意：电梯停用，走楼梯，水箱有限"
      >
        <rect x="180" y="20" width="160" height="180" fill="none" stroke="currentColor" stroke-width="1.6" />
        <line x1="180" y1="56" x2="340" y2="56" stroke="currentColor" />
        <line x1="180" y1="96" x2="340" y2="96" stroke="currentColor" />
        <line x1="180" y1="136" x2="340" y2="136" stroke="currentColor" />
        <rect x="248" y="40" width="24" height="36" fill="var(--line)" />
        <path d="M80 40 L80 190" stroke="var(--rust)" stroke-width="2" />
        <path d="M70 60 L80 40 L90 60" fill="none" stroke="var(--rust)" />
        <text x="40" y="120" font-size="13">走楼梯</text>
        <text x="360" y="70" font-size="13">水箱余量有限</text>
        <text x="360" y="150" font-size="13">冰箱少开门</text>
      </svg>

      <svg
        v-else-if="name === 'mind'"
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="家庭分工：水、伤员、通讯、轮值"
      >
        <circle cx="110" cy="110" r="46" fill="none" stroke="currentColor" />
        <circle cx="260" cy="70" r="46" fill="none" stroke="var(--rust)" />
        <circle cx="260" cy="150" r="46" fill="none" stroke="currentColor" />
        <circle cx="410" cy="110" r="46" fill="none" stroke="currentColor" />
        <text x="88" y="114" font-size="14">水账</text>
        <text x="234" y="74" fill="var(--rust)" font-size="14">伤员</text>
        <text x="234" y="154" font-size="14">轮值</text>
        <text x="386" y="114" font-size="14">通讯</text>
      </svg>

      <svg
        v-else
        viewBox="0 0 520 220"
        class="mx-auto h-auto w-full max-w-xl text-ink"
        role="img"
        aria-label="卫生隔离：洗手、粪便远离水源、垃圾密封"
      >
        <rect x="30" y="50" width="140" height="120" fill="none" stroke="currentColor" />
        <rect x="190" y="50" width="140" height="120" fill="none" stroke="currentColor" />
        <rect x="350" y="50" width="140" height="120" fill="none" stroke="currentColor" />
        <text x="48" y="84" font-family="IBM Plex Mono" font-size="11" fill="var(--rust)">HANDS</text>
        <text x="208" y="84" font-family="IBM Plex Mono" font-size="11" fill="var(--rust)">WASTE</text>
        <text x="368" y="84" font-family="IBM Plex Mono" font-size="11" fill="var(--rust)">TRASH</text>
        <text x="48" y="140" font-size="13">肥皂 20 秒</text>
        <text x="208" y="140" font-size="13">远离水源厨房</text>
        <text x="368" y="140" font-size="13">密封防虫</text>
      </svg>
    </div>
    <figcaption class="border-t border-line px-4 py-3 text-sm text-muted">
      {{ caption }}
    </figcaption>
  </figure>
</template>
