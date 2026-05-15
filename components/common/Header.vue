<template>
  <header>
    <div class="bg-gray-100 py-2 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center text-[10px] md:text-xs text-gray-600 text-center leading-relaxed">
          <span class="flex flex-wrap items-center justify-center gap-x-1">
            <span class="whitespace-nowrap"><strong class="font-semibold text-gray-800">Disclaimer:</strong> This website is a personal demo project. No actual products are sold.</span>
            <span class="hidden md:inline">|</span>
            <span class="flex items-center gap-1 whitespace-nowrap">
               For testing, use 
               <a href="https://simulator.sandbox.midtrans.com/" target="_blank" class="text-green-600 hover:text-green-700 font-medium underline flex items-center gap-0.5" title="Open Midtrans Sandbox Simulator">
                 Midtrans Simulator
                 <Icon name="tabler:external-link" size="12" />
               </a>
               <Icon name="tabler:info-circle" size="14" class="text-blue-500 cursor-help" title="Use the simulator for Virtual Account or E-wallet test payments" />
            </span>
          </span>
        </div>
      </div>
    </div>
    
    <div class="border-b">
      <div class="pt-5">
        <div class="container">
          <div class="flex flex-wrap w-full items-center justify-between">
            <div class="lg:w-1/6 md:w-1/2 w-2/5">
              <NuxtLink to="/" class="navbar-brand">
                <img src="/images/logo/freshcart-logo.svg" alt="TailwindCSS eCommerce HTML Template" >
              </NuxtLink>
            </div>

            <div class="lg:w-2/5 hidden lg:block">
              <form @submit.prevent="handleSearch">
                <div class="relative">
                  <label for="searchProducts" class="invisible hidden">Search</label>
                  <input
                    id="searchProducts"
                    v-model="searchQuery"
                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                    type="search"
                    placeholder="Search for products (Press Enter to search or clear)"
                  >
                  <button class="absolute right-0 top-0 p-3 text-gray-500 hover:text-green-600" type="submit">
                    <Icon name="tabler:search" size="16" />
                  </button>
                </div>
              </form>
            </div>

            <div class="lg:w-1/5 text-end md:w-1/2 w-3/5">
              <div class="flex gap-7 items-center justify-end">
                <div v-if="!authStore.isAuthenticated">
                  <button class="text-gray-600" @click="showLoginModal = true">
                    <Icon name="tabler:user" size="22" />
                  </button>
                </div>

                <div v-if="authStore.isAuthenticated">
                  <NotificationDropdown/>
                </div>

                <div>
                  <button
                    type="button"
                    class="text-gray-600 relative"
                    @click="showCart = true"
                  >
                    <Icon name="tabler:shopping-bag" size="24" />
                    <span
