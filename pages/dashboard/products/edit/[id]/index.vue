<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-1 mb-8">
        <div class="md:flex justify-between items-center">
          <div>
            <h2 class="text-xl">Edit Product</h2>
            <nav aria-label="breadcrumb">
              <ol class="flex flex-wrap">
                <li class="inline-block text-green-600">
                  <a href="/dashboard">
                    Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon inline-block mx-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 5l-10 14" /></svg>
                  </a>
                </li>
                <li class="inline-block text-green-600">
                    <a href="/dashboard/products">
                        Products
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon inline-block mx-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 5l-10 14" /></svg>
                    </a>
                </li>
                <li class="inline-block text-gray-500 active" aria-current="page">Edit Product</li>
              </ol>
            </nav>
          </div>
          <div>
              <NuxtLink to="/dashboard/products" class="btn inline-flex items-center gap-x-2 bg-gray-300 text-black border-gray-300 disabled:opacity-50 hover:text-white hover:bg-gray-700 hover:border-gray-700 focus:ring-4 focus:ring-gray-100">Back to Product</NuxtLink>
          </div>
        </div>
      </div>

      <div class="grid mb-5">
        <div class="card card-lg border-0 row-span-4 col-span-2">
          <div class="card-body flex flex-col gap-8 p-7">
            <div class="flex flex-col gap-4">
              <h3 class="mb-0 text-md font-bold">Product Information</h3>
              <form @submit.prevent="handleSubmit" class="grid grid-cols-12 gap-6">
                <div class="lg:col-span-6 col-span-12">
                  <label class="inline-block text-gray-800 font-medium mb-2">Product Name <span class="text-red-600">*</span></label>
                  <input v-model="form.name" type="text" class="border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full" required />
                </div>
                
                <div class="lg:col-span-6 col-span-12">
                  <label class="inline-block text-gray-800 font-medium mb-2">Product Category <span class="text-red-600">*</span></label>
                  <select v-model="form.category_slug" class="border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full" required>
                      <option value="" disabled>Select category</option>
                      <option v-for="category in categoryDatas" :key="category.slug" :value="category.slug">{{ category.name }}</option>
                  </select>
                </div>
                
                <div class="lg:col-span-6 col-span-12">
                  <label class="inline-block text-gray-800 font-medium mb-2">Unit <span class="text-red-600">*</span></label>
                  <select v-model="form.unit" class="border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full" required>
                    <option value="gram">Gr</option>
                    <option value="kilo">Kg</option>
                    <option value="milliliters">ml</option>
                  </select>
                </div>

                <div class="lg:col-span-6 col-span-12">
                  <label class="inline-block text-gray-800 font-medium mb-2">Product Status <span class="text-red-600">*</span></label>
                  <select v-model="form.status" class="border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full" required>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">In Active</option>
                  </select>
                </div>

                <div class="lg:col-span-12 col-span-12">
                  <label class="inline-block text-gray-800 font-medium mb-2">Product Description <span class="text-red-600">*</span></label>
                  <textarea v-model="form.description" class="border border-gray-300 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full min-h-[100px]" required></textarea>
                </div>

                <div class="col-span-12 mt-3">
                  <div class="flex gap-2">
                    <button type="submit" class="btn bg-green-600 text-white hover:bg-green-700">Update Product</button>
                    <NuxtLink to="/dashboard/products" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</NuxtLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="card h-full card-lg">
        <div class="p-6 flex justify-between items-center">
          <h3 class="text-md font-bold">Variants</h3>
          <button type="button" class="btn bg-cyan-600 text-white hover:bg-cyan-700" data-bs-toggle="modal" data-bs-target="#variantModal">
            Add Variant <Icon name="tabler:plus" size="20" class="ml-1" />
          </button>
        </div>
        <div class="card-body p-0">
          <div class="relative overflow-x-auto">
            <table class="text-left w-full whitespace-nowrap table-hover">
              <thead class="bg-gray-200 text-gray-700">
                <tr>
                  <th class="px-6 py-3">Image</th>
                  <th class="px-6 py-3">Stock</th>
                  <th class="px-6 py-3">Weight</th>
                  <th class="px-6 py-3">Regular Price</th>
                  <th class="px-6 py-3">Sale Price</th>
                  <th class="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="variants.length === 0">
                  <td colspan="6" class="text-center py-6 text-gray-500">No variants available.</td>
                </tr>
                <tr v-for="variant in variants" :key="variant.id" class="border-b">
                  <td class="py-3 px-6"><img :src="variant.image" class="h-12 w-12 object-cover rounded bg-gray-100"></td>
                  <td class="py-3 px-6">{{ variant.stock }}</td>
                  <td class="py-3 px-6">{{ variant.weight }}</td>
                  <td class="py-3 px-6">Rp {{ variant.reguler_price }}</td>
                  <td class="py-3 px-6">Rp {{ variant.sale_price }}</td>
                  <td class="py-3 px-6">
                    <button @click="deleteVariant(variant.id)" class="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="variantModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-6">
          <div class="flex items-center justify-between border-b pb-4 mb-4">
            <h5 class="text-lg font-bold">Add Variant</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form class="grid grid-cols-12 gap-4">
            <div class="col-span-6">
              <label class="block text-gray-800 mb-2">Stock <span class="text-red-600">*</span></label>
              <input v-model="variantForm.stock" type="number" class="border border-gray-300 rounded-lg w-full p-2" />
            </div>
            <div class="col-span-6">
              <label class="block text-gray-800 mb-2">Weight</label>
              <input v-model="variantForm.weight" type="number" class="border border-gray-300 rounded-lg w-full p-2" />
            </div>
            <div class="col-span-6">
              <label class="block text-gray-800 mb-2">Regular Price <span class="text-red-600">*</span></label>
              <input v-model="variantForm.reguler_price" type="number" class="border border-gray-300 rounded-lg w-full p-2" />
            </div>
            <div class="col-span-6">
              <label class="block text-gray-800 mb-2">Sale Price <span class="text-red-600">*</span></label>
              <input v-model="variantForm.sale_price" type="number" class="border border-gray-300 rounded-lg w-full p-2" />
            </div>
            <div class="col-span-12">
              <label class="block text-gray-800 mb-2">Image Product <span class="text-red-600">*</span></label>
              <input type="file" @change="handleFileUpload" class="border border-gray-300 rounded-lg w-full p-2" accept="image/*" />
              <div v-if="variantForm.imageUrl" class="mt-3">
                 <p class="text-sm text-gray-500 mb-1">Preview:</p>
                 <img :src="variantForm.imageUrl" class="h-24 w-24 object-cover border rounded" />
              </div>
            </div>
          </form>
          <div class="flex gap-3 pt-4 border-t mt-6">
            <button @click="addVariant" class="btn bg-green-600 text-white hover:bg-green-700">Add Variant</button>
            <button type="button" class="btn bg-gray-200 text-gray-800 hover:bg-gray-300" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '~/stores/product'
