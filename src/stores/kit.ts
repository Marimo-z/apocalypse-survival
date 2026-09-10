import { kitItems } from '@/content/kit'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'as-kit'

export const useKitStore = defineStore('kit', () => {
  const checked = ref<string[]>([])

  const checkedSet = computed(() => new Set(checked.value))
  const essentialTotal = kitItems.filter((item) => item.essential).length
  const essentialDone = computed(
    () => kitItems.filter((item) => item.essential && checkedSet.value.has(item.id)).length,
  )
  const progress = computed(() =>
    kitItems.length === 0 ? 0 : Math.round((checked.value.length / kitItems.length) * 100),
  )

  function hydrate() {
    try {
      checked.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      checked.value = []
    }
  }

  function toggle(id: string) {
    if (checkedSet.value.has(id)) {
      checked.value = checked.value.filter((item) => item !== id)
      return
    }
    checked.value = [...checked.value, id]
  }

  function reset() {
    checked.value = []
  }

  watch(checked, (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  })

  return { checked, checkedSet, essentialTotal, essentialDone, progress, hydrate, toggle, reset }
})