v-if="cartCount > 0"
                      class="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-3 bg-green-600 text-white text-center font-semibold text-sm"
                    >
                      {{ cartCount }}
                      <span class="invisible">unread messages</span>
                    </span>
                  </button>
                </div>

                <div class="lg:hidden leading-none">
                  <button
                    class="collapsed"
                    type="button"
                    aria-label="Toggle navigation"
                    @click="showMobileMenu = true"
                  >
                    <Icon name="tabler:menu-2" size="32" class="text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        class="navbar relative navbar-expand-lg lg:flex lg:flex-wrap items-center content-between text-black navbar-default"
        aria-label="Main navigation"
      >
        <div class="container max-w-7xl mx-auto w-full xl:px-4 lg:px-0">
          <div class="hidden lg:flex lg:items-center">
            <div class="dropdown relative">
              <button
                class="mr-4 btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                @click="toggleCategoryMenu"
              >
                <Icon name="tabler:layout-grid" size="16" />
                All Categories
              </button>
              <ul v-if="showCategoryMenu" class="dropdown-menu absolute z-[1000] mt-1 min-w-[200px] bg-white shadow-lg rounded-md py-2 border border-gray-100">
                <li v-for="category in categories" :key="category.slug">
                  <NuxtLink :to="`/shop?category=${category.slug}`" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600" @click="showCategoryMenu = false">
                    {{ category.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <ul class="navbar-nav lg:flex gap-3 lg:items-center">
              <li class="nav-item w-full lg:w-auto">
                <NuxtLink to="/" class="nav-link">Home</NuxtLink>
              </li>
              <li class="nav-item w-full lg:w-auto">
                <NuxtLink to="/shop" class="nav-link">Shop</NuxtLink>
              </li>
              <li class="nav-item w-full lg:w-auto">
                <NuxtLink v-if="authStore.isAuthenticated" to="/account" class="nav-link">Account</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <Transition name="fade">
      <div v-if="showMobileMenu" class="fixed inset-0 bg-black/50 z-[1040] lg:hidden" @click="showMobileMenu = false"/>
    </Transition>
    
    <Transition name="slide">
      <nav v-if="showMobileMenu" class="fixed top-0 left-0 h-full w-[280px] bg-white z-[1050] shadow-xl lg:hidden flex flex-col">
        <div class="p-5 border-b flex justify-between items-center bg-gray-50">
          <NuxtLink to="/" @click="showMobileMenu = false">
            <img src="/images/logo/freshcart-logo.svg" alt="Logo" class="h-8" >
          </NuxtLink>
          <button class="text-gray-500" @click="showMobileMenu = false">
            <Icon name="tabler:x" size="24" />
          </button>
        </div>
        
        <div class="flex-grow overflow-y-auto p-4">
          <div class="mb-6">
            <h6 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Main Menu</h6>
            <ul class="nav flex-col gap-1">
              <li class="nav-item">
                <NuxtLink class="nav-link flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700" :class="{ 'bg-green-50 text-green-600 font-bold': $route.path === '/' }" to="/" @click="showMobileMenu = false">
                  <Icon name="tabler:home" size="20" />
                  Home
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700" :class="{ 'bg-green-50 text-green-600 font-bold': $route.path === '/shop' }" to="/shop" @click="showMobileMenu = false">
                  <Icon name="tabler:shopping-cart" size="20" />
                  Shop
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="mb-6">
            <div class="flex justify-between items-center mb-3 px-3">
              <h6 class="text-xs font-bold text-gray-400 uppercase tracking-wider m-0">All Categories</h6>
              <button class="text-gray-400" @click="showMobileCategories = !showMobileCategories">
                <Icon :name="showMobileCategories ? 'tabler:chevron-up' : 'tabler:chevron-down'" size="16" />
              </button>
            </div>
            <ul v-if="showMobileCategories" class="nav flex-col gap-1">
              <li v-for="category in categories" :key="category.slug" class="nav-item">
                <NuxtLink :to="`/shop?category=${category.slug}`" class="nav-link block py-2 px-3 text-sm text-gray-600 hover:text-green-600" @click="showMobileMenu = false">
                  {{ category.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div v-if="authStore.isAuthenticated">
            <h6 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Account Settings</h6>
            <ul class="nav flex-col gap-1">
              <li class="nav-item">
                <NuxtLink class="nav-link flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700" :class="{ 'bg-green-50 text-green-600 font-bold': $route.path === '/account' }" to="/account" @click="showMobileMenu = false">
                  <Icon name="tabler:shopping-bag" size="20" />
                  Your Orders
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700" :class="{ 'bg-green-50 text-green-600 font-bold': $route.path === '/account/notifications' }" to="/account/notifications" @click="showMobileMenu = false">
                  <Icon name="tabler:bell" size="20" />
                  Notifications
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700" :class="{ 'bg-green-50 text-green-600 font-bold': $route.path === '/account/setting' }" to="/account/setting" @click="showMobileMenu = false">
                  <Icon name="tabler:settings" size="20" />
                  Settings
                </NuxtLink>
              </li>
              <li class="my-4 border-t border-gray-100"/>
              <li class="nav-item">
                <button class="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors" @click="handleLogout">
                  <Icon name="tabler:logout" size="20" />
                  Log out
                </button>
              </li>
            </ul>
          </div>
          <div v-else class="px-3 mt-4">
             <button class="btn w-full bg-green-600 text-white" @click="showMobileMenu = false; showLoginModal = true">
                Sign In
             </button>
          </div>
        </div>
      </nav>
    </Transition>
  </header>

  <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />

  <CartSidebar v-if="showCart" @close="showCart = false" />

  </template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CartSidebar from '../modals/CartSidebar.vue'
import LoginModal from '../modals/LoginModal.vue'
import { useAuthStore } from '~/stores/auth'
import { useCategoryStore } from '~/stores/category'
import { useCartStore } from '~/stores/cart'
import { useRouter, useRoute } from 'vue-router'
import NotificationDropdown from '../admin/NotificationDropdown.vue'

const cartStore = useCartStore()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()

const router = useRouter()
const route = useRoute()

const searchQuery = ref(route.query.search || '') 
const showLoginModal = ref(false)
const showCart = ref(false)
const showMobileMenu = ref(false)
const showCategoryMenu = ref(false)
const showMobileCategories = ref(true)
const categories = computed(() => {
  return categoryStore.categories || []
})

onMounted(async () => {
  await categoryStore.fetchCategoriesShop()
})

watch(() => route.query.search, (newSearch) => {
  searchQuery.value = newSearch || ''
})

const cartCount = computed(() => {
  return cartStore.totalItems
})

const handleSearch = () => {
  const currentQuery = { ...route.query }

  if (searchQuery.value.trim() === '') {
    delete currentQuery.search
  } else {
    currentQuery.search = searchQuery.value.trim()
  }

  currentQuery.page = 1

  router.push({
    path: '/shop',
    query: currentQuery
  })
}

const toggleCategoryMenu = () => {
  showCategoryMenu.value = !showCategoryMenu.value
}

const handleLogout = () => {
  authStore.logout()
  showMobileMenu.value = false
  router.push('/auth/signin')
}
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

.nav-link {
  transition: all 0.2s;
}
</style>