import { useCategoryStore } from '~/stores/category'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const router = useRouter()
const route = useRoute()
const useProduct = useProductStore()
const useCategory = useCategoryStore()
const swal = useSwal()

const categoryDatas = ref([])
const variants = ref([])

const form = reactive({
  name: '',
  category_slug: '',
  unit: 'gram',
  description: '',
  status: 'active',
})

const variantForm = reactive({
  stock: '',
  weight: '',
  reguler_price: '',
  sale_price: '',
  imageFile: null,
  imageUrl: '',
})

onMounted(async () => {
  swal.loading('Loading...', 'Fetching product data...')

  const respCat = await useCategory.fetchCategoriesAdmin({ limit: 100 })
  if (respCat.success) {
    categoryDatas.value = useCategory.categories
  }

  const productId = route.params.id
  const res = await useProduct.fetchProductDetail(productId)
  
  swal.close()

  if (res.success) {
    const prod = res.data.data ? res.data.data : res.data

    form.name = prod.name || prod.product_name || ''
    form.category_slug = prod.category_slug || ''
    form.unit = prod.unit || 'gram'
    form.description = prod.description || prod.product_description || ''
    form.status = prod.status || prod.product_status || 'active'

    if (prod.child && prod.child.length > 0) {
      prod.child.forEach((child) => {
        variants.value.push({
          id: child.id,
          stock: Number(child.stock || 0),
          weight: Number(child.weight || 0),
          reguler_price: Number(child.reguler_price || 0),
          sale_price: Number(child.sale_price || 0),
          image: child.image
        })
      })   
    }
  } else {
    swal.error('Error', res.message || 'Failed to load product data.')
  }
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 1024 * 1024) {
      swal.error('Upload Failed', 'Maximum file size is 1MB.')
      event.target.value = ''
      return
    }
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      swal.error('Invalid Format', 'File must be a JPG, PNG, GIF, or WEBP.')
      event.target.value = ''
      return
    }

    variantForm.imageFile = file
    if (variantForm.imageUrl && variantForm.imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(variantForm.imageUrl)
    }
    variantForm.imageUrl = URL.createObjectURL(file)
  }
}

