<template>
  <main>
    <section>
      <div class="container">
        <div class="grid grid-cols-12">
          <div class="lg:col-span-2 md:col-span-4 col-span-12 border-r hidden md:block">
            <div class="pt-10 md:pr-10">
              <ul class="nav flex-col nav-pills nav-pills-dark">
                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2" to="/account">
                    <Icon name="tabler:shopping-bag" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag" />
                    Your Orders
                  </NuxtLink>
                </li>
                
                <li class="nav-item">
                  <NuxtLink class="nav-link active gap-2 justify-between" to="/account/notifications">
                    <div class="flex items-center gap-2">
                      <Icon name="tabler:bell" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-bell" />
                      Notifications
                    </div>
                    <span v-if="unreadCount > 0" class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{{ unreadCount }}</span>
                  </NuxtLink>
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2" to="/account/setting">
                    <Icon name="tabler:settings" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-settings" />
                    Settings
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <hr class="pt-3 mt-5" >
                </li>
                <li class="nav-item">
                  <button type="button" class="nav-link gap-2" @click="handleLogout">
                    <Icon name="tabler:logout" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-logout" />
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="lg:col-span-10 md:col-span-8 col-span-12">
            <div class="py-6 md:p-6 lg:p-10">
              
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 class="mb-0 text-xl font-bold">Your Notifications</h2>
                
                <button 
                  v-if="unreadCount > 0"
                  class="text-sm font-semibold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2" 
                  @click="markAllAsRead"
                >
                  <Icon name="tabler:checks" size="16" />
                  Mark all as read
                </button>
              </div>

              <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                
                <div v-if="loading" class="text-center py-20">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"/>
                  <p class="text-gray-500 mt-3 text-sm">Loading notifications...</p>
                </div>

                <div v-else-if="error" class="p-10 text-center">
                  <div class="bg-red-50 text-red-500 rounded-lg inline-block px-4 py-3">
                    {{ error }}
                  </div>
                </div>

                <div v-else-if="notifications.length === 0" class="text-center py-20">
                  <div class="bg-green-50 p-6 rounded-full inline-block mb-4">
                    <Icon name="tabler:bell" size="48" class="text-green-600" />
                  </div>
                  <h4 class="text-lg font-bold text-gray-800 mb-1">No Notifications</h4>
                  <p class="text-gray-500 text-sm">You're all caught up! There are no new notifications.</p>
                </div>

                <div v-else class="divide-y divide-gray-100">
                  <div
v-for="notif in notifications" :key="notif.id" :class="[
                         'cursor-pointer p-5 transition-colors hover:bg-gray-50 flex gap-4 items-start',
                         !notif.read_at ? 'bg-green-50/30' : 'bg-white'
                       ]" 
                       @click="openNotif(notif)">
                    
                    <div
:class="[
                      'w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1',
                      !notif.read_at ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    ]">
                      <Icon name="tabler:shopping-cart" size="20" v-if="notif.notification_type === 'Order'" />
                      <Icon name="tabler:bell" size="20" />
                    </div>

                    <div class="flex-grow">
                      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                        <h5 :class="['text-base mb-0', !notif.read_at ? 'font-bold text-gray-900' : 'font-semibold text-gray-700']">
                          {{ notif.subject }}
                        </h5>
                        <span class="text-xs text-gray-500 whitespace-nowrap">{{ formatDate(notif.send_at) }}</span>
                      </div>
                      <p :class="['text-sm mb-0', !notif.read_at ? 'text-gray-700 font-medium' : 'text-gray-500']">
                        {{ notif.message }}
                      </p>
                    </div>
                    
                    <div v-if="!notif.read_at" class="w-2.5 h-2.5 bg-green-600 rounded-full shrink-0 mt-3"/>
                  </div>
                </div>
              </div>

              <div v-if="pagination.total_page > 1 && !loading" class="mt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                <span class="text-sm text-gray-600">
                  Showing page {{ pagination.page }} of {{ pagination.total_page }}
                </span>
                <nav class="flex items-center gap-x-1">
                  <button 
                    :disabled="pagination.page === 1"
                    type="button"
                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                    @click="fetchData(pagination.page - 1)">
                    Prev
                  </button>
                  
                  <template v-for="(page, index) in visiblePages" :key="index">
                    <span v-if="page === '...'" class="px-1 text-gray-400">...</span>
                    
                    <button 
                      v-else
                      :class="[
                        'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center rounded-md border',
                        page === pagination.page ? 'text-white bg-green-600 border-green-600' : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
                      ]"
                      @click="fetchData(page)">
                      {{ page }}
                    </button>
                  </template>

                  <button
                    :disabled="pagination.page === pagination.total_page"
                    type="button"
                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-100 disabled:opacity-50"
                    @click="fetchData(pagination.page + 1)">
                    Next
                  </button>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <div
