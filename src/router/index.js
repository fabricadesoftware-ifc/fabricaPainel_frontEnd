import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/others/HomeView.vue'
import WorkTest from '@/views/tests/WorkTest.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/work',
      name: 'work',
      component: WorkTest,
    },
    
  ]
})

export default router
