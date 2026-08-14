/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
// import { showMessage } from '@/utils/toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err: Error, to: RouteLocationNormalized) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})
const blockedRoutes = [
  /^\/auth\/accept-invite-team\/[^/]+\/[^/]+\/?$/,
  /^\/panel\/colaborators\/?$/,
  /^\/panel\/editions\/?$/,
  /^\/panel\/editions\/add\/?$/,
  /^\/panel\/editions\/view\/[^/]+\/?$/,
  /^\/panel\/paper\/[^/]+\/?$/,
  /^\/panel\/admin\/?$/,
  /^\/panel\/admin\/proposals\/?$/,
  /^\/panel\/admin\/reports\/?$/,
  /^\/panel\/works\/?$/,
  /^\/panel\/works\/add\/?$/,
  /^\/panel\/works\/view\/[^/]+\/?$/,
  /^\/panel\/registration-of-topics\/?$/,
]
// TODO: rever logica do works
//

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const is_authenticated = JSON.parse(localStorage.getItem("state_user") || '{"isLogged": false}')
  if (blockedRoutes.some(route => route.test(to.path)) && !is_authenticated.isLogged) {
    return next('/auth/login')
  }
  next()
})


router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const works = JSON.parse(localStorage.getItem("worksstorage") || '{"userWorks": []}')
  const userWork = works?.userWorks[0]
  if (userWork) {
    if (/^\/panel\/works\/add\/?$/.test(to.path) && new Date().getFullYear() === userWork.edition.year) {
      if (userWork.status !== 4) {
        return next('/panel/works/')
      }
      else {
        return next()
      }
    }
  }
  next()
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
