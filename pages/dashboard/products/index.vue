<template>
    <div class="container">
        <div class="grid grid-cols-1 mb-8">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h2 class="text-xl">Products</h2>
                    <nav aria-label="breadcrumb">
                        <ol class="flex flex-wrap">
                            <li class="inline-block text-green-600">
                                <a href="#!">
                                    Dashboard
                                    <Icon name="tabler:slash" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2" />
                                </a>
                            </li>

                            <li class="inline-block text-gray-500 active" aria-current="page">Products</li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <a
href="/dashboard/products/create"
                        class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-100">
                        Add Product
                    </a>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1">
            <div class="card h-full card-lg">
                <div class="px-6 py-6">
                    <div class="grid grid-cols-12 justify-between gap-3">
                        <div class="lg:col-span-3 md:col-span-6 col-span-12">
                            <form class="flex" role="search" @submit.prevent>
                                <input
                                    v-model="searchFilter"
                                    class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                                    type="search"
                                    placeholder="Search Products" aria-label="Search" @input="handleSearchFilter" >
                            </form>
                        </div>
                        
                        <div class="lg:col-span-9 md:col-span-6 col-span-12 flex justify-end gap-3 items-center">
                            
                            <button
                                v-if="selectedIds.length > 0"
                                class="btn inline-flex items-center gap-x-2 bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
                                @click="handleBulkDelete">
                                <Icon name="tabler:trash" size="14" />
                                Delete Selected ({{ selectedIds.length }})
                            </button>

                            <select
                                v-model="status"
                                class="text-base py-2 block w-40 border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600 disabled:opacity-50 disabled:pointer-events-none"
                                @change="handleStatusChange">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="relative overflow-x-auto">
                        <table class="text-left w-full whitespace-nowrap table-with-checkbox table-hover">
                            <thead class="bg-gray-200 text-gray-700">
                                <tr class="border-transparent !border-b-0">
                                    <th scope="col" class="px-6 py-3">
                                        <div class="flex items-center">
                                            <input
                                                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-600 focus:outline-none focus:ring-2"
                                                type="checkbox"
                                                :checked="isAllSelected"
                                                @change="toggleSelectAll" >
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">Image</th>
                                    <th scope="col" class="px-6 py-3">Product Name</th>
                                    <th scope="col" class="px-6 py-3">Category</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                    <th scope="col" class="px-6 py-3">Price</th>
                                    <th scope="col" class="px-6 py-3">Create at</th>
                                    <th scope="col" class="px-6 py-3"/>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                
                                <template v-if="loading">
                                    <tr v-for="n in 6" :key="n" class="border-transparent !border-b-0 animate-pulse">
                                        <td class="py-3 px-6"><div class="w-4 h-4 bg-gray-200 rounded"/></td>
                                        <td class="py-3 px-6"><div class="w-12 h-12 bg-gray-200 rounded-lg"/></td>
                                        <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-32"/></td>
                                        <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-20"/></td>
                                        <td class="py-3 px-6"><div class="h-6 bg-gray-200 rounded w-16"/></td>
                                        <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-24"/></td>
                                        <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-24"/></td>
                                        <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-6"/></td>
                                    </tr>
                                </template>

                                <tr v-else-if="error">
                                    <td colspan="8" class="text-center py-4 text-red-500">{{ error }}</td>
                                </tr>

                                <tr v-else-if="productDatas.length === 0">
                                    <td colspan="8" class="text-center py-8 text-gray-400">No data available</td>
                                </tr>

                                <tr v-for="item in productDatas" v-else :key="item.id" class="border-transparent !border-b-0">
                                    <td class="py-3 px-6 text-center">
                                        <div class="flex items-center">
                                            <input
                                                v-model="selectedIds"
                                                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-600 focus:outline-none focus:ring-2"
                                                type="checkbox"
                                                :value="item.id" >
                                        </div>
                                    </td>
                                    <td class="py-3 px-6 text-left">
                                        <NuxtLink :to="`/dashboard/products/${item.id}`">
                                            <img :src="item.image" alt="" class="h-12 w-12 object-contain rounded bg-gray-100" >
                                        </NuxtLink>
                                    </td>
                                    <td class="py-3 px-6 text-left">
                                        <NuxtLink :to="`/dashboard/products/${item.id}`" class="text-inherit hover:text-green-600">
                                            {{ item.name }}
                                        </NuxtLink>
                                    </td>
                                    <td class="py-3 px-6 text-left">{{ item.category_name }}</td>

                                    <td class="py-3 px-6 text-left">
                                        <span
class="inline-block p-1 text-sm align-baseline leading-none rounded border font-semibold capitalize"
                                            :class="item.status === 'active' 
                                                ? 'bg-green-100 text-green-800 border-green-200' 
                                                : 'bg-red-100 text-red-800 border-red-200'">
                                            {{ item.status }}
                                        </span>
                                    </td>
                                    <td class="py-3 px-6 text-left">Rp. {{ item.sale_price }}</td>
                                    <td class="py-3 px-6 text-left">{{ formatDate(item.created_at) }}</td>
                                    <td class="py-3 px-6 text-left">
                                        <div class="dropdown dropup-center">
                                            <a
