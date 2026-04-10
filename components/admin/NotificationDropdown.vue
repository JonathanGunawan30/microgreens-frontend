<template>
    <div ref="dropdownRef" class="dropdown-center relative">
      <button 
        class="relative btn text-gray-600 hover:bg-gray-100 hover:text-green-600 h-12 w-12 p-0 rounded-full" 
        @click.stop="toggleDropdown"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-bell"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
        <span v-if="unreadCount > 0" class="absolute -top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform bg-red-600 rounded-full">
          {{ unreadCount }}
        </span>
      </button>
  
      <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 block" 
      style="width: 350px; z-index: 9999; top: 100%;"
    >
      <div class="border-b p-4 flex justify-between items-center bg-white rounded-t-lg">
        <h5 class="mb-0 text-base font-bold text-gray-800">Notifications</h5>
        <button @click="markAllAsRead" class="text-green-600 hover:text-green-700">
           <Icon name="tabler:checks" size="20" />
        </button>
      </div>
      
      <div class="notification-list max-h-[350px] overflow-y-auto bg-white">
        <div v-if="notifications.length === 0" class="p-10 text-center text-gray-400">
           No notifications yet
        </div>
        
        <div class="list-none p-0 m-0">
          <NotificationItem 
            v-for="notification in notifications" 
            :key="notification.id"
            :notification="notification"
          />
        </div>
      </div>
      
      <div class="border-t p-3 text-center bg-gray-50 rounded-b-lg">
        <NuxtLink :to="viewAllLink" class="text-sm font-semibold text-green-600">View All</NuxtLink>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import NotificationItem from './NotificationItem.vue'
import { useNotificationStore } from '~/stores/notification'

const props = defineProps({
  viewAllLink: {
    type: String,
    default: '/account/notifications'
  }
})

const notifStore = useNotificationStore()

const isOpen = ref(false)
const dropdownRef = ref(null)

const notifications = computed(() => notifStore.notifications)
const unreadCount = computed(() => notifStore.unreadCount)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const markAllAsRead = () => {
  notifStore.markAllAsRead()
}

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})
</script>