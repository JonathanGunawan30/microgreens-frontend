<template>
  <div class="container">
    <div class="grid grid-cols-1 mb-8">
      <!-- page header -->
      <div class="md:flex justify-between items-center">
        <div>
          <h2 class="text-xl">Create Customer</h2>
          <!-- breacrumb -->
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="/dashboard">
                  Dashboard
                  <Icon name="tabler:slash" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2" />
                </a>
              </li>

              <li class="inline-block text-gray-500 active" aria-current="page">Create
                Customer</li>
            </ol>
          </nav>
        </div>
        <!-- button -->
      </div>
    </div>
    <!-- row -->
    <div class="grid grid-cols-1">
      <div class="card card-lg border-0">
        <div class="card-body flex flex-col gap-8 p-7">
          <div v-if="customerStore.error" class="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-50 relative" role="alert">
            <div class="flex items-center pr-8">
                <span class="font-medium mr-2">Failed!</span> {{ customerStore.error }}
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-center mb-4 file-input-wrapper gap-2">
            <div>
              <img v-if="imageUrl" class="image h-16 w-16 rounded-lg" :src="imageUrl" alt="Image" >
            </div>

            <div
              class="file-upload btn inline-flex items-center gap-x-2 bg-gray-200 text-gray-800 border-gray-200 border disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 md:ml-4">
              <input type="file" class="file-input opacity-0" accept="image/*" @change="handleFileUpload">
              Upload Photo
            </div>

            <span class="ms-2">JPG, GIF or PNG. 1MB Max.</span>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="mb-0 text-md">Customer Information</h3>
            <form class="grid grid-cols-12 gap-6 needs-validation" novalidate @submit.prevent="handlerSubmit">
              <div class="lg:col-span-6 col-span-12">
                <div>
                  <!-- input -->
                  <label
for="creatCustomerName"
                    class="inline-block text-gray-800 font-medium mb-2">
                    Name
                    <span class="text-red-600">*</span>
                  </label>
                  <input
id="creatCustomerName"
                    v-model="form.name"
                    type="text"
                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" placeholder="Customer Name" required >
                  <div class="invalid-feedback">Please enter customer name</div>
                </div>
              </div>
              <div class="lg:col-span-6 col-span-12">
                <div>
                  <!-- input -->
                  <label
for="creatCustomerEmail"
                    class="inline-block text-gray-800 font-medium mb-2">
                    Email
                    <span class="text-red-600">*</span>
                  </label>
                  <input
                     id="creatCustomerEmail"
                    v-model="form.email"
                    type="email"
                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" placeholder="Email Address" required >
                  <div class="invalid-feedback">Please enter email</div>
                </div>
              </div>
              <div class="lg:col-span-6 col-span-12">
                <div>
                  <!-- input -->
                  <label
for="creatCustomerPhone"
                    class="inline-block text-gray-800 font-medium mb-2">Phone<span class="text-red-600">*</span></label>
                  <input
                     id="creatCustomerPhone"
                    v-model="form.phone"
                    type="text"
                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" placeholder="Number" required >
                  <div class="invalid-feedback">Please enter phone</div>
                </div>
              </div>

              <div class="lg:col-span-6 col-span-12">
                <label
class="inline-block text-gray-800 font-medium mb-2"
                  for="address">Address<span class="text-red-600">*</span></label>
                <input
                  id="address"
                  v-model="form.address"
                  type="text"
                  class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base flatpickr" required >
                <div class="invalid-feedback">Please enter address</div>
              </div>

              <div class="lg:col-span-6 col-span-12">
                <label
class="inline-block text-gray-800 font-medium mb-2"
                  for="lat">Latitude<span class="text-red-600">*</span></label>
                <input
                  id="lat"
                  v-model="form.lat"
                  type="text"
                  class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base flatpickr" required >
                <div class="invalid-feedback">Please enter latitude</div>
              </div>

              <div class="lg:col-span-6 col-span-12">
                <label
class="inline-block text-gray-800 font-medium mb-2"
                  for="lng">Longitude<span class="text-red-600">*</span></label>
                <input
                  id="lng"
                  v-model="form.lng"
                  type="text"
                  class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base flatpickr" required >
                <div class="invalid-feedback">Please enter longitude</div>
              </div>

              <div class="col-span-12 mt-3">
                <div class="flex flex-col md:flex-row gap-2">
                  <button
                    :disabled="customerStore.loading"
                    class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
                    type="submit">
                    <span v-if="customerStore.loading">Loading...</span>
                    <span v-else>Create New Customer</span>
                  </button>
                  <a
href="/dashboard/customers"
                    class="btn inline-flex items-center gap-x-2 bg-gray-200 text-gray-800 border-gray-200 border disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300">
                    Cancel
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCustomerStore} from '~/stores/customer'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const customerStore = useCustomerStore()
const router = useRouter()
const file = ref(null)
const imageUrl = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  photo: '',
  address: '',
  lat: '',
  lng: '',
  role_id: 2,
})

const handleFileUpload = async (event) => {
  try {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      // Validasi ukuran file (max 1MB)
      if (selectedFile.size > 1024 * 1024) {
        alert('Maximum file size is 1MB')
        return
      }
      
      // Validasi tipe file
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile.type)) {
        alert('File must be JPG, PNG, or GIF')
        return
      }

      // Upload file
      const result = await customerStore.uploadImage(selectedFile)
      
      // Update preview dan simpan URL
      imageUrl.value = result.data.image_url
      file.value = selectedFile
    }
  } catch (error) {
    console.error('Error upload:', error)
    alert(error.message || 'Failed to upload image')
  }
}


const handlerSubmit = async () => {
  try {
    const customerData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      photo: imageUrl.value,
      address: form.address,
      lat: form.lat ? String(form.lat) : '',
      lng: form.lng ? String(form.lng) : '',
      role_id: 2
    }
    await customerStore.createCustomer(customerData)

    form.address = ''
    form.lat = ''
    form.lng = ''
    form.role_id = 0
    form.name = ''
    form.email = ''
    form.phone = ''
    form.photo = ''
    imageUrl.value = ''

    router.push('/dashboard/customers')
  } catch (error) {
    console.error('Error creating customer:', error)
    alert(error.message || 'Failed to create customer')
  }
}


useHead({
  script: [
    {
		src: '/js/theme.min.js',
		body: true
    },
  ],
})
</script>

<style>

</style>