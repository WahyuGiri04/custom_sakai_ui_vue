import AppLayout from '@/layout/AppLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/landing',
      name: 'Landing Page',
      // Memuat komponen halaman landing secara lazy saat rute diakses.
      component: () => import('@/views/pages/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'Login Page',
      // Memuat komponen halaman login secara lazy saat rute diakses.
      component: () => import('@/views/pages/auth/LoginPage.vue'),
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          // Memuat komponen dashboard utama secara lazy saat rute diakses.
          component: () => import('@/views/DashboardPage.vue'),
        },
        {
          path: '/parameter',
          name: 'Paramater',
          component: () => import('@/views/ParameterPage.vue')
        }
      ],
    },
  ],
})

export default router