href="#" class="text-inherit" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <Icon name="tabler:dots-vertical" size="20" class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical" />
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        href="#" @click.prevent="handleDelete(item.id)">
                                                        <Icon name="tabler:trash" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-trash inline-block mr-1" />
                                                        Delete
                                                    </a>
                                                </li>
                                                <li>
                                                    <NuxtLink :to="`/dashboard/products/edit/${item.id}`" class="dropdown-item">
                                                        <Icon name="tabler:edit" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-edit inline-block mr-1" />
                                                        Edit
                                                    </NuxtLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div v-if="paginateProds?.total_count > 0" class="border-t border-gray-300 flex flex-col md:flex-row justify-between items-center px-6 py-6 gap-3">
                    <span>Showing {{ paginateProds.page }} to {{ paginateProds.total_page }} of {{ paginateProds.total_count }} entries</span>
                    <nav class="flex items-center gap-x-1">
                        <button
:disabled="paginateProds.page === 1"
                            type="button"
                            class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                            @click="handlePageChange(paginateProds.page - 1)">
                            Previous
                        </button>
                        <div class="flex items-center gap-x-1">
                            <button
v-for="page in paginateProds.total_page" :key="page"
                                type="button"
                                :class="[
                                    'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border',
                                    page === paginateProds.page 
                                        ? 'text-white border bg-green-600 border-green-600 hover:bg-green-600 focus:outline-none focus:bg-green-600'
                                        : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300'
                                ]"
                                aria-current="page"
                                @click="handlePageChange(page)">
                                {{ page }}
                            </button>
                        </div>
                        <button
                            :disabled="paginateProds.page === paginateProds.total_page"
                            type="button"
                            class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                            @click="handlePageChange(paginateProds.page + 1)">
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '~/stores/product'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const useProduct = useProductStore()
const swal = useSwal()

const productDatas = ref([])
const paginateProds = ref({})
const searchFilter = ref('')
const status = ref('')
const selectedIds = ref([])
const loading = ref(false)
const error = ref(null)

const isAllSelected = computed(() =>
  productDatas.value.length > 0 && selectedIds.value.length === productDatas.value.length
)

const toggleSelectAll = (e) => {
  selectedIds.value = e.target.checked ? productDatas.value.map(i => i.id) : []
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const fetchData = async (params = {}) => {
  loading.value = true
  error.value = null
  selectedIds.value = [] 

  const res = await useProduct.fetchProductsAdmin({ ...params, isParent: "true" })

  if (res.success) {
    productDatas.value = useProduct.products
    paginateProds.value = useProduct.pagination
  } else {
    error.value = res.message || 'Failed to load products.'
  }
  
  loading.value = false
}

onMounted(() => fetchData())

let searchTimeout = null
const handleSearchFilter = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchData({ search: searchFilter.value, status: status.value, page: 1 })
  }, 400)
}

const handleStatusChange = () => {
  fetchData({ search: searchFilter.value, status: status.value, page: 1 })
}

const handlePageChange = (page) => {
  fetchData({ search: searchFilter.value, status: status.value, page })
}

const handleDelete = async (id) => {
  const result = await swal.confirm('Delete Product', 'Are you sure you want to delete this product and all its variants?')
  if (!result.isConfirmed) return

  swal.loading('Deleting...', 'Please wait')

  const detailRes = await useProduct.fetchProductDetail(id)
  const imagesToDelete = new Set()

  if (detailRes.success) {
    const prod = detailRes.data.data ? detailRes.data.data : detailRes.data
    
    if (prod.image) imagesToDelete.add(prod.image)
    
    if (prod.child && prod.child.length > 0) {
      prod.child.forEach(c => {
        if (c.image) imagesToDelete.add(c.image)
      })
    }
  }

  const res = await useProduct.deleteProductAdmin(id)
  
  if (res.success) {
    for (const imgUrl of imagesToDelete) {
      await useProduct.deleteImage(imgUrl)
    }

    swal.close()
    swal.success('Deleted!', 'Product, variants, and images have been deleted.')
    fetchData({ search: searchFilter.value, status: status.value, page: paginateProds.value.page || 1 })
  } else {
    swal.close()
    swal.error('Failed', res.message || 'Failed to delete product.')
  }
}

const handleBulkDelete = async () => {
  const result = await swal.confirm(
    `Delete ${selectedIds.value.length} Products`,
    'Are you sure you want to delete selected products and all their variants?'
  )
  if (!result.isConfirmed) return

  swal.loading('Deleting...', 'Processing bulk delete. This may take a while.')

  let hasError = false
  let errorMessage = ''

  for (const id of selectedIds.value) {
    const detailRes = await useProduct.fetchProductDetail(id)
    const imagesToDelete = new Set()

    if (detailRes.success) {
      const prod = detailRes.data.data ? detailRes.data.data : detailRes.data
      if (prod.image) imagesToDelete.add(prod.image)
      if (prod.child && prod.child.length > 0) {
        prod.child.forEach(c => {
          if (c.image) imagesToDelete.add(c.image)
        })
      }
    }
    
    const res = await useProduct.deleteProductAdmin(id)
    
    if (!res.success) {
      hasError = true
      errorMessage = res.message
      break
    } else {
      for (const imgUrl of imagesToDelete) {
        await useProduct.deleteImage(imgUrl)
      }
    }
  }

  swal.close()

  if (!hasError) {
    swal.success('Deleted!', `${selectedIds.value.length} products and their variants have been deleted.`)
    fetchData({ search: searchFilter.value, status: status.value, page: 1 })
  } else {
    swal.error('Failed', errorMessage || 'Failed to delete some products.')
  }
}

useHead({
  script: [
    { src: '/js/theme.min.js', body: true },
  ],
})
</script>