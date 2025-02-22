import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchUnit from '@/views/SearchUnit.vue'
import CrossCompar from '@/views/CrossCompar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/searchUnit',
      name: 'searchUnit',
      component: SearchUnit,
    },
    {
      path: '/crossCompar',
      name: 'crossCompar',
      component: CrossCompar,
    },
    // {
    //   path: '/SearchUnit',
    //   name: 'SearchUnit',
    //   component: () => import('@/views/SearchUnit.vue'),
    // },
  ],
})

export default router
