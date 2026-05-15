<template>
    <section class="my-10">
        <div class="container">
            <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                <div class="w-full md:w-1/3 xl:w-1/3 lg:order-1 order-2">
                    <img src="/images/svg-graphics/fp-g.svg" alt="Update Password Illustration" class="max-w-full h-auto" >
                </div>

                <div class="w-full md:w-1/2 lg:mx-1/6 xl:w-1/3 lg:order-2 order-1 flex flex-col gap-6">
                    
                    <div v-if="showSuccessMessage" class="text-center p-8 bg-white border border-green-200 rounded-xl shadow-sm">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                            <Icon name="tabler:check" size="32" />
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

                        <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
                            
                            <div v-if="authStore.error || localError" class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 relative" role="alert">
                                <button type="button" class="absolute top-2 right-2 p-1 text-red-800 hover:bg-red-200 rounded-md transition-colors" @click="clearErrors">
                                    <span class="sr-only">Close</span>
                                    <Icon name="tabler:x" size="16" />
                                </button>
                                <div class="flex items-center pr-6">
                                    <span class="font-bold mr-1">Error!</span> {{ localError || authStore.error }}
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <div class="w-full">
                                    <div class="relative">
                                        <label for="formSignupPassword" class="invisible hidden">New Password</label>
                                        <input
id="formSignupPassword" v-model="password_new"
                                            :type="showPassword ? 'text' : 'password'"
                                            class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10" placeholder="New Password" required >
                                        <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700" @click="togglePassword">
                                            <Icon v-if="!showPassword" name="tabler:eye" size="20" />
                                            <Icon v-else name="tabler:eye-off" size="20" />
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="relative">
                                        <label for="formSignupPasswordConfirm" class="invisible hidden">Password Confirmation</label>
                                        <input
id="formSignupPasswordConfirm" v-model="password_confirmation"
                                            :type="showPasswordConfirm ? 'text' : 'password'"
                                            class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10" placeholder="Confirm New Password" required >
                                        <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700" @click="togglePasswordConfirm">
                                            <Icon v-if="!showPasswordConfirm" name="tabler:eye" size="20" />
                                            <Icon v-else name="tabler:eye-off" size="20" />
                                        </span>
                                    </div>
                                </div>
                                
                                <div class="w-full mt-2">
                                    <button
:disabled="authStore.loading" type="submit"
                                        class="w-full btn inline-flex items-center justify-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-700 transition py-2.5 rounded-lg font-semibold">
                                        <Icon v-if="authStore.loading" name="tabler:loader-2" size="20" class="animate-spin" />
                                        <span v-else>Update Password</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-6 text-center">
                                <p class="text-sm text-gray-600">
                                    By continuing, you agree to our
                                    <a href="#" class="text-green-600 hover:underline" @click.prevent="showDemoAlert">Terms of Service</a>
                                    &
                                    <a href="#" class="text-green-600 hover:underline" @click.prevent="showDemoAlert">Privacy Policy</a>
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