const addVariant = async () => {
  if (!variantForm.imageFile && !variantForm.imageUrl) {
    swal.error('Validation', 'Please select an image for this variant.')
    return
  }
  if (!variantForm.reguler_price || !variantForm.sale_price || !variantForm.stock) {
    swal.error('Validation', 'Please fill all required fields (Stock, Regular Price, Sale Price).')
    return
  }

  swal.loading('Processing...', 'Uploading variant image...')

  let uploadedUrl = ''

  if (variantForm.imageFile) {
    const uploadRes = await useProduct.uploadImage(variantForm.imageFile)
    if (!uploadRes.success) {
      swal.close()
      swal.error('Upload Error', uploadRes.message || 'Failed to upload image.')
      return
    }
    uploadedUrl = useProduct.imageUrl
  } else {
    uploadedUrl = variantForm.imageUrl
  }

  variants.value.push({
    id: Date.now(),
    stock: Number(variantForm.stock),
    weight: Number(variantForm.weight || 0),
    reguler_price: Number(variantForm.reguler_price),
    sale_price: Number(variantForm.sale_price),
    image: uploadedUrl
  })

  Object.assign(variantForm, {
    stock: '', weight: '', reguler_price: '', sale_price: '', imageFile: null, imageUrl: ''
  })
  
  const closeBtn = document.querySelector('#variantModal .btn-close')
  if (closeBtn) closeBtn.click()

  swal.close()
  swal.success('Added', 'Variant successfully added to list.')
}

const deleteVariant = async (id) => {
  const result = await swal.confirm('Delete Variant', 'Are you sure you want to delete this variant?')
  if (result.isConfirmed) {
    const variantToDelete = variants.value.find(v => v.id === id)
    if (variantToDelete && variantToDelete.image && !variantToDelete.image.startsWith('blob:')) {
      await useProduct.deleteImage(variantToDelete.image)
    }
    variants.value = variants.value.filter(variant => variant.id !== id)
  }
}

const handleSubmit = async () => {
  try {
    if (!form.name || !form.category_slug) {
       swal.error('Validation', 'Please fill the product name and category.')
       return
    }
    if (variants.value.length === 0) {
      swal.error('Validation', 'Please add at least one product variant.')
      return
    }

    swal.loading('Processing...', 'Updating product...')

    const productData = {
      name: form.name,
      category_slug: form.category_slug,
      unit: form.unit,
      description: form.description,
      status: form.status,
      variant: variants.value.length,
      
      variant_detail: variants.value.map(v => ({
        stock: Number(v.stock),
        image: String(v.image),
        weight: Number(v.weight),
        sale_price: Number(v.sale_price),
        reguler_price: Number(v.reguler_price)
      }))
    }

    const productId = route.params.id
    const res = await useProduct.updateProduct(productId, productData)
    
    swal.close()

    if (res.success) {
      swal.success('Success!', 'Product has been updated successfully.')
      router.push('/dashboard/products')
    } else {
      swal.error('Error!', res.message || 'Failed to update product.')
    }
  } catch (error) {
    swal.close()
    console.error('Submit Error:', error)
    swal.error('Error!', 'Something went wrong.')
  }
}

useHead({
  script: [
    { src: '/libs/simplebar/dist/simplebar.min.js', body: true },
    { src: '/js/theme.min.js', body: true },
  ],
})
</script>