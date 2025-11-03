import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import '@/assets/tailwind.css'
import '@/assets/styles.scss'
import '@/assets/nprogress.scss'
import { applyRedPreset } from './theme/theme'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
applyRedPreset()

app.mount('#app')
