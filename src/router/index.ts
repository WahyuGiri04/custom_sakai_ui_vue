import AppLayout from '@/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/landing',
      name: 'Landing Page',
      component: () => import('@/views/pages/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'Login Page',
      component: () => import('@/views/pages/auth/LoginPage.vue'),
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import('@/views/DashboardPage.vue'),
        },
      ],
    },
  ],
})

export default router
