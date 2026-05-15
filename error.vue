<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white px-4">
    <div class="w-64 h-64">
      <ClientOnly>
        <DotLottieVue
          src="/animations/404.json"
          autoplay
          loop
          style="width: 100%; height: 100%;"
        />
      </ClientOnly>
    </div>
    
    <h1 class="text-6xl font-bold text-gray-900 mt-4">404</h1>
    <p class="text-xl text-gray-500 mt-2 text-center">Oops! Page not found</p>
    <p class="text-gray-400 mt-1 text-center text-sm">
      The page you're looking for doesn't exist or has been moved.
    </p>
    
    <a 
      href="/" 
      class="mt-8 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
    >
      <Icon name="tabler:arrow-left" size="16" />
      Back to Home
    </a>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

defineProps(['error'])
</script>