import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/landing',
      name: 'Landing Page',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/',
      name: 'Login Page',
      component: () => import('@/views/auth/LoginPage.vue'),
    },
  ],
})

export default router
