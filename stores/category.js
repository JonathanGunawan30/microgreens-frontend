import { defineStore } from 'pinia'

const compressAndConvertToWebP = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image'))
            return
          }
          
          const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp"
          
          const newFile = new File([blob], fileName, {
            type: 'image/webp',
            lastModified: Date.now(),
          })
          
          resolve(newFile)
        }, 'image/webp', quality)
      }
      img.onerror = (error) => reject(error)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const useCategoryStore = defineStore('categories', {
    state: () => ({
        categories: [],
        category: {},
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
      async fetchCategoriesHome() {
        try {
          this.loading = true
          this.error = true

          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/categories/featured`, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const result = await response.json()
          
          this.categories = result.data

          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async fetchCategoriesShop() {
        try {
          this.loading = true
          this.error = null
        
          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/categories`, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          if (!response.ok) {
            const errorResult = await response.json()
            this.error = errorResult.message || 'Failed to fetch shop categories'
            return { success: false, message: this.error }
          }

          const result = await response.json()
          this.categories = result.data
          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async fetchCategoriesAdmin(params = {}) {
        try {
          this.loading = true
          this.error = null

          const { search, page, limit, orderBy } = params
          const query = new URLSearchParams()
          if (search) query.append('search', search)
          if (page) query.append('page', page)
          if (limit) query.append('limit', limit)
          if (orderBy) query.append('orderBy', orderBy)

          const queryString = query.toString()
          const url = `${useRuntimeConfig().public.apiProductBaseUrl}/admin/categories${queryString ? `?${queryString}` : ''}`

          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${useCookie('token').value}`
            }
          })

          if (!response.ok) {
            const errorResult = await response.json()
            this.error = errorResult.message || 'Failed to fetch admin categories'
            return { success: false, message: this.error }
          }

          const result = await response.json()
          this.categories = result.data
          this.pagination = result.pagination
          return { success: true, data: result }

        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async fetchCategoryByIDAdmin(id) {
        try {
          this.loading = true
          this.error = null
  
          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/categories/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${useCookie('token').value}`
            }
          })
  
          if (!response.ok) {
            const errorResult = await response.json()
            this.error = errorResult.message || 'Category not found'
            return { success: false, message: this.error }
          }

          const result = await response.json()
          this.category = result.data
          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error occurred'
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

          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/image-upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${useCookie('token').value}`,
            },
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
          if (!imageUrl) {
            return { success: true }
          }

          this.loading = true
          this.error = null

          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/image`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${useCookie('token').value}`,
              'Content-Type': 'application/json' 
            },
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

      async createCategory(formData) {
        try {
          this.loading = true
          this.error = null

          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/categories`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${useCookie('token').value}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })

          const result = await response.json()
          
          if (!response.ok) {
            this.error = result.message || 'Something went wrong'
            return { success: false, message: this.error }
          }

          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async editCategory(formData, id) {
        try {
          this.loading = true
          this.error = null

          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/categories/${id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${useCookie('token').value}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })

          const result = await response.json()
          
          if (!response.ok) {
            this.error = result.message || 'Something went wrong'
            return { success: false, message: this.error }
          }

          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },

      async deleteCategory(id) {
        try {
          this.loading = true
          this.error = null

          const response = await fetch(`${useRuntimeConfig().public.apiProductBaseUrl}/admin/categories/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${useCookie('token').value}`,
              'Content-Type': 'application/json'
            },
          })

          const result = await response.json()
          
          if (!response.ok) {
            this.error = result.message || 'Something went wrong'
            return { success: false, message: this.error }
          }

          return { success: true, data: result }
          
        } catch (err) {
          this.error = err.message || 'Network error occurred'
          return { success: false, message: this.error }
        } finally {
          this.loading = false
        }
      },
    },
})