<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import Footer from '~/components/common/Footer.vue';
import Header from '~/components/common/Header.vue';
import { useAuthStore } from '~/stores/auth'
import { useNotificationStore } from '~/stores/notification'
import { useNotificationWs } from '~/composables/useNotificationWs';

const authStore = useAuthStore()
authStore.checkAuth()

const { connectWs, disconnectWs } = useNotificationWs()

onMounted(() => {
  let userObj = authStore.user;
  if (typeof userObj === 'string') {
    try { userObj = JSON.parse(userObj); } catch (e) { console.error('Error parsing user', e); }
  }
  
  const userId = userObj?.id || userObj?.user_id || useCookie('user_id').value;
  console.log('Attempting WS connection from Default layout with user ID:', userId);
  
  if (userId) {
    connectWs(userId);

    const notifStore = useNotificationStore()
    notifStore.fetchNotifications()
  }
})

onUnmounted(() => {
  disconnectWs();
})
</script>