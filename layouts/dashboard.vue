<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '~/components/admin/Navbar.vue';
import AdminSidebarNav from '~/components/admin/SidebarNav.vue';
import { useAuthStore } from '~/stores/auth'
import { useNotificationWs } from '~/composables/useNotificationWs';

const authStore = useAuthStore()
authStore.checkAuth()

const { connectWs, disconnectWs } = useNotificationWs()

const isSidebarOpen = ref(false)

onMounted(() => {
  let userObj = authStore.user;
  if (typeof userObj === 'string') {
    try { userObj = JSON.parse(userObj); } catch (e) { console.error('Error parsing user', e); }
  }

  const userId = userObj?.id || userObj?.user_id || useCookie('user_id').value;
  console.log('Attempting WS connection with user ID:', userId);

  if (userId) {
    connectWs(userId);
  } else {
    console.warn('Cannot connect to WS: user ID is missing.');
  }
})

onUnmounted(() => {
  disconnectWs();
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const route = useRoute()
watch(() => route.path, () => {
  isSidebarOpen.value = false
})
</script>

<template>
  <div>
    <div class="main-wrapper" :class="{ 'toggled': isSidebarOpen }">
      <AdminSidebarNav :is-open="isSidebarOpen" @close-sidebar="toggleSidebar" />
      <main class="main-content-wrapper">
        <Navbar @toggle-sidebar="toggleSidebar" />
        <div class="p-6">
          <slot />
        </div>
        <UNotifications />
      </main>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1200px) and (max-width: 1279.98px) {
  .main-content-wrapper {
    margin-left: 0 !important;
    padding-left: 0 !important;
  }
}
</style>