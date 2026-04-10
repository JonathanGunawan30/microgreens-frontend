import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false,
    error: null,
    order: {},
    pagination: {
      page: 1,
      total_count: 0,
      per_page: 10,
      total_pages: 0
    }
  }),
  
  actions: {
    async fetchOrders(params = {}) {
      try {
        this.loading = true
        this.error = null
        const { search, page, limit, status } = params
        
        const query = new URLSearchParams()
        if (search) query.append('search', search)
        if (page) query.append('page', page)
        if (limit) query.append('limit', limit) 
        if (status) query.append('status', status)

        const response = await fetch(`${useRuntimeConfig().public.apiOrderBaseUrl}/auth/orders?${query.toString()}`, {
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          }
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch orders')

        this.orders = result.data || []
        this.pagination = result.pagination || this.pagination
        
        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchOrdersAdmin(params = {}) {
      try {
        this.loading = true
        this.error = null
        const { search, page, limit, status } = params
        
        const query = new URLSearchParams()
        if (search) query.append('search', search)
        if (page) query.append('page', page)
        if (limit) query.append('limit', limit) 
        if (status) query.append('status', status)

        const response = await fetch(`${useRuntimeConfig().public.apiOrderBaseUrl}/admin/orders?${query.toString()}`, {
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          }
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch admin orders')

        this.orders = result.data || []
        this.pagination = result.pagination || this.pagination

        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async createOrders(orderData, lat, lng) {
      try {
        this.loading = true
        this.error = null

        const response = await fetch(`${useRuntimeConfig().public.apiOrderBaseUrl}/auth/orders?lat=${lat}&lng=${lng}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to create order')

        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async getDetailOrders(orderId, isAdmin = false) {
      try {
        this.loading = true
        this.error = null

        const endpoint = isAdmin ? `/admin/orders/${orderId}` : `/auth/orders/${orderId}`
        const response = await fetch(`${useRuntimeConfig().public.apiOrderBaseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          },
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch order detail')

        this.order = result.data
        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async getOrderByCode(code) {
      try {
        this.loading = true
        this.error = null

        const response = await fetch(`${useRuntimeConfig().public.apiOrderBaseUrl}/auth/orders/${code}/code`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          },
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to fetch order by code')

        this.order = result.data
        return result
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateStatusOrder(orderId, dataUpdate) {
      try {
        this.loading = true
        this.error = null

        const response = await fetch(`${useRuntimeConfig().public.apiOrderBaseUrl}/admin/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${useCookie('token').value}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataUpdate)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Failed to update status')

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