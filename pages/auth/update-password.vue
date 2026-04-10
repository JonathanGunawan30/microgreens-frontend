<template>
    <section class="my-10">
        <div class="container">
            <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                <div class="w-full md:w-1/3 xl:w-1/3 lg:order-1 order-2">
                    <img src="~/assets/images/svg-graphics/fp-g.svg" alt="Update Password Illustration" class="max-w-full h-auto" />
                </div>

                <div class="w-full md:w-1/2 lg:mx-1/6 xl:w-1/3 lg:order-2 order-1 flex flex-col gap-6">
                    
                    <div v-if="showSuccessMessage" class="text-center p-8 bg-white border border-green-200 rounded-xl shadow-sm">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Password Updated!</h2>
                        <p class="text-gray-600 mb-6">
                            Your password has been successfully changed.<br>
                            You can now log in with your new password.
                        </p>
                        <NuxtLink to="/auth/signin" class="btn bg-green-600 text-white hover:bg-green-700 px-6 py-2.5 rounded-lg transition-colors font-medium">
                            Go to Sign In
                        </NuxtLink>
                    </div>

                    <div v-else>
                        <div class="flex flex-col gap-1 mb-6">
                            <h1 class="text-xl font-bold text-gray-900">Update Your Password</h1>
                            <p class="text-gray-600">Please enter your new password below to secure your account.</p>
                        </div>

                        <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
                            
                            <div v-if="authStore.error || localError" class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 relative" role="alert">
                                <button type="button" @click="clearErrors" class="absolute top-2 right-2 p-1 text-red-800 hover:bg-red-200 rounded-md transition-colors">
                                    <span class="sr-only">Close</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div class="flex items-center pr-6">
                                    <span class="font-bold mr-1">Error!</span> {{ localError || authStore.error }}
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <div class="w-full">
                                    <div class="relative">
                                        <label for="formSignupPassword" class="invisible hidden">New Password</label>
                                        <input v-model="password_new" :type="showPassword ? 'text' : 'password'"
                                            class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10"
                                            id="formSignupPassword" placeholder="New Password" required />
                                        <span @click="togglePassword" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700">
                                            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="relative">
                                        <label for="formSignupPasswordConfirm" class="invisible hidden">Password Confirmation</label>
                                        <input v-model="password_confirmation" :type="showPasswordConfirm ? 'text' : 'password'"
                                            class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10"
                                            id="formSignupPasswordConfirm" placeholder="Confirm New Password" required />
                                        <span @click="togglePasswordConfirm" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700">
                                            <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="w-full mt-2">
                                    <button :disabled="authStore.loading" type="submit"
                                        class="w-full btn inline-flex items-center justify-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-700 transition py-2.5 rounded-lg font-semibold">
                                        <span v-if="authStore.loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                        <span v-else>Update Password</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-6 text-center">
                                <p class="text-sm text-gray-600">
                                    By continuing, you agree to our
                                    <a href="#" @click.prevent="showDemoAlert" class="text-green-600 hover:underline">Terms of Service</a>
                                    &
                                    <a href="#" @click.prevent="showDemoAlert" class="text-green-600 hover:underline">Privacy Policy</a>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  layout: 'auth',
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const swal = useSwal()

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const showSuccessMessage = ref(false)
const localError = ref('')

const password_new = ref('')
const password_confirmation = ref('')

const token = route.query.token
onMounted(() => {
    if (!token) {
        swal.toastError('Invalid or missing reset token.')
        router.push('/auth/signin')
    }
})

const showDemoAlert = () => {
    swal.toastSuccess('This is a demo project. No actual policy applies.')
}

const clearErrors = () => {
    localError.value = ''
    authStore.error = null
}

const handleSubmit = async () => {
    clearErrors()

    const currentToken = route.query.token

    if (!currentToken){
        localError.value = "Invalid or missing reset token."
        return
    }

    if (password_new.value.length < 6) {
        localError.value = "New password must be at least 6 characters long."
        return
    }

    if (password_new.value !== password_confirmation.value) {
        localError.value = "Password confirmation does not match."
        return
    }

    try {
        await authStore.updatePasswordNoAuth(password_new.value, password_confirmation.value, currentToken)
        
        showSuccessMessage.value = true
        swal.success('Password Updated!', 'Your password has been successfully changed. You can now log in with your new password.')

        password_new.value = ''
        password_confirmation.value = ''

    } catch (error) {
        console.error('Update password error:', error)
        swal.error('Failed', error.message || 'Failed to update password.')
    }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}
</script>