import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useKitStore } from './stores/kit'
import { useLibraryStore } from './stores/library'
import { useThemeStore } from './stores/theme'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

useThemeStore(pinia).hydrate()
useLibraryStore(pinia).hydrate()
useKitStore(pinia).hydrate()

app.mount('#app')
