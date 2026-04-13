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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12l14 0"/>
        <path d="M5 12l6 6"/>
        <path d="M5 12l6 -6"/>
      </svg>
      Back to Home
    </a>
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

defineProps(['error'])
</script>