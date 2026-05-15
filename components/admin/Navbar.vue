<template>
    <nav class="navbar navbar-expand-lg navbar-glass">
      <div class="w-full flex justify-between items-center px-4 xl:px-6">
        <div class="flex items-center">
          <a 
            class="text-inherit block xl:hidden mr-3 cursor-pointer" 
            @click="toggleSidebar"
          >
            <Icon name="tabler:indent-increase" size="32" class="bi bi-text-indent-right" />
          </a>
        </div>
        <div>
          <ul class="list-unstyled flex items-center gap-2 mb-0">
            <NotificationDropdown view-all-link="/dashboard/notifications" />
            <ProfileDropdown />
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
<script setup>
import NotificationDropdown from './NotificationDropdown.vue';
import ProfileDropdown from './ProfileDropdown.vue';

  
const emit = defineEmits(['toggle-sidebar'])
  
const toggleSidebar = () => {
    emit('toggle-sidebar')
}
</script>