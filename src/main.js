import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import { useTranslationStore } from './store/translationStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
useTranslationStore(pinia).setLanguage('en')

app.mount('#app')