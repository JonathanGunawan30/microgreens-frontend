<template>
    <div ref="profileRef" class="dropdown relative">
      <button class="flex items-center" @click.stop="toggleDropdown">
        <img v-if="userPhoto" :src="userAvatar" alt="User avatar" class="h-12 w-12 rounded-full object-cover border border-gray-200" >
        <div v-else class="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center border border-gray-200">
           <Icon name="tabler:user" size="24" />
        </div>
      </button>
  
      <div v-if="isOpen" class="dropdown-menu dropdown-menu-end !p-0 absolute right-0 mt-2 block shadow-xl border border-gray-100 bg-white rounded-lg" style="z-index: 1000; min-width: 230px;">
        <div class="leading-snug px-5 py-4 border-b border-gray-100">
          <h5 class="mb-1 text-base font-bold text-gray-800">{{ userName }}</h5>
          <small class="text-gray-500">{{ userEmail }}</small>
        </div>
  
        <ul class="list-none p-2 m-0">
          <li v-for="item in menuItems" :key="item.path">
            <NuxtLink 
              :to="item.path"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
              @click="isOpen = false"
            >
              <Icon :name="item.icon" size="18" />
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
        <div class="border-t border-gray-100 p-2">
          <button 
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left" 
            @click="handleLogout"
          >
            <Icon name="tabler:logout" size="18" />
            Log Out
          </button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isOpen = ref(false)
const profileRef = ref(null)

const userName = computed(() => authStore.user?.name || 'Admin')
const userEmail = computed(() => authStore.user?.email || '')
const userPhoto = computed(() => authStore.user?.photo)
const userAvatar = computed(() => userPhoto.value || '')

const menuItems = [
  { label: 'Admin Profile', path: '/dashboard/profile', icon: 'tabler:user-circle' },
  { label: 'Go to Store', path: '/', icon: 'tabler:external-link' }
]

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = () => {
  authStore.logout()
  isOpen.value = false
  router.push('/auth/signin')
}

onClickOutside(profileRef, () => {
  isOpen.value = false
})
</script>