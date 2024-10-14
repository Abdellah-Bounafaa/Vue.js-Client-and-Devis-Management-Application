import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientList from '@/views/ClientList.vue'
import DevisList from '@/views/DevisList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientList
    },
    {
      path: '/devis',
      name: 'devis',
      component: DevisList
    }
  ]
})

export default router
