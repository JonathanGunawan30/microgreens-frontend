import { defineStore } from 'pinia'
import { apiFetch, getAuthCookieOptions } from '~/utils/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        loading: false,
        error: null,
        user: null
    }),

    actions: {
        async signin (email, password) {
            try {
                this.loading = true
                this.error = null

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/signin`, {
                    auth: false,
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                })

                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!');
                }

                this.user = {
                    ...data.data,
                    role: data.data.role
                }
                this.token = data.data.access_token

                const cookieOpts = getAuthCookieOptions()
                const tokenCookie = useCookie('token', cookieOpts)
                tokenCookie.value = this.token

                const userCookie = useCookie('user', cookieOpts)
                userCookie.value = JSON.stringify(this.user)

                return data
            } catch (err) {
                this.error = err.message
                throw err
            } finally {
                this.loading = false
            }
        },

        isSuperAdmin() {
            return this.user?.role === 'Super Admin'
        },
        
        checkAuth() {
            const cookieOpts = getAuthCookieOptions()
            const tokenCookie = useCookie('token', cookieOpts)
            const userCookie = useCookie('user', cookieOpts)
            if (tokenCookie.value && userCookie.value) {
                this.token = tokenCookie.value
                this.user = userCookie.value 
            }
        },

        async signup(userData) {
            try {
                this.loading = true
                this.error = null
                
                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/signup`, {
                    auth: false,
                    method: 'POST',
                    body: JSON.stringify(userData)
                })
                
                const data = await response.json()
                
                if (!response.ok) {
                    throw new Error(data.message || 'An error occurred during registration')
                }
                
                return data
            } catch (err) {
                this.error = err.message
                throw err
            } finally {
                this.loading = false
            }
        },

        async forgotPassword (email) {
            try {
                this.loading = true
                this.error = null

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/forgot-password`, {
                    auth: false,
                    method: 'POST',
                    body: JSON.stringify({ email })
                })

                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!');
                }

                return data
            } catch (err) {
                this.error = err.message
                throw err 
            } finally {
                this.loading = false
            }
        },

        async verifyAccount (token) {
            try {
                this.loading = true
                this.error = null

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/verify-account?token=${encodeURIComponent(token)}`, {
                    auth: false,
                    method: 'GET',
                })

                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Verification failed!');
                }

                const userData = data.data
                
                this.user = {
                    ...userData,
                    role: userData.role || userData.role_name
                }
                this.token = userData.token || userData.access_token 

                const cookieOpts = getAuthCookieOptions()
                const tokenCookie = useCookie('token', cookieOpts)
                tokenCookie.value = this.token

                const userCookie = useCookie('user', cookieOpts)
                userCookie.value = JSON.stringify(this.user)

                return data
            } catch (err) {
                this.error = err.message
                throw err 
            } finally {
                this.loading = false
            }
        },
        
        async updatePasswordNoAuth (password_new, password_confirmation, token) {
            try {
                this.loading = true
                this.error = null

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/update-password`, {
                    auth: false,
                    method: 'PUT',
                    body: JSON.stringify({password_new, password_confirmation, token})
                })

                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!');
                }

                return data
            } catch (err) {
                this.error = err.message
                throw err
            } finally {
                this.loading = false
            }
        },

        async getProfile () {
            try {
                this.loading = true
        
                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/profile`)
        
                const result = await response.json()
                
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch profile')
                }

                this.user = result.data

                return result
                
            } catch (err) {
                this.error = err.message
                throw err 
            } finally {
                this.loading = false
            }
        },

        async updateProfile (userData) {
            try {
                this.loading = true
                this.error = null

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/profile`, {
                    method: 'PUT',
                    body: JSON.stringify(userData)
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong!');
                }
                return data
            } catch (err) {
                this.error = err.message
                throw err
            } finally {
                this.loading = false
            }
        },

        async changePassword (passwordData) {
            const swal = useSwal()
            try {
                this.loading = true
                this.error = null

                const response = await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/profile/password`, {
                    method: 'PATCH',
                    body: JSON.stringify(passwordData)
                })

                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong, please try again');
                }

                swal.toastSuccess('Password updated successfully!')
                return data
            } catch (err) {
                this.error = err.message
                swal.error('Failed', err.message || 'Something went wrong, please try again')
                throw err
            } finally {
                this.loading = false
            }
        },

        async logout() {
            const cookieOpts = getAuthCookieOptions()
            try {
                this.loading = true;
                const currentToken = useCookie('token', cookieOpts).value;
                if (currentToken) {
                    await apiFetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/logout`, {
                        method: 'POST',
                    }).catch(e => console.warn('Logout API failed:', e));
                }
            } finally {
                this.user = null
                this.token = null
                const tokenCookie = useCookie('token', cookieOpts)
                tokenCookie.value = null
                const userCookie = useCookie('user', cookieOpts)
                userCookie.value = null
                this.loading = false;
            }
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        userRole: (state) => state.user?.role
    }
})