/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
// import { showMessage } from '@/utils/toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
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
const routesBloqued = ['/auth/accept-invite-team/:id/:token', "/auth/get-password/", "/panel/colaborators/", "/panel/editions/view/:id", "/panel/paper/:id", "/panel/works/", "/panel/works/add", "/panel/works/add/" ,  "/panel/paper/:id", "/panel/registration-of-topics/"]
// TODO: rever logica do works
//

router.beforeEach((to, from, next) => {
  const is_authenticated = JSON.parse(localStorage.getItem("state_user") || '{"isLogged": false}')
  if (routesBloqued.includes(to.path) && !is_authenticated.isLogged) {
    return next('/')
  }
  next()
})


router.beforeEach((to, from, next) => {
  const works = JSON.parse(localStorage.getItem("worksstorage") || '{"userWorks": []}')
  const userWork = works?.userWorks[0]
  if (userWork) {
    if (to.path === '/panel/works/add/' && new Date().getFullYear() === userWork.edition.year) {
      if (userWork.status !== 4) {
        next('/panel/works/')
      }
      else {
        next()
      }
    }
  }
  next()
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
