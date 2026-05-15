<template>
    <section class="my-10">
        <div class="container">
            <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                <div class="w-full md:w-1/3 xl:w-1/3 lg:order-1 order-2">
                    <img src="/images/svg-graphics/signup-g.svg" alt="Signup Illustration" class="max-w-full h-auto" >
                </div>

                <div class="w-full md:w-1/2 lg:mx-1/6 xl:w-1/3 lg:order-2 order-1 flex flex-col gap-6">
                    
                    <div v-if="showSuccessMessage" class="text-center p-8 bg-white border border-green-200 rounded-xl shadow-sm">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                            <Icon name="tabler:mail" size="32" />
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
                        
                        <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
                            
                            <div v-if="authStore.error || localError" class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
                                <span class="font-bold">Error!</span> {{ localError || authStore.error }}
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <div class="flex flex-col gap-4 w-full">
                                    
                                    <div class="flex flex-col md:flex-row gap-4">
                                        <div class="w-full md:w-1/2">
                                            <label for="formSignupfname" class="invisible hidden">Name</label>
                                            <input
id="formSignupfname" v-model="form.name"
                                                type="text"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" placeholder="Full Name" required >
                                        </div>
                                        <div class="w-full md:w-1/2">
                                            <label for="formSignupEmail" class="invisible hidden">Email address</label>
                                            <input
id="formSignupEmail" v-model="form.email"
                                                type="email"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" placeholder="Email Address" required >
                                        </div>
                                    </div>
                                    
                                    <div class="w-full">
                                        <label for="formSignupPassword" class="invisible hidden">Password</label>
                                        <div class="relative">
                                            <input
id="formSignupPassword" v-model="form.password"
                                                :type="showPassword ? 'text' : 'password'"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10" placeholder="Password" required >
                                            <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700" @click="togglePassword">
                                                <Icon :name="showPassword ? 'tabler:eye' : 'tabler:eye-off'" size="20" />
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="w-full">
                                        <label for="formSignupPasswordConfirm" class="invisible hidden">Password Confirmation</label>
                                        <div class="relative">
                                            <input
id="formSignupPasswordConfirm" v-model="form.password_confirmation"
                                                :type="showPasswordConfirm ? 'text' : 'password'"
                                                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base pr-10" placeholder="Confirm Password" required >
                                            <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700" @click="togglePasswordConfirm">
                                                <Icon :name="showPasswordConfirm ? 'tabler:eye' : 'tabler:eye-off'" size="20" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="w-full mt-2">
                                    <button
:disabled="authStore.loading" type="submit"
                                        class="w-full btn inline-flex items-center justify-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 hover:bg-green-700 transition py-2.5 rounded-lg font-semibold">
                                        <Icon v-if="authStore.loading" name="tabler:loader-2" size="20" class="animate-spin" />
                                        <span v-else>Register Account</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="mt-4 text-center">
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

