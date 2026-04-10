import { defineStore } from 'pinia'

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

                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
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

                const tokenCookie = useCookie('token')
                tokenCookie.value = this.token

                const userCookie = useCookie('user')
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
            const tokenCookie = useCookie('token')
            const userCookie = useCookie('user')
            if (tokenCookie.value && userCookie.value) {
                this.token = tokenCookie.value
                this.user = userCookie.value 
            }
        },

        async signup(userData) {
            try {
                this.loading = true
                this.error = null
                
                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/signup`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
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

                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
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

                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/verify-account?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
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

                const tokenCookie = useCookie('token')
                tokenCookie.value = this.token

                const userCookie = useCookie('user')
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

                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/update-password`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
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
        
                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/profile`, {
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    }
                })
        
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

                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/profile`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    },
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

                const response = await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/profile/password`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${useCookie('token').value}`,
                        'Content-Type': 'application/json'
                    },
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
            try {
                this.loading = true;
                const currentToken = useCookie('token').value;
                if (currentToken) {
                    await fetch(`${useRuntimeConfig().public.apiUserBaseUrl}/auth/logout`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${currentToken}`,
                            'Content-Type': 'application/json'
                        }
                    }).catch(e => console.warn('Logout API failed:', e));
                }
            } finally {
                this.user = null
                this.token = null
                const tokenCookie = useCookie('token')
                tokenCookie.value = null
                const userCookie = useCookie('user')
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