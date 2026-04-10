import { useAuthStore } from '~/stores/auth' 

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  
  await authStore.checkAuth()

  if (!authStore.user?.role || authStore.user.role !== 'Super Admin') {
    return navigateTo('/')
  }
})