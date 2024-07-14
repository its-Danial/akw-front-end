import './assets/main.css'

import 'primeicons/primeicons.css'

// @ts-ignore
import Lara from './presets/lara'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import AccessControl from './components/access-control.vue'
import { router } from './router'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.use(createPinia())
app.use(router)

app.component('AccessControl', AccessControl)

app.mount('#app')
