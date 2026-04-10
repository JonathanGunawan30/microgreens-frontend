<template>
  <section class="container">
    <div class="grid grid-cols-1 mb-8">
      <div class="md:flex justify-between items-center">
        <div>
          <h2 class="text-xl">Order List</h2>
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="/dashboard">
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

              <li class="inline-block text-gray-500 active" aria-current="page">Order List
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1">
      <div class="card h-full card-lg">
        <div class="px-6 py-6">
          <div class="grid grid-cols-12 justify-between gap-2">
            <div class="lg:col-span-3 md:col-span-6 col-span-12">
              <form class="flex" role="search">
                <input
                  v-model="searchFilter"
                  @input="handleSearchFilter"
                  class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
                  type="search" placeholder="Search" aria-label="Search" />
              </form>
            </div>
            <div class="md:col-start-11 md:col-end-13 md:col-span-4 col-span-12">
              <select
                v-model="statusFilter"
                @change="handleStatusFilter"
                class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
>
                <option value="" disabled>Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Process">Process</option>
                <option value="Sending">Sending</option>
                <option value="Candelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="relative overflow-x-auto">
            <table class="text-left w-full whitespace-nowrap table-with-checkbox table-hover">
              <thead class="bg-gray-200 text-gray-700">
                <tr class="border-transparent !border-b-0">
                  <th scope="col" class="px-6 py-3">Image</th>
                  <th scope="col" class="px-6 py-3">Order Name</th>
                  <th scope="col" class="px-6 py-3">Customer</th>
                  <th scope="col" class="px-6 py-3">Date & TIme</th>
                  <th scope="col" class="px-6 py-3">Payment</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                  <th scope="col" class="px-6 py-3">Amount</th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="useOrder.loading">
                    <td colspan="8" class="text-center py-4">Loading...</td>
                </tr>
                <tr v-else-if="useOrder.error">
                    <td colspan="8" class="text-center py-4 text-red-500">{{ useOrder.error }}</td>
                </tr>
                <tr v-else-if="!orderDatas || orderDatas.length === 0">
                    <td colspan="8" class="text-center py-4">No data available</td>
                </tr>
                <tr v-else v-for="(item, index) in orderDatas" :key="index">
                  <td class="py-3 px-6 text-left">
                    <a :href="`/dashboard/orders/show/${item.id}`">
                      <img :src="item.product_image" alt="" class="h-10 w-10" />
                    </a>
                  </td>
                  <td class="py-3 px-6 text-left"><a :href="`/dashboard/orders/show/${item.id}`"
                      class="text-inherit">{{ item.order_code }}</a></td>
                  <td class="py-3 px-6 text-left">{{ item.customer_name }}</td>

                  <td class="py-3 px-6 text-left">{{ formatDate(item.order_date, item.order_time) }}</td>
                  <td class="py-3 px-6 text-left">{{ (item.payment_method || '').toUpperCase() === 'MIDTRANS' ? 'Transfer' : 'COD' }}</td>

                  <td class="py-3 px-6 text-left">
                    <span
                      class="inline-block p-1 text-sm align-baseline leading-none rounded font-semibold"
                      :class="[
                          item.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : item.status === 'Confirmed'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : item.status === 'Sending'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : item.status === 'Done'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : item.status === 'Cancel'
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        ]"
                      >
                      {{ item.status }}</span>
                  </td>
                  <td class="py-3 px-6 text-left">Rp {{ formatPrice(item.total_amount)}}</td>

                  <td class="py-3 px-6 text-left">
                    <div class="dropdown dropup-center">
                      <a href="#" class="text-inherit" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20"
                          height="20" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round"
                          class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        </svg>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14"
                              height="14" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"
                              class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                              <path stroke="none" d="M0 0h24v24H0z"
                                fill="none" />
                              <path d="M4 7l16 0" />
                              <path d="M10 11l0 6" />
                              <path d="M14 11l0 6" />
                              <path
                                d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path
                                d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                            Delete
                          </a>
                        </li>
                        <li>
                          <a :href="`/dashboard/orders/show/${item.id}`" class="dropdown-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14"
                              height="14" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"
                              class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                              <path stroke="none" d="M0 0h24v24H0z"
                                fill="none" />
                              <path
                                d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                              <path
                                d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                              <path d="M16 5l3 3" />
                            </svg>
                            Edit
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="useOrder.pagination?.total_count > 0" class="border-t border-gray-300 flex flex-col md:flex-row justify-between items-center px-6 py-6 gap-3">
          <span>Showing  {{ paginateProds.page }} to  {{ paginateProds.total_page }} of  {{ paginateProds.total_count }} entries</span>
          <nav class="flex items-center gap-x-1">
            <button
              :disabled="paginateProds.page === 1"
              @click="handlePageChange(paginateProds.page - 1)"
              type="button"
              class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
              Previous
            </button>
            <div class="flex items-center gap-x-1">
              <button v-for="page in paginateProds.total_page" :key="page"
                @click="handlePageChange(page)"
                type="button"
                :class="[
                    'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border',
                    page === paginateProds.page 
                        ? 'text-white border bg-green-600 border-green-600 hover:bg-green-600 focus:outline-none focus:bg-green-600'
                        : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300'
                ]"
                aria-current="page">
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
  </section>
</template>

<script setup>
import { useOrderStore } from '~/stores/orders'
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const useOrder = useOrderStore()
const orderDatas = ref([])
const paginateProds = ref({})
const searchFilter = ref('')
const statusFilter = ref('')

let searchTimeout = null

onMounted(async () => {
  const response = await useOrder.fetchOrdersAdmin()
  orderDatas.value = response.data
  paginateProds.value = response.pagination

  console.log(orderDatas)
})

const formatDate = (dateString, timeString) => {
  if (!dateString) return '-';

  const validTime = timeString ? timeString : '00:00:00';
  const dateTimeString = `${dateString}T${validTime}`;

  const date = new Date(dateTimeString);
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

const handleStatusFilter = async () => {
  const response = await useOrder.fetchOrdersAdmin({
    status: statusFilter.value,
    page: 1,
    search: searchFilter.value,
  })
  orderDatas.value = response.data
  paginateProds.value = response.pagination
}

const handleSearchFilter = async () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(async () => {
    const response = await useOrder.fetchOrdersAdmin({
      search: searchFilter.value,
      page: 1,
      status: statusFilter.value,
    })
    orderDatas.value = response.data
    paginateProds.value = response.pagination
  }, 1000)
}


const handlePageChange = async (page) => {
  const responseProds = await useOrder.fetchOrdersAdmin({
    page: page,
    status: statusFilter.value,
    search: searchFilter.value,
  })
  
  orderDatas.value = responseProds.data
  paginateProds.value = responseProds.pagination
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

useHead({
  script: [
  	{
		src: '/libs/simplebar/dist/simplebar.min.js',
		body: true
    },
    {
		src: '/js/theme.min.js',
		body: true
    },
  ],
})
</script>