v-if="selectedNotif" 
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="selectedNotif = null">
      <div class="bg-white rounded-xl border border-gray-200 w-full max-w-md overflow-hidden">
        
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <Icon name="tabler:bell" size="14" stroke="#16a34a" />
            </div>
            <h5 class="text-sm font-semibold mb-0">{{ selectedNotif.subject }}</h5>
          </div>
          <button class="text-gray-400 hover:text-gray-600 text-lg leading-none" @click="selectedNotif = null">✕</button>
        </div>

        <div class="p-5">
          <p class="text-xs text-gray-400 mb-3">{{ formatDate(selectedNotif.send_at) }}</p>
          <p class="text-sm text-gray-700 leading-relaxed mb-0">{{ selectedNotif.message }}</p>
        </div>

        <div class="px-5 py-3 border-t border-gray-100 flex justify-end">
          <button
class="text-sm px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50" 
                  @click="selectedNotif = null">
            Close
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
  middleware: ['auth'],
  requiresAuth: true,
})

const router = useRouter()
const authStore = useAuthStore()
const config = useRuntimeConfig()
const notifStore = useNotificationStore()

const selectedNotif = ref(null)
const notifications = ref([])
const loading = ref(true)
const error = ref(null)
const pagination = ref({ page: 1, total_page: 0 })

const unreadCount = computed(() => notifStore.unreadCount)

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })
}

const handleLogout = () => {
  authStore.logout()
  router.push('/auth/signin')
}

const openNotif = async (notif) => {
  selectedNotif.value = notif

  if (!notif.read_at) {
    try {
      const token = authStore.token || useCookie('token').value
      await $fetch(`${config.public.apiNotificationBaseUrl}/auth/notifications/${notif.id}/read`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      const target = notifications.value.find(n => n.id === notif.id)
      if (target) {
        target.read_at = new Date().toISOString()
        selectedNotif.value = { ...target }
        notifStore.unreadCount = Math.max(0, notifStore.unreadCount - 1)
      }
    } catch (err) {
      console.error('Failed to mark as read:', err)
    }
  }
}
const fetchData = async (page = 1) => {
  loading.value = true
  error.value = null
  
  try {
    const token = authStore.token || useCookie('token').value
    
    if (!token) {
      error.value = "Authentication token is missing. Please sign in again."
      return
    }

    const response = await $fetch(`${config.public.apiNotificationBaseUrl}/auth/notifications?page=${page}&limit=10`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response && response.data) {
      notifications.value = response.data
      pagination.value = response.pagination || { page: 1, total_page: 0 }
      
      notifStore.unreadCount = notifications.value.filter(n => !n.read_at).length
    }
  } catch (err) {
    console.error("Failed to fetch notifications:", err)
    error.value = err.data?.message || err.message || "Failed to load notifications. Please try again later."
  } finally {
    loading.value = false
  }
}

const markAllAsRead = async () => {
  try {
    const token = authStore.token || useCookie('token').value
    await $fetch(`${config.public.apiNotificationBaseUrl}/auth/notifications/read-all`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    const now = new Date().toISOString()
    notifications.value = notifications.value.map(n => ({
      ...n,
      read_at: n.read_at ?? now
    }))

    notifStore.markAllAsRead()
  } catch (err) {
    console.error('Failed to mark all as read:', err)
  }
}
const visiblePages = computed(() => {
  const total = pagination.value.total_page
  const current = pagination.value.page
  const delta = 1

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  pages.push(1)

  if (left > 2) {
    pages.push('...')
  }

  for (let i = left; i <= right; i++) {
    pages.push(i)
  }

  if (right < total - 1) {
    pages.push('...')
  }

  pages.push(total)

  return pages
})

onMounted(() => {
  fetchData(1)
})
</script>