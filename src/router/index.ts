import AppLayout from '@/layout/AppLayout.vue'
import NProgress from 'nprogress'
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
          path: '/list-transaction',
          name: 'Paramater',
          component: () => import('@/views/ListTransactionPage.vue')
        }
      ],
    },
  ],
})

// Nonaktifkan spinner default dan hanya tampilkan bar progress.
NProgress.configure({
  showSpinner: false,
})

router.beforeEach((to, from, next) => {
  // Mulai progress bar setiap kali proses navigasi dimulai.
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
})

// Selesaikan progress bar setelah navigasi berhasil.
router.afterEach(() => {
  NProgress.done()
})

// Pastikan progress dihentikan jika navigasi gagal.
router.onError(() => {
  NProgress.done()
})

export default router
