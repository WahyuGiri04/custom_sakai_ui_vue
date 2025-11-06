import { defineStore } from 'pinia'
import { TransactionService, type Transaction } from '@/service/TransactionService'

interface TransactionState {
  items: Transaction[]
  loading: boolean
  error: string | null
}

export const useTransactionStore = defineStore('transactions', {
  state: (): TransactionState => ({
    items: [],
    loading: false,
    error: null,
  }),
  getters: {
    hasData: (state): boolean => state.items.length > 0,
  },
  actions: {
    async fetchTransactions(): Promise<void> {
      this.loading = true
      this.error = null

      try {
        this.items = await TransactionService.fetchTransactions()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch transactions'
      } finally {
        this.loading = false
      }
    },
  },
})
