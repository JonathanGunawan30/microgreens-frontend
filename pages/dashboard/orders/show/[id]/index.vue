<template>
  <section class="container">
    <div class="grid grid-cols-1 mb-8">
      <div class="md:flex justify-between items-center">
        <div>
          <h2 class="text-xl">Order Single</h2>
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="/dashboard">
                  Dashboard
                  <Icon name="tabler:slash" size="14" class="icon icon-tabler icons-tabler-outline icon-tabler-slash inline-block mx-2" />
                </a>
              </li>
              <li class="inline-block text-gray-500" aria-current="page">
                  Order Detail
              </li>
            </ol>
          </nav>
        </div>
        <div class="mt-4 md:mt-0">
          <a
href="/dashboard/orders"
            class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-100">
            Back to all orders
          </a>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1">
      <div v-if="orderStore.loading" class="text-center py-8 text-gray-500">
        Loading order detail...
      </div>

      <div v-else-if="orderData?.id" class="card h-full card-lg">
        <div class="card-body p-6">
          <div class="flex flex-col md:flex-row gap-4 justify-between">
            <div class="flex items-center">
              <h3 class="mb-0 mr-3">Order ID: #{{ orderData?.order_code }}</h3>

              <span
class="inline-block p-1 text-sm align-baseline leading-none rounded border font-semibold"
                :class="[
                  orderData?.status === 'Pending' 
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    : orderData?.status === 'Confirmed'
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : orderData?.status === 'Process'
                    ? 'bg-cyan-100 text-cyan-800 border-cyan-200'
                    : orderData?.status === 'Sending'
                    ? 'bg-purple-100 text-purple-800 border-purple-200'
                    : orderData?.status === 'Completed'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : orderData?.status === 'Cancelled'
                    ? 'bg-red-100 text-red-800 border-red-200'
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                ]">
                {{ orderData?.status }}
                
              </span>

            </div>

            
            <div class="flex flex-col md:flex-row gap-3 md:items-center">
              <select
                v-model="statusOrder"
                class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base mb-3"
              >
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Process">Process</option>
                <option value="Sending">Sending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div class="mt-8">
            <div class="grid grid-cols-12">
              <div class="lg:col-span-4 md:col-span-4 col-span-12">
                <div class="mb-6">
                  <h6>Customer Details</h6>
                  <p class="mb-2 leading-relaxed">
                    {{ orderData?.customer?.customer_name || '-' }}
                    <br >
                    {{ orderData?.customer?.customer_email || '-' }}
                    <br >
                    {{ orderData?.customer?.customer_phone || '-' }}
                  </p>
                </div>
              </div>
              <div class="lg:col-span-4 md:col-span-4 col-span-12">
                <div class="mb-6">
                  <h6>Shipping Address</h6>
                  <p class="mb-1 leading-relaxed">
                    {{ orderData?.customer?.customer_address || '-' }}
                  </p>
                </div>
              </div>
              <div class="lg:col-span-4 md:col-span-4 col-span-12">
                <div class="mb-6">
                  <h6>Order Details</h6>
                  <p class="mb-1 leading-relaxed">
                    Order ID:
                    <span class="text-gray-800">
                      {{ orderData?.order_code }}
                    </span>
                    <br >
                    Order Date:
                    <span class="text-gray-800">
                      {{ formatDate(orderData?.order_date, orderData?.order_time) }}
                    </span>
                    <br >
                    Order Total:
                    <span class="text-gray-800">Rp. {{ formatPrice(orderData?.total_amount) }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1">
          <div class="relative overflow-x-auto">
            <table class="text-left w-full whitespace-nowrap">
              <thead class="bg-gray-200 text-gray-700">
                <tr class="border-transparent !border-b-0">
                  <th scope="col" class="px-6 py-3">Products</th>
                  <th scope="col" class="px-6 py-3">Price</th>
                  <th scope="col" class="px-6 py-3">Quantity</th>
                  <th scope="col" class="px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderData?.order_detail" :key="item.id" class="border-b border-gray-300">
                  <td class="py-3 px-6 text-left">
                    <a href="#" class="text-inherit">
                      <div class="flex items-center gap-2 w-full">
                        <div class="flex-0">
                          <img
:src="item.product_image"
                            alt="" class="h-12 w-12 object-contain rounded bg-gray-100" >
                        </div>
                        <div class="">
                          <h5 class="mb-0 text-base">{{ item.product_name }}</h5>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="py-3 px-6 text-left"><span class="">Rp. {{ formatPrice(item.product_price) }}</span></td>
                  <td class="py-3 px-6 text-left">{{ item.quantity }}</td>
                  <td class="py-3 px-6 text-left">Rp. {{ formatPrice(item.product_price * item.quantity) }}</td>
                </tr>
                <tr class="border-b border-gray-300">
                  <td class="pb-0 py-3 px-6 text-left"/>
                  <td class="pb-0 py-3 px-6 text-left"/>
                  <td class="font-medium text-gray-800 py-3 px-6 text-left">
                    Sub Total :
                  </td>
                  <td class="font-medium text-gray-800 py-3 px-6 text-left">
                    Rp. {{ formatPrice(calculateSubtotal) }}
                  </td>
                </tr>
                <tr class="border-b border-gray-300">
                  <td class="pb-0 py-3 px-6 text-left"/>
                  <td class="pb-0 py-3 px-6 text-left"/>
                  <td class="font-medium text-gray-800 py-3 px-6 text-left">
                    Shipping Cost :
                  </td>
                  <td class="font-medium text-gray-800 py-3 px-6 text-left">
                    Rp. {{ formatPrice(orderData?.shipping_fee) }}
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-6 text-left"/>
                  <td class="py-3 px-6 text-left"/>
                  <td class="font-bold text-gray-800 py-3 px-6 text-left">
                    Grand Total :
                  </td>
                  <td class="font-bold text-gray-800 py-3 px-6 text-left">
                    Rp. {{ formatPrice((orderData?.shipping_fee || 0) + calculateSubtotal) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card-body">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="">
              <h6 class="mb-2">Payment Info</h6>
              <span class="block mb-6">{{ (orderData?.payment_method || '').toUpperCase() === 'MIDTRANS' ? 'Transfer' : 'COD' }}</span>
              </div>
            
            <div class="">
              <h5 class="mb-3">Notes</h5>
              <textarea
                v-model="remarks"
                class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 disabled:opacity-50 disabled:pointer-events-none w-full text-base mb-3"
                rows="3" placeholder="Write note for order"/>
              <button
type="button"
                :disabled="orderStore.loading"
                class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
                @click="handleUpdateStatus(orderData.id)">
                {{ orderStore.loading ? 'Submitting...' : 'Submit' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-8 text-red-500">
        {{ orderStore.error || 'Failed to load order data.' }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useOrderStore } from '~/stores/orders'
import { useSwal } from '~/composables/useSwal'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()
const swal = useSwal()

const orderData = ref({})
const statusOrder = ref('')
const remarks = ref('')


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

const formatPrice = (price) => {
  if (!price) return 0
  return new Intl.NumberFormat('id-ID').format(price)
}

const fetchOrderDetail = async () => {
  try {
    const response = await orderStore.getDetailOrders(route.params.id, true)
    orderData.value = response.data
    
    statusOrder.value = orderData.value.status 
  } catch (error) {
    console.error('Error fetching order detail:', error)
  }
}

onMounted(() => {
  fetchOrderDetail()
})

const calculateSubtotal = computed(() => {
  if (!orderData.value?.order_detail) return 0
  
  return orderData.value.order_detail.reduce((total, item) => {
    return total + (item.product_price * item.quantity)
  }, 0)
})

const handleUpdateStatus = async (id) => {
  if (!statusOrder.value) {
    swal.error('Warning', 'Please select a status first')
    return
  }

  swal.loading('Processing...', 'Please wait a moment')
  
  try {
    await orderStore.updateStatusOrder(id, {
      status: statusOrder.value,
      remarks: remarks.value
    })
    swal.close()
    swal.success('Success!', 'Order status has been updated successfully.')
    router.push('/dashboard/orders')
  } catch (err) {
    swal.close()
    swal.error('Failed', err?.message || orderStore.error || 'Failed to update order status')
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