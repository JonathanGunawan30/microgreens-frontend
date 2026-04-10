<template>
    <section class="my-10">
        <div class="container">
            <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                <div class="w-full md:w-1/3 xl:w-1/3 lg:order-1 order-2">
                    <img src="~/assets/images/svg-graphics/fp-g.svg" alt="" class="max-w-full h-auto" />
                </div>

                <div class="w-full md:w-1/2 lg:mx-1/6 xl:w-1/3 lg:order-2 order-1 flex flex-col gap-6">
                    
                    <div v-if="showSuccessMessage" class="text-center p-8 bg-white border border-green-200 rounded-xl shadow-sm">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5" /><path d="M12 11v-8h4l2 2l-2 2h-4" /><path d="M6 15h1" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                        <p class="text-gray-600 mb-6">
                            If an account exists for <strong>{{ email }}</strong>, you will get an email with a link to reset your password.
                        </p>
                        <NuxtLink to="/auth/signin" class="btn bg-gray-900 text-white hover:bg-gray-800 px-6 py-2.5 rounded-lg transition-colors font-medium">
                            Return to Sign In
                        </NuxtLink>
                    </div>

                    <div v-else>
                        <div class="flex flex-col gap-1 mb-6">
                            <h1 class="text-xl font-bold text-gray-900">Forgot your password?</h1>
                            <p class="text-gray-600">Please enter the email address associated with your account and we will email you a link to reset your password.</p>
                        </div>

                        <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
                            
                            <div v-if="authStore.error" class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 relative border border-red-200" role="alert">
                                <button type="button" @click="authStore.error = null" class="absolute top-2 right-2 p-1 text-red-800 hover:bg-red-200 rounded-md transition-colors">
                                    <span class="sr-only">Close</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div class="flex items-center pr-6">
                                    <span class="font-bold mr-1">Error!</span> {{ authStore.error }}
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <div class="w-full">
                                    <label for="formSigninEmail" class="invisible hidden">Email address</label>
                                    <input v-model="email" type="email"
                                        class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                                        id="formSigninEmail" placeholder="Enter your email" required />
                                </div>
                                <div class="flex flex-wrap gap-3 flex-col w-full mt-2">
                                    <div class="w-full grid">
                                        <button :disabled="authStore.loading || !email" type="submit"
                                            class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                                            <span v-if="authStore.loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                            <span v-else>Reset Password</span>
                                        </button>
                                    </div>
                                    <div class="w-full grid">
                                        <NuxtLink to="/auth/signin"
                                            class="btn inline-flex items-center justify-center gap-x-2 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 transition py-2.5 rounded-lg font-semibold">
                                            Back to Sign In
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth',
})

const authStore = useAuthStore()

const email = ref('')
const showSuccessMessage = ref(false)

const handleSubmit = async () => {
    authStore.error = null
    
    if (!email.value) return;

    try {
        await authStore.forgotPassword(email.value)
        showSuccessMessage.value = true
    } catch (error) {
        console.error('Forgot password error:', error)
    }
}
</script>