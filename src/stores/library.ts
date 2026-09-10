import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const BOOKMARK_KEY = 'as-bookmarks'
const RECENT_KEY = 'as-recent'

export const useLibraryStore = defineStore('library', () => {
  const bookmarks = ref<string[]>([])
  const recent = ref<string[]>([])

  const bookmarkSet = computed(() => new Set(bookmarks.value))

  function hydrate() {
    try {
      bookmarks.value = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]')
      recent.value = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
    } catch {
      bookmarks.value = []
      recent.value = []
    }
  }

  function isBookmarked(slug: string) {
    return bookmarkSet.value.has(slug)
  }

  function toggleBookmark(slug: string) {
    if (isBookmarked(slug)) {
      bookmarks.value = bookmarks.value.filter((item) => item !== slug)
      return
    }
    bookmarks.value = [slug, ...bookmarks.value]
  }

  function touch(slug: string) {
    recent.value = [slug, ...recent.value.filter((item) => item !== slug)].slice(0, 8)
  }

  watch(bookmarks, (value) => {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(value))
  })

  watch(recent, (value) => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(value))
  })

  return { bookmarks, recent, isBookmarked, toggleBookmark, touch, hydrate }
})
