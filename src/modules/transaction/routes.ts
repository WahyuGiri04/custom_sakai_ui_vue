import type { RouteRecordRaw } from 'vue-router'

export const transactionRoutes: RouteRecordRaw[] = [
  {
    path: 'list-transaction',
    name: 'List Transaction',
    component: () => import('./pages/ListTransactionPage.vue'),
  },
  {
    path: 'list-transfer',
    name: 'List Transfer',
    component: () => import('./pages/ListTransferPage.vue'),
  },
]
