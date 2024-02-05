import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import('../components/ConfigPage.vue')
    }
  ]
})

export default router