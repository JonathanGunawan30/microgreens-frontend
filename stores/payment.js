import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
      payments: [],
      payment: null,
      loading: false,
      error: null,
      pagination: {
        page: 1,
        total_count: 0,
        per_page: 10,
        total_pages: 0
      }
  }),

  actions: {
    async createPayment(payload) {
      try {
        this.loading = true
        this.error = null

        const response = await fetch(`${useRuntimeConfig().public.apiPaymentBaseUrl}/auth/payments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useCookie('token').value}`
          },
          body: JSON.stringify(payload)
        })
        
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to process payment')

        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchPayments(params = {}, isAdmin = false) {
      try {
        this.loading = true
        this.error = null
        const { page, limit } = params
        
        const query = new URLSearchParams()
        if (page) query.append('page', page)
        if (limit) query.append('limit', limit) 

        const endpoint = isAdmin ? `/admin/payments` : `/auth/payments`
        const response = await fetch(`${useRuntimeConfig().public.apiPaymentBaseUrl}${endpoint}?${query.toString()}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          }
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch payments')

        this.payments = result.data || []
        this.pagination = result.pagination || this.pagination

        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async getPaymentDetail(paymentId, isAdmin = false) {
      try {
        this.loading = true
        this.error = null

        const endpoint = isAdmin ? `/admin/payments/${paymentId}` : `/auth/payments/${paymentId}`
        const response = await fetch(`${useRuntimeConfig().public.apiPaymentBaseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          }
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch payment detail')

        this.payment = result.data
        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})