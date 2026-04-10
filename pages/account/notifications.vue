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
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                      <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                    </svg>
                    Your Orders
                  </NuxtLink>
                </li>
                
                <li class="nav-item">
                  <NuxtLink class="nav-link active gap-2 justify-between" to="/account/notifications">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                      Notifications
                    </div>
                    <span v-if="unreadCount > 0" class="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{{ unreadCount }}</span>
                  </NuxtLink>
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2" to="/account/setting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-settings">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    </svg>
                    Settings
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <hr class="pt-3 mt-5" />
                </li>
                <li class="nav-item">
                  <button type="button" class="nav-link gap-2" @click="handleLogout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-logout">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
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
                  @click="markAllAsRead" 
                  class="text-sm font-semibold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>
                  Mark all as read
                </button>
              </div>

              <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                
                <div v-if="loading" class="text-center py-20">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p class="text-gray-500 mt-3 text-sm">Loading notifications...</p>
                </div>

                <div v-else-if="error" class="p-10 text-center">
                  <div class="bg-red-50 text-red-500 rounded-lg inline-block px-4 py-3">
                    {{ error }}
                  </div>
                </div>

                <div v-else-if="notifications.length === 0" class="text-center py-20">
                  <div class="bg-green-50 p-6 rounded-full inline-block mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M21 6.5a3 3 0 0 1 -6 0" /><path d="M15 6.5a3 3 0 0 1 6 0" /></svg>
                  </div>
                  <h4 class="text-lg font-bold text-gray-800 mb-1">No Notifications</h4>
                  <p class="text-gray-500 text-sm">You're all caught up! There are no new notifications.</p>
                </div>

                <div v-else class="divide-y divide-gray-100">
                  <div v-for="notif in notifications" :key="notif.id" @click="openNotif(notif)" 
                       :class="[
                         'cursor-pointer p-5 transition-colors hover:bg-gray-50 flex gap-4 items-start',
                         !notif.read_at ? 'bg-green-50/30' : 'bg-white'
                       ]">
                    
                    <div :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1',
                      !notif.read_at ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    ]">
                      <svg v-if="notif.notification_type === 'Order'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
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
                    
                    <div v-if="!notif.read_at" class="w-2.5 h-2.5 bg-green-600 rounded-full shrink-0 mt-3"></div>
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
                    @click="fetchData(pagination.page - 1)"
                    type="button"
                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-100 disabled:opacity-50">
                    Prev
                  </button>
                  
                  <template v-for="(page, index) in visiblePages" :key="index">
                    <span v-if="page === '...'" class="px-1 text-gray-400">...</span>
                    
                    <button 
                      v-else
                      @click="fetchData(page)"
                      :class="[
                        'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center rounded-md border',
                        page === pagination.page ? 'text-white bg-green-600 border-green-600' : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
                      ]">
                      {{ page }}
                    </button>
                  </template>

                  <button
                    :disabled="pagination.page === pagination.total_page"
                    @click="fetchData(pagination.page + 1)"
                    type="button"
                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-100 disabled:opacity-50">
                    Next
                  </button>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="selectedNotif" 
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="selectedNotif = null">
      <div class="bg-white rounded-xl border border-gray-200 w-full max-w-md overflow-hidden">
        
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"/><path d="M9 17v1a3 3 0 0 0 6 0v-1"/></svg>
            </div>
            <h5 class="text-sm font-semibold mb-0">{{ selectedNotif.subject }}</h5>
          </div>
          <button @click="selectedNotif = null" class="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
        </div>

        <div class="p-5">
          <p class="text-xs text-gray-400 mb-3">{{ formatDate(selectedNotif.send_at) }}</p>
          <p class="text-sm text-gray-700 leading-relaxed mb-0">{{ selectedNotif.message }}</p>
        </div>

        <div class="px-5 py-3 border-t border-gray-100 flex justify-end">
          <button @click="selectedNotif = null" 
                  class="text-sm px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
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