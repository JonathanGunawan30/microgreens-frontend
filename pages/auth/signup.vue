<template>
    <section class="my-10">
        <div class="container">
            <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                <div class="w-full md:w-1/3 xl:w-1/3 lg:order-1 order-2">
                    <img src="~/assets/images/svg-graphics/signup-g.svg" alt="Signup Illustration" class="max-w-full h-auto" />
                </div>

                <div class="w-full md:w-1/2 lg:mx-1/6 xl:w-1/3 lg:order-2 order-1 flex flex-col gap-6">
                    
                    <div v-if="showSuccessMessage" class="text-center p-8 bg-white border border-green-200 rounded-xl shadow-sm">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                        <p class="text-gray-600 mb-6">
                            We've sent a verification link to <strong>{{ registeredEmail }}</strong>.<br>
                            Please verify your account to continue.
                        </p>
                        <NuxtLink to="/auth/signin" class="btn bg-green-600 text-white hover:bg-green-700 px-6 py-2.5 rounded-lg transition-colors font-medium">
                            Go to Sign In
                        </NuxtLink>
                    </div>

                    <div v-else>
                        <div class="flex flex-col gap-1 mb-6">
                            <h1 class="text-2xl font-bold text-gray-900">Get Started Shopping</h1>
                            <p class="text-gray-600">Welcome to FreshCart! Enter your details to get started.</p>
                        </div>
                        
                        <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
                            
                            <div v-if="authStore.error || localError" class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
                                <span class="font-bold">Error!</span> {{ localError || authStore.error }}
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <div class="flex flex-col gap-4 w-full">
                                    
                                    <div class="flex flex-col md:flex-row gap-4">
                                        <div class="w-full md:w-1/2">
                                            <label for="formSignupfname" class="invisible hidden">Name</label>
                                            <input v-model="form.name" type="text"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                                                id="formSignupfname" placeholder="Full Name" required />
                                        </div>
                                        <div class="w-full md:w-1/2">
                                            <label for="formSignupEmail" class="invisible hidden">Email address</label>
                                            <input v-model="form.email" type="email"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                                                id="formSignupEmail" placeholder="Email Address" required />
                                        </div>
                                    </div>
                                    
                                    <div class="w-full">
                                        <label for="formSignupPassword" class="invisible hidden">Password</label>
                                        <div class="relative">
                                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10"
                                                id="formSignupPassword" placeholder="Password" required />
                                            <span @click="togglePassword" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700">
                                                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="w-full">
                                        <label for="formSignupPasswordConfirm" class="invisible hidden">Password Confirmation</label>
                                        <div class="relative">
                                            <input v-model="form.password_confirmation" :type="showPasswordConfirm ? 'text' : 'password'"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10"
                                                id="formSignupPasswordConfirm" placeholder="Confirm Password" required />
                                            <span @click="togglePasswordConfirm" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700">
                                                <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="w-full mt-2">
                                    <button :disabled="authStore.loading" type="submit"
                                        class="w-full btn inline-flex items-center justify-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 hover:bg-green-700 transition py-2.5 rounded-lg font-semibold">
                                        <span v-if="authStore.loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                        <span v-else>Register Account</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-4 text-center">
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
import { ref, reactive } from 'vue' 
import { useAuthStore } from '~/stores/auth'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  layout: 'auth',
})

const authStore = useAuthStore()
const swal = useSwal()

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const showSuccessMessage = ref(false)
const localError = ref('') 
const registeredEmail = ref('')

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const showDemoAlert = () => {
    swal.toastSuccess('This is a demo project. No actual policy applies.')
}

const handleSubmit = async () => {
  localError.value = ''
  authStore.error = null

  if (!form.name || !form.email || !form.password || !form.password_confirmation) {
      localError.value = "Please fill in all required fields."
      return
  }

  if (form.password.length < 6) {
      localError.value = "Password must be at least 6 characters long."
      return
  }

  if (form.password !== form.password_confirmation) {
      localError.value = "Passwords do not match."
      return
  }

  try {
    const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
    }
    
    await authStore.signup(userData)
    
    registeredEmail.value = form.email
    
    showSuccessMessage.value = true

    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

  } catch (error) {
    console.error('SignUp error:', error)
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}
</script>