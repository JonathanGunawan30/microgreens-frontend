<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content p-8 bg-white rounded-lg relative">
        
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800 m-0">Create an Account</h3>
          <button type="button" class="text-gray-400 hover:text-gray-700 transition" @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
  
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            
            <div v-if="authStore.error || localError" class="mb-5 p-3 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 relative" role="alert">
                <button type="button" @click="clearErrors" class="absolute top-2 right-2 p-1 text-red-800 hover:bg-red-200 rounded-md transition-colors">
                    <span class="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div class="flex items-center pr-6">
                    <span class="font-bold mr-2">Error!</span> {{ localError || authStore.error }}
                </div>
            </div>

            <div class="mb-4">
              <label for="fullName" class="mb-1.5 font-medium block text-gray-800 text-sm">Full Name</label>
              <input v-model="form.fullName" type="text"
                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                id="fullName" placeholder="Enter your full name" required />
            </div>
            
            <div class="mb-4">
              <label for="email" class="mb-1.5 font-medium block text-gray-800 text-sm">Email Address</label>
              <input v-model="form.email" type="email"
                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                id="email" placeholder="name@example.com" required />
            </div>
  
            <div class="mb-4">
              <label for="password" class="mb-1.5 font-medium block text-gray-800 text-sm">Password</label>
              <input v-model="form.password" type="password"
                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                id="password" placeholder="Create a password" required />
            </div>
  
            <div class="mb-6">
              <label for="password_confirm" class="mb-1.5 font-medium block text-gray-800 text-sm">Confirm Password</label>
              <input v-model="form.password_confirmation" type="password"
                class="form-control border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2.5 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                id="password_confirm" placeholder="Confirm your password" required />
              
              <span class="block mt-2 text-xs text-gray-500">
                By registering, you agree to our
                <a href="#" @click.prevent="showDemoAlert" class="text-green-600 hover:underline">Terms of Service</a> &
                <a href="#" @click.prevent="showDemoAlert" class="text-green-600 hover:underline">Privacy Policy</a>
              </span>
            </div>
  
            <button :disabled="authStore.loading" type="submit"
              class="w-full btn inline-flex items-center justify-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-green-700 transition py-2.5 rounded-lg font-semibold">
              <span v-if="authStore.loading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span v-else>Register</span>
            </button>
          </form>
        </div>
  
        <div class="mt-6 text-center text-sm text-gray-600 border-t border-gray-100 pt-4">
          Already have an account?
          <a href="#" @click.prevent="goToSignIn" class="text-green-600 font-semibold hover:underline ml-1">Sign In</a>
        </div>

      </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { useSwal } from '~/composables/useSwal'

const emit = defineEmits(['close'])
const router = useRouter()
const authStore = useAuthStore()
const swal = useSwal()

const localError = ref('')

const form = ref({
  fullName: '',
  email: '',
  password: '',
  password_confirmation: '',
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const clearErrors = () => {
    localError.value = ''
    authStore.error = null
}

const showDemoAlert = () => {
    swal.toastSuccess('This is a demo project. No actual policy applies.')
}

const goToSignIn = () => {
    emit('close')
    router.push('/auth/signin')
}

const handleSubmit = async () => {
    clearErrors()

    if (form.value.password.length < 6) {
        localError.value = "Password must be at least 6 characters long."
        return
    }

    if (form.value.password !== form.value.password_confirmation) {
        localError.value = "Passwords do not match."
        return
    }

    try {
        const userData = {
            name: form.value.fullName,
            email: form.value.email,
            password: form.value.password,
            password_confirmation: form.value.password_confirmation
        }
        
        await authStore.signup(userData)

        form.value = { fullName: '', email: '', password: '', password_confirmation: '' }
        
        emit('close')

        setTimeout(() => {
            swal.success('Registration successful! Please check your email to verify your account.')
        }, 300)
        
    } catch (error) {
        console.error('Signup error:', error)
    }
}
</script>
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(2px);
}

.modal-content {
    max-width: 450px;
    width: 90%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>