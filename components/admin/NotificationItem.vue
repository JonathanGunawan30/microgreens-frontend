<template>
    <div
:class="[
      'px-5 py-4 hover:bg-gray-100 border-b border-gray-300',
      { 'bg-gray-100 active': notification.status !== 'Read' } 
    ]">
      <NuxtLink :to="notification.link || '#'" class="text-gray-500">
        <div class="flex">
          <div class="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
             <Icon name="tabler:bell" size="20" />
          </div>
          
          <div class="ms-4">
            <p class="mb-1">
              <span class="text-gray-900 block font-semibold">{{ notification.subject }}</span>
              {{ notification.message }}
            </p>
            <span class="flex items-center">
              <Icon name="tabler:clock" size="12" class="text-gray-500" />
              <small class="ms-2">{{ notification.send_at }}</small>
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
</template>
  
<script setup>
  defineProps({
    notification: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        avatar: '',
        title: '',
        message: '',
        time: '',
        isRead: false,
        link: '#'
      })
    }
  })
</script>