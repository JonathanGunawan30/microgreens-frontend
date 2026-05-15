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
                    <Icon name="tabler:shopping-bag" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag" />
                    Your Orders
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2 justify-between" to="/account/notifications">
                    <div class="flex items-center gap-2">
                      <Icon name="tabler:bell" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-bell" />
                      Notifications
                    </div>
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <NuxtLink class="nav-link gap-2" to="/account/setting">
                    <Icon name="tabler:settings" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-settings" />
                    Settings
                  </NuxtLink>
                </li>
                <li class="nav-item">
                  <hr class="pt-3 mt-5" >
                </li>
                <li class="nav-item">
                  <button type="button" class="nav-link gap-2" @click="handleLogout">
                    <Icon name="tabler:logout" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-logout" />
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="lg:col-span-10 md:col-span-8 col-span-12">
            <div class="py-6 md:p-6 lg:p-10">
              
              <div class="mb-6">
                <NuxtLink to="/account" class="text-sm text-gray-500 hover:text-green-600 flex items-center mb-3 transition-colors">
                  <Icon name="tabler:arrow-left" size="16" class="mr-1" />
                  Back to Orders
                </NuxtLink>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 class="text-2xl font-bold text-gray-800 mb-0">Order Details</h2>
                  <div v-if="order && !loading" :class="getStatusClass(order.status)" class="w-max">
                    {{ order.status }}
                  </div>
                </div>
              </div>

              <div v-if="loading" class="text-center py-24 bg-gray-50 rounded-xl border border-gray-200">
                <Icon name="tabler:loader-2" size="40" class="animate-spin text-green-600 mx-auto" />
                <p class="text-gray-500 mt-4 text-sm font-medium">Loading your order details...</p>
              </div>

              <div v-else-if="error" class="bg-red-50 text-red-600 p-5 rounded-xl border border-red-100 flex items-center">
                <Icon name="tabler:alert-circle" size="24" class="mr-3 shrink-0" />
                <div>
                  <h4 class="font-bold mb-1">Failed to load order</h4>
                  <p class="text-sm">{{ error }}</p>
                </div>
              </div>

              <div v-else-if="order" class="space-y-6">
                
                <div class="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order Code</p>
                      <p class="font-semibold text-gray-900">{{ order.order_code }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Date Placed</p>
                      <p class="font-semibold text-gray-900">{{ formatDate(order.order_date, order.order_time) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Shipping Type</p>
                      <p class="font-semibold text-gray-900">{{ order.shipping_type || 'Standard' }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Amount</p>
                      <p class="font-bold text-green-600 text-lg">Rp {{ formatPrice(order.total_amount) }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="order.customer" class="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                  <h4 class="font-semibold text-gray-800 mb-4 text-base border-b pb-2">Customer Details</h4>
                  <div class="space-y-2">
                    <p class="text-sm"><span class="text-gray-500 inline-block w-24">Name:</span> <span class="font-medium">{{ order.customer.customer_name }}</span></p>
                    <p class="text-sm"><span class="text-gray-500 inline-block w-24">Email:</span> <span class="font-medium">{{ order.customer.customer_email }}</span></p>
                    <p class="text-sm"><span class="text-gray-500 inline-block w-24">Phone:</span> <span class="font-medium">{{ order.customer.customer_phone }}</span></p>
                    <p class="text-sm flex items-start">
                      <span class="text-gray-500 inline-block w-24 shrink-0">Address:</span> 
                      <span class="font-medium text-gray-800">{{ order.customer.customer_address }}</span>
                    </p>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div class="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <h4 class="font-semibold text-gray-800 m-0">Items in your order</h4>
                    <span class="text-sm text-gray-500 bg-gray-200 px-2.5 py-1 rounded-full font-medium">
                      {{ order.order_detail?.reduce((acc, item) => acc + item.quantity, 0) || 0 }} Items
                    </span>
                  </div>
                  
                  <div class="p-0">
                    <div
v-for="(item, index) in order.order_detail" :key="index" 
                         class="flex flex-col sm:flex-row items-start sm:items-center p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                      
                      <div class="w-20 h-20 shrink-0 bg-white border border-gray-200 rounded-lg p-2 mr-4 mb-4 sm:mb-0">
                        <img :src="item.product_image || '/images/placeholder.jpg'" :alt="item.product_name" class="w-full h-full object-contain" >
                      </div>
                      
                      <div class="flex-grow">
                        <h5 class="text-base font-semibold text-gray-900 mb-1">{{ item.product_name }}</h5>
                        <p class="text-sm text-gray-500 mb-0">
                          Rp {{ formatPrice(item.product_price) }} / item
                        </p>
                      </div>
                      
                      <div class="mt-4 sm:mt-0 sm:text-right min-w-[100px]">
                        <p class="text-xs text-gray-500 mb-1">Qty</p>
                        <p class="font-bold text-gray-900 text-lg">{{ item.quantity }}x</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div class="flex justify-between items-center text-sm mb-2">
                      <span class="text-gray-500">Shipping Fee ({{ order.shipping_type || 'Pickup' }})</span>
                      <span class="font-medium text-gray-800">Rp {{ formatPrice(order.shipping_fee) }}</span>
                    </div>
                    <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                      <span class="font-semibold text-gray-800">Total</span>
                      <span class="font-bold text-green-600 text-lg">Rp {{ formatPrice(order.total_amount) }}</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const orderStore = useOrderStore()

const orderId = route.params.id

const loading = computed(() => orderStore.loading)
const error = computed(() => orderStore.error)
const order = computed(() => Object.keys(orderStore.order || {}).length > 0 ? orderStore.order : null)

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(Number(price) || 0)
}

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
  const baseClass = 'inline-block px-3 py-1.5 text-sm align-baseline leading-none rounded-full font-bold'
  
  return `${baseClass} ${classes[normalizedStatus] || classes['pending']}`
}

const handleLogout = () => {
  try {
    authStore.logout()
    router.push('/auth/signin')
  } catch (err) {
    console.error('Error during logout:', err)
  }
}

onMounted(async () => {
  try {
    await orderStore.getDetailOrders(orderId, false)
  } catch (err) {
    console.error("Failed to fetch order details:", err)
  }
})
</script>