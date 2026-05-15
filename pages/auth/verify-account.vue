<template>
    <section class="my-10 flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-center">
            
            <div v-if="status === 'loading'" class="flex flex-col items-center">
                <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-100 border-t-green-600 mb-6"/>
                <h2 class="text-xl font-bold text-gray-900 mb-2">Verifying your account...</h2>
                <p class="text-gray-500 text-sm">Please wait a moment while we process your verification link.</p>
            </div>

            <div v-else-if="status === 'success'" class="flex flex-col items-center">
                <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Icon name="tabler:check" size="40" />
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Account Verified!</h2>
                <p class="text-gray-600 mb-6">Your email has been successfully verified. You are now securely logged in.</p>
                
                <div class="flex items-center gap-2 text-sm font-semibold text-green-600 bg-green-50 px-4 py-2 rounded-full">
                    <Icon name="tabler:loader-2" size="4" class="animate-spin h-4 w-4" />
                    Redirecting to homepage...
                </div>
            </div>

            <div v-else-if="status === 'error'" class="flex flex-col items-center">
                <div class="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                    <Icon name="tabler:x" size="40" />
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
                <p class="text-gray-600 mb-6">{{ errorMessage }}</p>
                
                <NuxtLink to="/auth/signin" class="w-full btn bg-gray-900 text-white hover:bg-gray-800 py-3 rounded-lg font-semibold transition">
                    Go to Sign In
                </NuxtLink>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: 'auth',
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const status = ref('loading')
const errorMessage = ref('')

onMounted(async () => {
    const token = route.query.token

    if (!token) {
        status.value = 'error'
        errorMessage.value = 'Verification token is missing. Please check your email link.'
        return
    }

    try {
        await authStore.verifyAccount(token)
        
        status.value = 'success'
        setTimeout(() => {
            router.push('/')
        }, 3000)

    } catch (error) {
        status.value = 'error'
        errorMessage.value = error.message || 'Your verification link is invalid or has expired.'
    }
})
</script>