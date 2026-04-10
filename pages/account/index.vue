<template>
  <main>
    <section>
      <div class="container">
        <div class="grid grid-cols-12">
          <div class="lg:col-span-2 md:col-span-4 col-span-12 border-r hidden md:block">
            <div class="pt-10 md:pr-10">
              <ul class="nav flex-col nav-pills nav-pills-dark">
                <li class="nav-item">
                  <NuxtLink class="nav-link active gap-2" to="/account">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                      <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                    </svg>
                    Your Orders
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2 justify-between" to="/account/notifications">
                    <div class="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                      Notifications
                    </div>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2" to="/account/setting">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-settings">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    </svg>
                    Settings
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <hr class="pt-3 mt-5" />
                </li>
                <li class="nav-item">
                  <button type="button" class="nav-link gap-2" @click="handleLogout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="icon icon-tabler icons-tabler-outline icon-tabler-logout">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="lg:col-span-10 md:col-span-8 col-span-12">
            <div class="py-6 md:p-6 lg:p-10">
              <h2 class="mb-6 text-lg">Your Orders</h2>

              <div class="block w-full overflow-auto scrolling-touch">
                <table class="w-full max-w-full bg-transparent whitespace-nowrap table-with-checkbox">
                  <thead class="bg-gray-100">
                    <tr class="border-gray-300 border-b">
                      <th class="py-3 pl-6 text-left">Product</th>
                      <th class="py-3 pl-6 text-left">Order Code</th>
                      <th class="py-3 pl-6 text-left">Date</th>
                      <th class="py-3 pl-6 text-left">Items</th>
                      <th class="py-3 pl-6 text-left">Status</th>
                      <th class="py-3 pl-6 text-left">Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="orderStore.loading">
                      <td colspan="7" class="text-center py-16">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                        <p class="text-gray-500 mt-3 text-sm">Loading your orders...</p>
                      </td>
                    </tr>

                    <tr v-else-if="orderStore.error">
                      <td colspan="7" class="text-center py-12">
                        <div class="bg-red-50 text-red-500 rounded-lg inline-block px-4 py-3">
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-circle inline-block mr-1" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                          {{ orderStore.error }}
                        </div>
                      </td>
                    </tr>

                    <tr v-else-if="orderList.length === 0">
                      <td colspan="7" class="text-center py-20">
                        <div class="flex flex-col items-center justify-center">
                          <div class="bg-green-50 p-6 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-receipt-2 text-green-600" width="56" height="56" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
                              <path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5" />
                            </svg>
                          </div>
                          <h4 class="text-lg font-bold text-gray-800 mb-1">No Orders Found</h4>
                          <p class="text-gray-500 text-sm mb-5">Looks like you haven't made your first order yet.</p>
                          <NuxtLink to="/shop" class="btn bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                            Start Shopping
                          </NuxtLink>
                        </div>
                      </td>
                    </tr>

                    <tr v-else v-for="order in orderList" :key="order.id" class="border-gray-300 border-b hover:bg-gray-50 transition-colors">
                      <td class="align-middle px-6 py-3">
                        <NuxtLink :to="`/account/orders/${order.id}`" class="font-semibold text-gray-800 hover:text-green-600 transition-colors">
                          <h6 class="mb-0 text-sm">
                            {{ order.order_items?.[0]?.product_name || 'Unknown Product' }}
                            <span v-if="order.order_items?.length > 1" class="text-green-600 font-normal text-xs ml-1">
                              (+{{ order.order_items.length - 1 }} other)
                            </span>
                          </h6>
                        </NuxtLink>
                        <span v-if="order.order_items?.[0]?.weight">
                          <small class="text-gray-500">{{ order.order_items[0].weight }} {{ order.order_items[0].unit }}</small>
                        </span>
                      </td>
                      
                      <td class="align-middle px-6 py-3 text-sm font-medium text-gray-700">
                        {{ order.order_code }}
                      </td>
                      
                      <td class="align-middle px-6 py-3 text-sm text-gray-600">
                        {{ formatDate(order.order_date) }}
                      </td>
                      
                      <td class="align-middle px-6 py-3 text-sm text-gray-600">
                        {{ order.order_items?.reduce((total, item) => total + item.quantity, 0) || 0 }} Item(s)
                      </td>
                      
                      <td class="align-middle px-6 py-3">
                        <span :class="getStatusClass(order.status)" v-html="order.status"></span>
                      </td>
                      
                      <td class="align-middle px-6 py-3 font-bold text-gray-900">
                        Rp {{ formatPrice(order.total_amount) }}
                      </td>
                      
                      <td class="text-gray-400 hover:text-green-600 align-middle px-6 py-3 transition-colors">
                        <NuxtLink :to="`/account/orders/${order.id}`" title="View Detail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </NuxtLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="orderStore.pagination?.total_page > 1 && !orderStore.loading" class="border-t border-gray-300 flex flex-col md:flex-row justify-between items-center py-6 gap-3">
                <span class="text-sm text-gray-600">
                  Showing page {{ orderStore.pagination.page }} of {{ orderStore.pagination.total_page }} 
                  ({{ orderStore.pagination.total_count }} total entries)
                </span>
                <nav class="flex items-center gap-x-1">
                  <button 
                    :disabled="orderStore.pagination.page === 1"
                    @click="handlePageChange(orderStore.pagination.page - 1)"
                    type="button"
                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                    Previous
                  </button>
                  
                  <div class="flex items-center gap-x-1">
                    <button 
                      v-for="page in orderStore.pagination.total_page" 
                      :key="page"
                      @click="handlePageChange(page)"
                      type="button"
                      :class="[
                        'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border',
                        page === orderStore.pagination.page 
                          ? 'text-white border bg-green-600 border-green-600 hover:bg-green-700'
                          : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-100'
                      ]"
                      aria-current="page">
                      {{ page }}
                    </button>
                  </div>
                  
                  <button
                    :disabled="orderStore.pagination.page === orderStore.pagination.total_page"
                    @click="handlePageChange(orderStore.pagination.page + 1)"
                    type="button"
                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                    Next
                  </button>
                </nav>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useOrderStore } from '~/stores/orders'

definePageMeta({
  middleware: ['auth'],
})

const router = useRouter()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const orderList = ref([])

const handleLogout = () => {
  try {
    authStore.logout()
    router.push('/auth/signin')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(Number(price) || 0)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getStatusClass = (status) => {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    'confirmed': 'bg-blue-100 text-blue-800 border border-blue-200',
    'process': 'bg-cyan-100 text-cyan-800 border border-cyan-200',
    'sending': 'bg-purple-100 text-purple-800 border border-purple-200',
    'completed': 'bg-green-100 text-green-800 border border-green-200',
    'cancelled': 'bg-red-100 text-red-800 border border-red-200'
  }
  
  const normalizedStatus = status?.toLowerCase() || 'pending'
  const baseClass = 'inline-block px-2.5 py-1 text-xs align-baseline leading-none rounded-full font-bold'
  
  return `${baseClass} ${classes[normalizedStatus] || classes['pending']}`
}

const fetchOrdersData = async (page = 1) => {
  try {
    const response = await orderStore.fetchOrders({ page, limit: 10 })
    
    if (response && (response.message === 'success' || response.data)) {
      orderList.value = response.data || []
    }
  } catch (error) {
    console.error("Failed to fetch orders data:", error)
  }
}

const handlePageChange = (pageNumber) => {
  fetchOrdersData(pageNumber)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchOrdersData(1)
})
</script>