<template>
  <div class="container">
    <div class="grid grid-cols-1 mb-8">
      <div class="md:flex justify-between items-center">
        <div>
          <h2 class="text-xl">Add New Category</h2>
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="/dashboard/categories">
                  Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 5l-10 14" />
                  </svg>
                </a>
              </li>
              <li class="inline-block text-green-600">
                <a href="../dashboard/categories.html">
                  Categories
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 5l-10 14" />
                  </svg>
                </a>
              </li>

              <li class="inline-block text-gray-500 active" aria-current="page">Add New Category</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1">
      <div class="card card-lg border-0">
        <div class="card-body flex flex-col gap-8 p-7">
          <div class="flex flex-col md:flex-row items-center mb-4 file-input-wrapper gap-2">
            <div>
              <img class="image h-16 w-16 rounded-lg" v-if="imageUrl" :src="imageUrl" alt="Image" />
            </div>

            <div
              class="file-upload btn inline-flex items-center gap-x-2 bg-gray-200 text-gray-800 border-gray-200 border disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 md:ml-4">
              <input @change="handleFileUpload" id="icon" type="file" class="file-input opacity-0" accept="image/*"/>
              Upload Photo
            </div>

            <span class="ms-2">JPG, GIF or PNG. 1MB Max.</span>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="mb-0 text-md">Category Information</h3>
            <form @submit.prevent="handleSubmit" class="grid grid-cols-12 gap-6 needs-validation" novalidate>
              <div class="lg:col-span-6 col-span-12">
                <div>
                  <label for="creatCustomerName"
                    class="inline-block text-gray-800 font-medium mb-2">
                    Category Name
                    <span class="text-red-600">*</span>
                  </label>
                  <input type="text"
                    v-model="form.name"
                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                    id="creatCustomerName" placeholder="Customer Name" required />
                  <div class="invalid-feedback">Please enter category name</div>
                </div>
              </div>
              <div class="lg:col-span-12 col-span-12">
                <div>
                  <label for="creatCustomerPhone" class="inline-block text-gray-800 font-medium mb-2">Description</label>
                  <textarea v-model="form.description" name="description" class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" id=""></textarea>
                </div>
              </div>

              <div class="mb-3 col-lg-12">
                <label class="form-label" for="creatCustomerDate">Status</label>
                <div class="flex space-x-6">
                  <label class="inline-flex items-center">
                    <input v-model="form.status" type="radio" class="form-radio focus:outline-none text-green-600" name="status" :value="true">
                    <span class="ml-2">Active</span>
                  </label>
                    
                  <label class="inline-flex items-center">
                    <input v-model="form.status" type="radio" class="form-radio focus:outline-none text-green-600" name="status" :value="false">
                    <span class="ml-2">Disabled</span>
                  </label>
                </div>
              </div>

              <div class="col-span-12 mt-3">
                <div class="flex flex-col md:flex-row gap-2">
                  <button
                    :disabled="useCategory.loading"
                    class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
                    type="submit">
                    <span v-if="useCategory.loading">Loading...</span>
                    <span v-else>Create New Category</span>
                  </button>
                  <a href="/dashboard/categories"
                    class="btn inline-flex items-center gap-x-2 bg-gray-200 text-gray-800 border-gray-200 border disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    type="submit">
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
import { useCategoryStore } from '~/stores/category'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const router = useRouter()
const file = ref(null)
const imageUrl = ref('')
const useCategory = useCategoryStore()
const swal = useSwal()

const form = reactive({
  name: '',
  description: '',
  status: true,
  icon: '',
  parent_id: '',
})

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    if (selectedFile.size > 1024 * 1024) {
      swal.error('Upload Failed', 'Maximum file size is 1MB')
      return
    }
    
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(selectedFile.type)) {
      swal.error('Invalid Format', 'File must be a JPG, PNG, or GIF.')
      return
    }

    file.value = selectedFile
    
    if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl.value)
    }
    imageUrl.value = URL.createObjectURL(selectedFile)
  }
}

const handleSubmit = async () => {
  try {
    if (!file.value) {
      swal.error('Validation Error', 'Please select an image for the category icon.')
      return
    }

    swal.loading('Processing...', 'Uploading image and saving data...')

    const uploadRes = await useCategory.uploadImage(file.value)
    
    if (!uploadRes.success) {
      swal.close()
      swal.error('Upload Error', uploadRes.message || 'Failed to upload image.')
      return 
    }
    
    const finalImageUrl = useCategory.imageUrl

    const category = {
      name: form.name,
      description: form.description,
      status: form.status,
      icon: finalImageUrl,
      parent_id: form.parent_id === '' ? null : form.parent_id
    }

    const res = await useCategory.createCategory(category)

    swal.close()

    if (res.success){
      swal.success('Success!', 'New category has been created.')
      
      if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl.value)
      }
      
      router.push('/dashboard/categories')
    } else {
      swal.error("Error!", res.message || 'Failed to create category.')
    }

  } catch (error) {
    swal.close()
    console.error('Submit Error:', error)
    swal.error('Error!', 'Something went wrong.')
  }
}
</script>