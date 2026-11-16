import { defineStore } from 'pinia'
import { apiFetch } from '~/utils/api'

export const useRoleStore = defineStore('roles', {
    state: () => ({
        roles: [],
        role: {},
        loading: false,
        error: null,
    }),
    
    actions: {
        async fetchRoles() {
            try {
                this.loading = true

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/admin/roles`)

                if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.message || 'Failed to fetch roles')
                }

                const result = await response.json()
                this.roles = result.data

                return result

            } catch (err) {
                this.error = err?.message || 'Something went wrong'
                throw err
            } finally {
                this.loading = false
            }
        },
        async fetchRoleID(roleID) {
            try {
            this.loading = true
    
            const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/admin/roles/${roleID}`)
    
            const result = await response.json()
            
            this.role = result.data

            return result
            
            } catch (err) {
                this.error = err?.message || 'Something went wrong'
                throw err
            } finally {
                this.loading = false
            }
        },

        async createRole(name) {
            try {
            this.loading = true
    
            const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/admin/roles`, {
                method: 'POST',
                body: JSON.stringify({
                    name: name
                })
            })
    
            const result = await response.json()

            await this.fetchRoles()

            return result
            
            } catch (err) {
                this.error = err?.message || 'Something went wrong'
                throw err
            } finally {
                this.loading = false
            }
        },
    }
})