import { useAuthStore } from '~/stores/auth' 

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
    
    authStore.checkAuth()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return navigateTo('/auth/signin')
    }
})
