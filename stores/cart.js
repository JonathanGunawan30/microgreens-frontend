import { defineStore } from 'pinia'

export const useCartStore = defineStore('carts', {
    state: () => ({
        carts: [],
        loading: false,
        error: null,
    }),

    actions: {
        async fetchCarts() {
            try {
                this.loading = true
                this.error = null

                const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/cart`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const errorResult = await response.json().catch(() => ({}))
                    this.error = errorResult.message || 'Failed to fetch cart data'
                    return { success: false, message: this.error }
                }

                const result = await response.json()
                this.carts = result.data || []
                
                return { success: true, data: result }

            } catch (err) {
                this.error = err.message || 'Network error occurred'
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        },

        async addToCart(productId, quantity = 1) {
            try {
                this.loading = true
                this.error = null

                const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/cart`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product_id: productId,
                        quantity: quantity
                    })
                })

                if (!response.ok) {
                    const errorResult = await response.json().catch(() => ({}))
                    this.error = errorResult.message || 'Failed to add item to cart'
                    return { success: false, message: this.error }
                }

                const result = await response.json()
                await this.fetchCarts()
                
                return { success: true, data: result }

            } catch (err) {
                this.error = err.message || 'Network error occurred'
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        },

        async decreaseItem(productId, quantity = 1) {
            try {
                this.loading = true
                this.error = null

                const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/cart/decrease`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product_id: productId,
                        quantity: quantity 
                    })
                })

                if (!response.ok) {
                    const errorResult = await response.json().catch(() => ({}))
                    this.error = errorResult.message || 'Failed to decrease item quantity'
                    return { success: false, message: this.error }
                }

                const result = await response.json()
                await this.fetchCarts()
                
                return { success: true, data: result }

            } catch (err) {
                this.error = err.message || 'Network error occurred'
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        },

        async removeFromCart(id) {
            try {
                this.loading = true
                this.error = null

                const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/cart/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const errorResult = await response.json().catch(() => ({}))
                    this.error = errorResult.message || 'Failed to remove item from cart'
                    return { success: false, message: this.error }
                }

                const result = await response.json()
                await this.fetchCarts()
                
                return { success: true, data: result }

            } catch (err) {
                this.error = err.message || 'Network error occurred'
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        },

        async clearCart() {
            try {
                this.loading = true
                this.error = null

                const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/cart`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const errorResult = await response.json().catch(() => ({}))
                    this.error = errorResult.message || 'Failed to clear cart'
                    return { success: false, message: this.error }
                }

                const result = await response.json()
                this.carts = [] 
                await this.fetchCarts()
                
                return { success: true, data: result }

            } catch (err) {
                this.error = err.message || 'Network error occurred'
                return { success: false, message: this.error }
            } finally {
                this.loading = false
            }
        }
    },

    getters: {
        totalItems: (state) => state.carts?.length || 0,
    },
})