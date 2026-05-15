<template>
  <div class="container">
    <div class="grid grid-cols-1 mb-8">
      <div class="md:flex justify-between items-center">
        <div>
          <h2 class="text-xl">Edit Category</h2>
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="/dashboard/categories">
                  Dashboard
                  <Icon name="tabler:slash" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2" />
                </a>
              </li>
              <li class="inline-block text-green-600">
                <a href="/dashboard/categories">
                  Categories
                  <Icon name="tabler:slash" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2" />
                </a>
              </li>

              <li class="inline-block text-gray-500 active" aria-current="page">Edit Category</li>
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
              <img v-if="imageUrl" class="image h-16 w-16 rounded-lg object-contain bg-gray-100" :src="imageUrl" alt="Image" >
              <div v-else class="image h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                No Img
              </div>
            </div>

            <div
              class="file-upload btn inline-flex items-center gap-x-2 bg-gray-200 text-gray-800 border-gray-200 border disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 md:ml-4">
              <input id="icon" type="file" class="file-input opacity-0" accept="image/*" @change="handleFileUpload">
              Change Photo
            </div>

            <span class="ms-2">JPG, GIF or PNG. 1MB Max.</span>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="mb-0 text-md">Category Information</h3>
            <form class="grid grid-cols-12 gap-6 needs-validation" novalidate @submit.prevent="handleSubmit">
              <div class="lg:col-span-6 col-span-12">
                <div>
                  <label
for="creatCustomerName"
                    class="inline-block text-gray-800 font-medium mb-2">
                    Category Name
                    <span class="text-red-600">*</span>
                  </label>
                  <input
id="creatCustomerName"
                    v-model="form.name"
                    type="text"
                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base" placeholder="Category Name" required >
                  <div class="invalid-feedback">Please enter category name</div>
                </div>
              </div>
              <div class="lg:col-span-12 col-span-12">
                <div>
                  <label for="creatCustomerPhone" class="inline-block text-gray-800 font-medium mb-2">Description</label>
                  <textarea id="" v-model="form.description" name="description" class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"/>
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
                    <span v-else>Update Category</span>
                  </button>
                  <a
href="/dashboard/categories"
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
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, onMounted } from 'vue' 
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const useCategory = useCategoryStore()
const route = useRoute()
const router = useRouter()
const categoryId = route.params.id

const swal = useSwal()

const imageUrl = ref('')
const oldImageUrl = ref('')
const file = ref(null)    

const form = reactive({
  name: '',
  description: '',
  status: true,
  icon: '',
  parent_id: '',
})

onMounted(async () => {
  swal.loading('Loading...', 'Fetching category data...')
  
  const response = await useCategory.fetchCategoryByIDAdmin(categoryId)
  
  swal.close()

  if (response.success) {
    const catData = useCategory.category 

    let isStatusActive = true
    if (catData.status === "Unpublished" || catData.status === "0" || catData.status === 0 || catData.status === false) {
      isStatusActive = false
    }

    imageUrl.value = catData.icon || ''
    oldImageUrl.value = catData.icon || ''
    
    form.name = catData.name || ''
    form.description = catData.description || ''
    form.status = isStatusActive
    form.parent_id = catData.parent_id || null

  } else {
    swal.error('Error', response.message || 'Failed to fetch category data')
  }
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
    swal.loading('Processing...', 'Updating category...')

    let finalImageUrl = oldImageUrl.value

    if (file.value) {
      const uploadRes = await useCategory.uploadImage(file.value)
      
      if (!uploadRes.success) {
        swal.close()
        swal.error('Upload Error', uploadRes.message || 'Failed to upload new image.')
        return 
      }
      
      finalImageUrl = useCategory.imageUrl
    }

    const category = {
      name: form.name,
      description: form.description,
      status: form.status,
      icon: finalImageUrl,
      parent_id: form.parent_id === '' ? null : form.parent_id
    }

    const res = await useCategory.editCategory(category, categoryId)

    if (res.success) {
      if (file.value && oldImageUrl.value && oldImageUrl.value !== finalImageUrl) {
        await useCategory.deleteImage(oldImageUrl.value)
      }

      swal.close()
      swal.success('Success!', 'Category has been updated successfully.')
      
      if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl.value)
      }
      
      router.push('/dashboard/categories')
    } else {
      swal.close()
      swal.error('Error!', res.message || 'Failed to update category')
    }
  } catch (error) {
    swal.close()
    console.error('Submit Error:', error)
    swal.error('Error!', 'Something went wrong.')
  }
}
</script>