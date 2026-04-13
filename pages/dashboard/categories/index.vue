<template>
  <div class="container">
    <div class="grid grid-cols-1 mb-8">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 class="text-xl">Categories</h2>
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="#!">
                  Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17 5l-10 14" />
                  </svg>
                </a>
              </li>
              <li class="inline-block text-gray-500 active" aria-current="page">Categories</li>
            </ol>
          </nav>
        </div>
        <div>
          <a href="/dashboard/categories/create" class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-100">
            Add Categories
          </a>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1">
      <div class="card h-full card-lg">
        <div class="px-6 py-6">
          <div class="grid grid-cols-12 justify-between items-center gap-3">
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <input
                v-model="searchFilter"
                @input="handleSearchFilter"
                class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 w-full text-base"
                type="search" placeholder="Search Categories" />
            </div>
            <div class="lg:col-span-9 md:col-span-6 col-span-12 flex justify-end">
              <button
                v-if="selectedIds.length > 0"
                @click="handleBulkDelete"
                class="btn inline-flex items-center gap-x-2 bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-4 focus:ring-red-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
                Delete Selected ({{ selectedIds.length }})
              </button>
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
                        @change="toggleSelectAll" />
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">Icon</th>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Total Product</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <template v-if="loading">
                  <tr v-for="n in 6" :key="n" class="border-transparent !border-b-0 animate-pulse">
                    <td class="py-3 px-6"><div class="w-4 h-4 bg-gray-200 rounded"></div></td>
                    <td class="py-3 px-6"><div class="w-12 h-12 bg-gray-200 rounded-lg"></div></td>
                    <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-12"></div></td>
                    <td class="py-3 px-6"><div class="h-6 bg-gray-200 rounded w-20"></div></td>
                    <td class="py-3 px-6"><div class="h-4 bg-gray-200 rounded w-6"></div></td>
                  </tr>
                </template>
                <tr v-else-if="error">
                  <td colspan="6" class="text-center py-4 text-red-500">{{ error }}</td>
                </tr>
                <tr v-else-if="categoryDatas.length === 0">
                  <td colspan="6" class="text-center py-8 text-gray-400">No categories found.</td>
                </tr>
                <tr v-else v-for="item in categoryDatas" :key="item.id" class="border-transparent !border-b-0">
                  <td class="py-3 px-6">
                    <input
                      class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-600 focus:outline-none focus:ring-2"
                      type="checkbox"
                      :value="item.id"
                      v-model="selectedIds" />
                  </td>
                  <td class="py-3 px-6">
                    <img :src="item.icon" alt="" class="h-12 w-12 object-contain rounded" />
                  </td>
                  <td class="py-3 px-6">{{ item.name }}</td>
                  <td class="py-3 px-6">{{ item.total_product }}</td>
                  <td class="py-3 px-6">
                    <span class="inline-block p-1 text-sm align-baseline leading-none rounded border font-semibold"
                      :class="item.status === 'Published'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-red-100 text-red-800 border-red-200'">
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="py-3 px-6">
                    <div class="dropdown dropup-center">
                      <a href="#" class="text-inherit" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        </svg>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a @click.prevent="handleDelete(item.id)" class="dropdown-item" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-1">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
                              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                            Delete
                          </a>
                        </li>
                        <li>
                          <NuxtLink class="dropdown-item" :to="`/dashboard/categories/edit/${item.id}`">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-1">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                              <path d="M16 5l3 3" />
                            </svg>
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
        <div v-if="paginateProds.total_count > 0" class="border-t border-gray-300 flex flex-col md:flex-row justify-between items-center px-6 py-6 gap-3">
          <span>Showing {{ paginateProds.page }} to {{ paginateProds.total_page }} of {{ paginateProds.total_count }} entries</span>
          <nav class="flex items-center gap-x-1">
            <button
              :disabled="paginateProds.page === 1"
              @click="handlePageChange(paginateProds.page - 1)"
              type="button"
              class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
              Previous
            </button>
            <div class="flex items-center gap-x-1">
              <button
                v-for="page in paginateProds.total_page" :key="page"
                @click="handlePageChange(page)"
                type="button"
                :class="[
                  'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border',
                  page === paginateProds.page
                    ? 'text-white border bg-green-600 border-green-600'
                    : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-300'
                ]">
                {{ page }}
              </button>
            </div>
            <button
              :disabled="paginateProds.page === paginateProds.total_page"
              @click="handlePageChange(paginateProds.page + 1)"
              type="button"
              class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
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
import { useCategoryStore } from '~/stores/category'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const useCategory = useCategoryStore()
const swal = useSwal()

const categoryDatas = ref([])
const paginateProds = ref({})
const searchFilter = ref('')
const selectedIds = ref([])
const loading = ref(false)
const error = ref(null)

const isAllSelected = computed(() =>
  categoryDatas.value.length > 0 && selectedIds.value.length === categoryDatas.value.length
)

const toggleSelectAll = (e) => {
  selectedIds.value = e.target.checked ? categoryDatas.value.map(i => i.id) : []
}

const fetchData = async (params = {}) => {
  loading.value = true
  error.value = null
  selectedIds.value = []

  const res = await useCategory.fetchCategoriesAdmin(params)

  if (res.success) {
    categoryDatas.value = useCategory.categories
    paginateProds.value = useCategory.pagination 
  } else {
    error.value = res.message || 'Failed to load categories.'
  }
  
  loading.value = false
}

onMounted(() => fetchData())

let searchTimeout = null
const handleSearchFilter = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchData({ search: searchFilter.value, page: 1 })
  }, 400)
}

const handlePageChange = (page) => {
  fetchData({ search: searchFilter.value, page })
}

const handleDelete = async (id) => {
  const result = await swal.confirm('Delete Category', 'This action cannot be undone.')
  if (!result.isConfirmed) return

  const categoryToDelete = categoryDatas.value.find(c => c.id === id)

  swal.loading('Deleting...', 'Please wait')

  const res = await useCategory.deleteCategory(id)
  
  if (res.success) {
    if (categoryToDelete && categoryToDelete.icon) {
      await useCategory.deleteImage(categoryToDelete.icon)
    }

    swal.close()
    swal.success('Deleted!', 'Category has been deleted.')
    fetchData({ search: searchFilter.value, page: paginateProds.value.page || 1 })
  } else {
    swal.close()
    swal.error('Failed', res.message || 'Failed to delete category.')
  }
}

const handleBulkDelete = async () => {
  const result = await swal.confirm(
    `Delete ${selectedIds.value.length} Categories`,
    'This action cannot be undone.'
  )
  if (!result.isConfirmed) return

  swal.loading('Deleting...', 'Processing bulk delete')

  let hasError = false
  let errorMessage = ''

  for (const id of selectedIds.value) {
    const categoryToDelete = categoryDatas.value.find(c => c.id === id)
    
    const res = await useCategory.deleteCategory(id)
    
    if (!res.success) {
      hasError = true
      errorMessage = res.message
      break
    } else {
      if (categoryToDelete && categoryToDelete.icon) {
        await useCategory.deleteImage(categoryToDelete.icon)
      }
    }
  }

  swal.close()

  if (!hasError) {
    swal.success('Deleted!', `${selectedIds.value.length} categories have been deleted.`)
    fetchData({ search: searchFilter.value, page: 1 })
  } else {
    swal.error('Failed', errorMessage || 'Failed to delete some categories.')
  }
}

useHead({
  script: [
    { src: '/js/theme.min.js', body: true },
  ],
})
</script>