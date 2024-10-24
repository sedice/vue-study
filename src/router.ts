import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Home from './components/Home.vue'
import Sub from './components/Sub.vue'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/sub',
    component: Sub,
  },
]
debugger
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const setupRouter = (app: App) => {
  debugger
  app.use(router)
}
