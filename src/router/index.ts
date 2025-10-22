import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing Page',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'Login Page',
      component: () => import('@/views/auth/LoginPage.vue'),
    },
  ],
})

export default router
