<template>
  <div>
    <nav class="navbar-vertical-nav hidden xl:block">
      <div class="navbar-vertical">
        <div class="px-4 py-5">
          <NuxtLink to="/" class="navbar-brand">
            <img src="/images/logo/freshcart-logo.svg" alt="FreshCart Logo" >
          </NuxtLink>
        </div>
        <div class="navbar-vertical-content flex-grow-1" data-simplebar="">
          <ul id="sideNavbar" class="navbar-nav flex-col">
            <li class="nav-item">
              <NuxtLink 
                class="nav-link" 
                :class="{ 'active': $route.path === '/dashboard' }"
                to="/dashboard"
              >
                <div class="flex items-center">
                  <span class="nav-link-icon">
                    <IconHome />
                  </span>
                  <span class="nav-link-text">Dashboard</span>
                </div>
              </NuxtLink>
            </li>
  
            <li class="nav-item mt-6 mb-3">
              <span class="nav-label">Store Managements</span>
            </li>
  
            <li v-for="(item, index) in storeManagementItems" :key="index" class="nav-item">
              <NuxtLink 
                class="nav-link" 
                :class="{ 'active': $route.path === item.path }"
                :to="item.path"
              >
                <div class="flex items-center">
                  <span class="nav-link-icon">
                    <component :is="item.icon" />
                  </span>
                  <span class="nav-link-text">{{ item.label }}</span>
                </div>
              </NuxtLink>
            </li>
  
            <li class="nav-item mt-6 mb-3">
              <span class="nav-label">Site Settings</span>
            </li>
  
            <li v-for="(item, index) in settingsItems" :key="index" class="nav-item">
              <NuxtLink 
                class="nav-link" 
                :class="{ 'active': $route.path === item.path }"
                :to="item.path"
              >
                <div class="flex items-center">
                  <span class="nav-link-icon">
                    <Icon v-if="typeof item.icon === 'string'" :name="item.icon" size="18" />
                    <component :is="item.icon" v-else />
                  </span>
                  <span class="nav-link-text">{{ item.label }}</span>
                </div>
              </NuxtLink>
            </li>
            <li  class="nav-item">
              <button type="button" class="nav-link gap-2" @click="handleLogout">
                  <Icon name="tabler:logout" size="18" />
                  Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-[1040] xl:hidden" @click="$emit('close-sidebar')"/>
    </Transition>
    
    <Transition name="slide">
      <nav v-if="isOpen" class="navbar-vertical-nav show xl:hidden !fixed !top-0 !left-0 !h-full !z-[1050] !w-[250px] !bg-white">
        <div class="navbar-vertical">
          <div class="px-4 py-5 flex justify-between items-center">
            <NuxtLink to="/" class="navbar-brand">
              <img src="/images/logo/freshcart-logo.svg" alt="FreshCart Logo" >
            </NuxtLink>
            <button class="xl:hidden text-gray-500" @click="$emit('close-sidebar')">
              <Icon name="tabler:x" size="24" />
            </button>
          </div>
          <div class="navbar-vertical-content flex-grow-1">
            <ul class="navbar-nav flex-col">
              <li class="nav-item">
                <NuxtLink class="nav-link" :class="{ 'active': $route.path === '/dashboard' }" to="/dashboard">
                  <div class="flex items-center">
                    <span class="nav-link-icon"><IconHome /></span>
                    <span class="nav-link-text">Dashboard</span>
                  </div>
                </NuxtLink>
              </li>
              <li class="nav-item mt-6 mb-3">
                <span class="nav-label">Store Managements</span>
              </li>
              <li v-for="(item, index) in storeManagementItems" :key="index" class="nav-item">
                <NuxtLink class="nav-link" :class="{ 'active': $route.path === item.path }" :to="item.path">
                  <div class="flex items-center">
                    <span class="nav-link-icon"><component :is="item.icon" /></span>
                    <span class="nav-link-text">{{ item.label }}</span>
                  </div>
                </NuxtLink>
              </li>
              <li class="nav-item mt-6 mb-3">
                <span class="nav-label">Site Settings</span>
              </li>
              <li v-for="(item, index) in settingsItems" :key="index" class="nav-item">
                <NuxtLink class="nav-link" :class="{ 'active': $route.path === item.path }" :to="item.path">
                  <div class="flex items-center">
                    <span class="nav-link-icon">
                      <Icon v-if="typeof item.icon === 'string'" :name="item.icon" size="18" />
                      <component :is="item.icon" v-else />
                    </span>
                    <span class="nav-link-text">{{ item.label }}</span>
                  </div>
                </NuxtLink>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link gap-2" @click="handleLogout">
                  <Icon name="tabler:logout" size="18" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Transition>
  </div>
</template>
  
<script setup>
import IconHome from './IconHome.vue';
import IconStore from './IconStore.vue';
import IconList from './IconList.vue';
import IconShoppingBag from './IconShoppingBag.vue';
import IconUsers from './IconUsers.vue';
import IconUserCog from './IconUserCog.vue';
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

defineEmits(['close-sidebar'])

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
    try {
        authStore.logout()
        router.push('/auth/signin')
    } catch (error) {
        console.error('Error during logout:', error)
    }
}

const storeManagementItems = [
{
    label: 'Products',
    path: '/dashboard/products',
    icon: IconStore
},
{
    label: 'Categories',
    path: '/dashboard/categories',
    icon: IconList
},
{
    label: 'Orders',
    path: '/dashboard/orders',
    icon: IconShoppingBag
},
{
    label: 'Customers',
    path: '/dashboard/customers',
    icon: IconUsers
}
]

const settingsItems = [
{
    label: 'Profile',
    path: '/dashboard/profile',
    icon: 'tabler:user-circle'
},
{
    label: 'Notifications',
    path: '/dashboard/notifications',
    icon: 'tabler:bell'
},
{
    label: 'Role',
    path: '/dashboard/role',
    icon: IconUserCog
}
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
