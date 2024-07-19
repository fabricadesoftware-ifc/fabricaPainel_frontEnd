import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/others/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test-fields',
      name: 'test-fields',
      component: () => import("@/views/tests/FieldTestView.vue"),
    },
  ]
})

export default router
