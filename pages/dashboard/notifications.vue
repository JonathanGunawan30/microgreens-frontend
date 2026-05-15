<template>
  <main>
    <div class="py-6 md:p-6 lg:p-10">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 class="mb-1 text-2xl font-bold text-gray-800">Admin Notifications</h2>
          <p class="text-gray-500 text-sm">Manage and view all your administrative alerts.</p>
        </div>
        
        <button 
          v-if="unreadCount > 0"
          class="text-sm font-semibold text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 border border-green-100" 
          @click="markAllAsRead"
        >
          <Icon name="tabler:checks" size="18" />
          Mark all as read
        </button>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        
        <div v-if="loading" class="text-center py-20">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"/>
          <p class="text-gray-500 mt-4 text-sm font-medium">Loading notifications...</p>
        </div>

        <div v-else-if="error" class="p-10 text-center">
          <div class="bg-red-50 text-red-500 rounded-lg inline-block px-6 py-4 border border-red-100">
            <div class="flex items-center gap-2">
              <Icon name="tabler:alert-circle" size="20" />
              <span class="font-medium">{{ error }}</span>
            </div>
          </div>
        </div>

        <div v-else-if="notifications.length === 0" class="text-center py-24 bg-gray-50/30">
          <div class="bg-white p-6 rounded-full inline-block mb-4 shadow-sm border border-gray-100 text-gray-300">
            <Icon name="tabler:bell-off" size="48" />
          </div>
          <h4 class="text-lg font-bold text-gray-800 mb-1">No Notifications Found</h4>
          <p class="text-gray-500 text-sm max-w-xs mx-auto">You don't have any notifications at the moment. We'll alert you when something important happens.</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
v-for="notif in notifications" :key="notif.id" :class="[
                 'cursor-pointer p-6 transition-all hover:bg-gray-50 flex gap-5 items-start relative',
                 !notif.read_at ? 'bg-green-50/20' : 'bg-white'
               ]" 
               @click="openNotif(notif)">
            
            <div
:class="[
              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm border',
              !notif.read_at ? 'bg-green-100 text-green-600 border-green-200' : 'bg-gray-100 text-gray-400 border-gray-200'
            ]">
              <Icon v-if="notif.notification_type === 'Order'" name="tabler:shopping-cart" size="24" />
              <Icon v-else name="tabler:bell" size="24" />
            </div>

            <div class="flex-grow">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1.5 gap-1">
                <h5 :class="['text-base mb-0', !notif.read_at ? 'font-bold text-gray-900' : 'font-semibold text-gray-700']">
                  {{ notif.subject }}
                </h5>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-400 font-medium whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded-full">
                    {{ formatDate(notif.send_at) }}
                  </span>
                </div>
              </div>
              <p :class="['text-sm mb-0 leading-relaxed max-w-3xl', !notif.read_at ? 'text-gray-700 font-medium' : 'text-gray-500']">
                {{ notif.message }}
              </p>
            </div>
            
            <div v-if="!notif.read_at" class="absolute left-0 top-0 bottom-0 w-1 bg-green-600"/>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total_page > 1 && !loading" class="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-sm text-gray-500 font-medium">
          Showing page <span class="text-gray-900">{{ pagination.page }}</span> of <span class="text-gray-900">{{ pagination.total_page }}</span>
        </span>
        <nav class="flex items-center gap-x-1">
          <button 
            :disabled="pagination.page === 1"
            type="button"
            class="leading-none min-h-[38px] min-w-[38px] py-2 px-3 inline-flex justify-center items-center gap-x-1.5 rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium"
            @click="fetchData(pagination.page - 1)">
            <Icon name="tabler:chevron-left" size="18" />
            Prev
          </button>
          
          <template v-for="(page, index) in visiblePages" :key="index">
            <span v-if="page === '...'" class="px-2 text-gray-400 font-bold">...</span>
            
            <button 
              v-else
              :class="[
                'leading-none min-h-[38px] min-w-[38px] py-2 px-3 inline-flex justify-center items-center rounded-lg border font-bold transition-all',
                page === pagination.page ? 'text-white bg-green-600 border-green-600 shadow-sm shadow-green-200 scale-105' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              ]"
              @click="fetchData(page)">
              {{ page }}
            </button>
          </template>

          <button
            :disabled="pagination.page === pagination.total_page"
            type="button"
            class="leading-none min-h-[38px] min-w-[38px] py-2 px-3 inline-flex justify-center items-center gap-x-1.5 rounded-lg border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium"
            @click="fetchData(page + 1)">
            Next
            <Icon name="tabler:chevron-right" size="18" />
          </button>
        </nav>
      </div>

    </div>

    <!-- Notif Modal -->
    <div
v-if="selectedNotif" 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        @click.self="selectedNotif = null">
      <div class="bg-white rounded-2xl border border-gray-200 w-full max-w-md overflow-hidden shadow-2xl transition-all transform animate-in fade-in zoom-in duration-200">
        
        <div class="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center border border-green-200">
              <Icon name="tabler:bell" size="18" class="text-green-600" />
            </div>
            <div>
              <h5 class="text-sm font-bold text-gray-900 mb-0">{{ selectedNotif.subject }}</h5>
              <p class="text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-0">{{ formatDate(selectedNotif.send_at) }}</p>
            </div>
          </div>
          <button class="w-7 h-7 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors" @click="selectedNotif = null">
            <Icon name="tabler:x" size="18" />
          </button>
        </div>

        <div class="p-6">
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p class="text-sm text-gray-700 leading-relaxed mb-0 font-medium">{{ selectedNotif.message }}</p>
          </div>
        </div>

        <div class="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
class="text-xs font-bold px-5 py-2 rounded-lg border border-gray-300 text-gray-600 bg-white hover:bg-gray-100 transition-all" 
                  @click="selectedNotif = null">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notification'

definePageMeta({
  layout: 'dashboard',
  middleware: ['admin'],
})

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
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  })
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
    if (!token) throw new Error("Authentication missing")

    const response = await $fetch(`${config.public.apiNotificationBaseUrl}/auth/notifications?page=${page}&limit=15`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response && response.data) {
      notifications.value = response.data
      pagination.value = response.pagination || { page: 1, total_page: 0 }
    }
  } catch (err) {
    console.error("Failed to fetch notifications:", err)
    error.value = err.data?.message || err.message || "Failed to load notifications."
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
  const delta = 2

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = []
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  pages.push(1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('...')
  if (total > 1) pages.push(total)

  return pages
})

onMounted(() => {
  fetchData(1)
})
</script>