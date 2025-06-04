/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { showMessage } from '@/utils/toastify'

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
const routesBloqued = ['/auth/accept-invite-team/:id/:token', "/auth/get-password/", "/auth/my-group/", "/dashboard/colaborators/", "/dashboard/editions/view/:id", "/dashboard/paper/:id", "/dashboard/register-evaluators/", "/panel/", "/panel/paper/:id", "/panel/registration-of-topics/", "/panel/work-submission/"]
const is_authenticated = JSON.parse(localStorage.getItem("state_user") || '{"isLogged": false}')

router.beforeEach((to, from, next) => {
  if(routesBloqued.includes(to.path) && !is_authenticated.isLogged){
    showMessage(
      'tempo de login expirado retornando para a página de login',
      'error',
      1500,
      'right-top',
      'light',
      false
    )
    setTimeout(() => {
      return next('/auth/login')
    }, 1500)
  }
  next()
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
