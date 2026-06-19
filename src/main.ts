import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/index.vue'
import Projects from './pages/projects.vue'
import Uses from './pages/uses.vue'
import Notes from './pages/notes.vue'
import Gallery from './pages/gallery.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/uses', component: Uses },
  { path: '/notes', component: Notes },
  { path: '/gallery', component: Gallery },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
