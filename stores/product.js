import { defineStore } from 'pinia'
import { apiFetch } from '~/utils/api'
import { compressAndConvertToWebP } from '~/utils/image'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        product: {},
        loading: false,
        error: null,
        imageUrl: null,
        pagination: {
          page: 1,
          total_count: 0,
          per_page: 10,
          total_pages: 0
        }
    }),
    
    actions: {
      async fetchProductsHome() {
        try {
          this.loading = true
          this.error = null
  
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/products/featured`, {
            auth: false,
          })
  
          if (!response.ok) {
            const errorResult = await response.json().catch(() => ({}))
            this.error = errorResult.message || 'Failed to fetch featured products'
            return { success: false, message: this.error }
          }

          const result = await response.json()
          this.products = result.data
          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async fetchProductsShop(params = {}) {
      try {
        this.loading = true
        this.error = null

        const { search, page, limit, orderBy, category, startPrice, endPrice } = params
        
        const query = new URLSearchParams()
        
        if (search) query.append('search', search)
        if (page) query.append('page', page)
        if (limit) query.append('limit', limit) 
        if (orderBy) query.append('orderBy', orderBy)
        if (category) query.append('category', category)
        
        if (startPrice !== undefined && startPrice !== '') query.append('startPrice', startPrice)
        if (endPrice !== undefined && endPrice !== '') query.append('endPrice', endPrice)

        const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/products?${query.toString()}`, {
          auth: false,
        })

        if (!response.ok) {
          const errorResult = await response.json().catch(() => ({}))
          this.error = errorResult.message || 'Failed to fetch products'
          return { success: false, message: this.error }
        }

        const result = await response.json()
        this.products = result.data
        this.pagination = result.pagination
        return { success: true, data: result }
          
      } catch (err) {
        this.error = err.message || 'Network error'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

      async fetchProductSuggestions(keyword, limit = 5, signal) {
        const trimmed = (keyword || '').trim()
        if (trimmed.length < 2) {
          return []
        }

        const query = new URLSearchParams({
          q: trimmed,
          limit: String(limit),
        })

        const response = await apiFetch(
          `${useRuntimeConfig().public.apiProductBaseUrl}/products/suggest?${query.toString()}`,
          {
            auth: false,
            signal,
          }
        )

        if (!response.ok) {
          return []
        }

        const result = await response.json()
        return Array.isArray(result.data) ? result.data : []
      },

      async fetchProductDetailHome(productId) {
        try {
          this.loading = true
          this.error = null
  
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/products/${productId}`, {
            auth: false,
          })
  
          if (!response.ok) {
            const errorResult = await response.json().catch(() => ({}))
            this.error = errorResult.message || 'Failed to fetch product details'
            return { success: false, message: this.error }
          }

          const result = await response.json()
          this.product = result.data
          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async fetchProductsAdmin(params = {}) {
        try {
          this.loading = true
          this.error = null

          const { search, page, limit, status, orderBy, category, isParent } = params
          const query = new URLSearchParams()
          if (search) query.append('search', search)
          if (page) query.append('page', page)
          if (limit) query.append('limit', limit) 
          if (status) query.append('status', status)
          if (orderBy) query.append('orderBy', orderBy)
          if (category) query.append('category', category)
          
          if (isParent) query.append('is_parent', isParent)
  
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/products?${query.toString()}`)
  
          if (!response.ok) {
            const errorResult = await response.json().catch(() => ({}))
            this.error = errorResult.message || 'Failed to fetch admin products'
            return { success: false, message: this.error }
          }

          const result = await response.json()
          this.products = result.data
          this.pagination = result.pagination
          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async createProductAdmin(formData) {
        try {
          this.loading = true
          this.error = null
  
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/products`, {
            method: 'POST',
            body: JSON.stringify(formData)
          })
  
          const result = await response.json()
          
          if (!response.ok) {
            this.error = result.message || 'Failed to create product'
            return { success: false, message: this.error }
          }

          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async fetchProductDetail(id) {
        try {
          this.loading = true
          this.error = null
          
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/products/${id}`)
      
          if (!response.ok) {
            const errorResult = await response.json().catch(() => ({}))
            this.error = errorResult.message || 'Failed to fetch product detail'
            return { success: false, message: this.error }
          }
      
          const result = await response.json()
          this.product = result.data
          return { success: true, data: result }
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async updateProduct(id, data) {
        try {
          this.loading = true
          this.error = null
          
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
          })
    
          const result = await response.json()
          
          if (!response.ok) {
            this.error = result.message || 'Failed to update product'
            return { success: false, message: this.error }
          }

          return { success: true, data: result }
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async deleteProductAdmin(productId) {
        try {
          this.loading = true
          this.error = null
  
          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/products/${productId}`, {
            method: 'DELETE',
          })
  
          const result = await response.json()
          
          if (!response.ok) {
            this.error = result.message || 'Failed to delete product'
            return { success: false, message: this.error }
          }

          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async uploadImage(file) {
        try {
          if (!file) {
            this.error = 'File not found'
            return { success: false, message: this.error }
          }

          this.loading = true
          this.error = null

          const processedFile = await compressAndConvertToWebP(file, 800, 0.8)

          const formData = new FormData()
          formData.append('image', processedFile) 

          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/image-upload`, {
            method: 'POST',
            body: formData
          })

          if (!response.ok) {
             const errorResult = await response.json().catch(() => ({ message: 'Failed to upload image' }))
             this.error = errorResult.message || 'Failed to upload image'
             return { success: false, message: this.error }
          }

          const result = await response.json()
          this.imageUrl = result.data.image_url 
          return { success: true, data: result }

        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async uploadImageAuth(file) {
        try {
          if (!file) {
            this.error = 'File not found'
            return { success: false, message: this.error }
          }

          this.loading = true
          this.error = null

          const processedFile = await compressAndConvertToWebP(file, 800, 0.8)

          const formData = new FormData()
          formData.append('image', processedFile) 

          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/image-upload`, {
            method: 'POST',
            body: formData
          })

          if (!response.ok) {
             const errorResult = await response.json().catch(() => ({ message: 'Failed to upload image' }))
             this.error = errorResult.message || 'Failed to upload image'
             return { success: false, message: this.error }
          }

          const result = await response.json()
          this.imageUrl = result.data.image_url 
          return { success: true, data: result }

        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },



      async deleteImage(imageUrl) {
        try {
          if (!imageUrl) return { success: true }

          this.loading = true
          this.error = null

          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/image`, {
            method: 'DELETE',
            body: JSON.stringify({ image_url: imageUrl }) 
          })

          if (!response.ok) {
             const errorResult = await response.json().catch(() => ({ message: 'Failed to delete image' }))
             this.error = errorResult.message || 'Failed to delete image'
             return { success: false, message: this.error }
          }

          const result = await response.json()
          return { success: true, data: result }

        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async deleteImageAuth(imageUrl) {
        try {
          if (!imageUrl) return { success: true }

          this.loading = true
          this.error = null

          const response = await apiFetch(`${useRuntimeConfig().public.apiProductBaseUrl}/auth/image`, {
            method: 'DELETE',
            body: JSON.stringify({ image_url: imageUrl }) 
          })

          if (!response.ok) {
             const errorResult = await response.json().catch(() => ({ message: 'Failed to delete image' }))
             this.error = errorResult.message || 'Failed to delete image'
             return { success: false, message: this.error }
          }

          const result = await response.json()
          return { success: true, data: result }

        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },
    }
})