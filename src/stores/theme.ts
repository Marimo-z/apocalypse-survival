import { usePreferredDark } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'as-theme'

export const useThemeStore = defineStore('theme', () => {
  const preferredDark = usePreferredDark()
  const mode = ref<ThemeMode>('system')

  const isDark = computed(() => {
    if (mode.value === 'system') return preferredDark.value
    return mode.value === 'dark'
  })

  function apply() {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function setMode(next: ThemeMode) {
    mode.value = next
    localStorage.setItem(STORAGE_KEY, next)
    apply()
  }

  function toggle(event?: MouseEvent) {
    const next: ThemeMode = isDark.value ? 'light' : 'dark'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canTransition =
      Boolean(event) &&
      typeof document.startViewTransition === 'function' &&
      !reduced

    if (!canTransition || !event) {
      setMode(next)
      return
    }

    const origin =
      event.currentTarget instanceof HTMLElement
        ? event.currentTarget.getBoundingClientRect()
        : null
    const x = event.clientX || (origin ? origin.left + origin.width / 2 : window.innerWidth / 2)
    const y = event.clientY || (origin ? origin.top + origin.height / 2 : window.innerHeight / 2)
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = document.startViewTransition(() => {
      setMode(next)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  function hydrate() {
    const param = new URLSearchParams(window.location.search).get('theme')
    const saved = param || localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      mode.value = saved
    }
    apply()
  }

  watch([isDark], apply)

  return { mode, isDark, setMode, toggle, hydrate }
})
