<template>
    <main>
        <div class="mt-4">
            <div class="container">
                <div class="flex flex-wrap">
                    <div class="w-full">
                        <nav aria-label="breadcrumb">
                            <ol class="flex flex-wrap">
                                <li class="inline-block text-green-600 mr-2">
                                    <NuxtLink to="/">
                                        Home
                                        <Icon name="tabler:chevron-right" size="14" class="inline-block" />
                                    </NuxtLink>
                                </li>
                                <li class="inline-block text-green-600 mr-2">
                                    <NuxtLink to="/shop">
                                        Shop
                                        <Icon name="tabler:chevron-right" size="14" class="inline-block" />
                                    </NuxtLink>
                                </li>
                                <li class="inline-block text-gray-500 active" aria-current="page">Shop Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="my-10">
            <div class="container">
                <div class="flex flex-wrap">
                    <div class="w-full mb-6">
                        <h1 class="text-xl font-bold">Checkout</h1>
                    </div>
                </div>

                <div class="flex flex-wrap lg:flex-nowrap gap-10">
                    <div class="lg:w-3/5 md:w-full">
                        <div id="accordionFlushExample" class="accordion accordion-flush">
                            
                            <div class="border-b border-gray-300 py-4">
                                <div class="flex justify-between items-center">
                                    <button 
                                        class="flex flex-row gap-2 items-center text-gray-900 text-md font-bold"
                                        :aria-expanded="activeSection === 'address'"
                                        @click="toggleSection('address')"
                                    >
                                        <Icon name="tabler:map-pin" size="20" class="text-gray-500" />
                                        Delivery address
                                    </button>
                                </div>
                                <div v-show="activeSection === 'address'" class="my-6">
                                    <div class="md:flex gap-6">
                                        <div class="lg:w-1/2 w-full">
                                            <div class="card card-body flex-col gap-4 border border-green-500 bg-green-50/30">
                                                <div class="relative flex items-center gap-2">
                                                    <input
                                                        id="homeRadio"
                                                        v-model="selectedAddress"
                                                        class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded-full focus:ring-green-600 focus:outline-none focus:ring-2" 
                                                        type="radio"
                                                        value="home"
                                                    >
                                                    <label class="text-gray-800 font-semibold inline-block" for="homeRadio">Home</label>
                                                </div>
                                                <address class="not-italic text-gray-600 text-sm">
                                                    {{ formData.address }}
                                                    <br><br>
                                                    <abbr title="Phone" class="font-semibold text-gray-800">{{ formData.phone }}</abbr>
                                                </address>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-5 flex justify-end">
                                        <button class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 hover:bg-green-700 rounded-lg px-6 py-2" @click="nextSection">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="border-b border-gray-300 py-4">
                                <button 
                                    class="flex flex-row gap-2 items-center text-gray-900 text-md font-bold"
                                    :aria-expanded="activeSection === 'instructions'"
                                    @click="toggleSection('instructions')"
                                >
                                    <Icon name="tabler:shopping-bag" size="20" class="text-gray-500" />
                                    Delivery Method
                                </button>
                                <div v-show="activeSection === 'instructions'" class="my-6">
                                    <div class="mb-5 flex gap-6">
                                        <div class="flex items-center">
                                            <input
                                                id="delivery"
                                                v-model="deliveryMethod"
                                                type="radio"
                                                value="Delivery"
                                                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded-full focus:ring-green-600"
                                            >
                                            <label for="delivery" class="ml-2 font-medium text-gray-800">Delivery (Rp 5.000)</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                id="pickup"
                                                v-model="deliveryMethod"
                                                type="radio"
                                                value="Pickup"
                                                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded-full focus:ring-green-600"
                                            >
                                            <label for="pickup" class="ml-2 font-medium text-gray-800">Store Pickup (Free)</label>
                                        </div>
                                    </div>
                                    
                                    <textarea
                                        v-model="deliveryRemarks"
                                        class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-3 w-full text-sm"
                                        rows="3"
                                        :placeholder="deliveryMethod === 'Pickup' ? 'Write a note for store pickup...' : 'Write delivery instructions or landmarks...'"
                                    />
                                    
                                    <div class="mt-5 flex justify-end gap-3">
                                        <button class="btn bg-white text-gray-800 border-gray-300 border hover:bg-gray-100 rounded-lg px-6 py-2" @click="prevSection">
                                            Prev
                                        </button>
                                        <button class="btn bg-green-600 text-white border-green-600 hover:bg-green-700 rounded-lg px-6 py-2" @click="nextSection">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="py-4">
                                <button 
                                    class="flex flex-row gap-2 items-center text-gray-900 text-md font-bold"
                                    :aria-expanded="activeSection === 'payment'"
                                    @click="toggleSection('payment')"
                                >
                                    <Icon name="tabler:credit-card" size="20" class="text-gray-500" />
                                    Payment Method
                                </button>
                                <div v-show="activeSection === 'payment'" class="mt-6 flex flex-col gap-4">
                                    <div class="card cursor-pointer border hover:border-green-500 transition-colors" :class="selectedPayment === 'COD' ? 'border-green-500 bg-green-50/30' : 'border-gray-200'" @click="selectedPayment = 'COD'">
                                        <div class="flex items-center p-5 gap-4">
                                            <input
                                                id="codRadio"
                                                v-model="selectedPayment"
                                                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded-full focus:ring-green-600"
                                                type="radio"
                                                value="COD"
                                            >
                                            <div class="flex flex-col gap-1">
                                                <label for="codRadio" class="font-bold text-gray-800 cursor-pointer">Cash on Delivery</label>
                                                <p class="text-sm text-gray-500">Pay with cash when your order is delivered to your address.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="card cursor-pointer border hover:border-green-500 transition-colors" :class="selectedPayment === 'Midtrans' ? 'border-green-500 bg-green-50/30' : 'border-gray-200'" @click="selectedPayment = 'Midtrans'">
                                        <div class="flex items-center p-5 gap-4">
                                            <input
                                                id="midtransRadio"
                                                v-model="selectedPayment"
                                                class="w-4 h-4 text-green-600 bg-white border-gray-300 rounded-full focus:ring-green-600"
                                                type="radio"
                                                value="Midtrans"
                                            >
                                            <div class="flex flex-col gap-1">
                                                <label for="midtransRadio" class="font-bold text-gray-800 cursor-pointer">Pay with Midtrans</label>
                                                <p class="text-sm text-gray-500">Virtual Account (BCA, Mandiri, etc), GoPay, ShopeePay, QRIS.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-6 flex justify-end gap-3">
                                        <button class="btn bg-white text-gray-800 border-gray-300 border hover:bg-gray-100 rounded-lg px-6 py-2" @click="prevSection">
                                            Prev
                                        </button>
                                        <button
                                            :disabled="orderStore.loading || paymentStore.loading"
                                            class="btn bg-green-600 text-white border-green-600 hover:bg-green-700 disabled:opacity-50 rounded-lg px-8 py-2 font-bold shadow-md"
                                            @click="placeOrder"
                                        >
                                            <span v-if="orderStore.loading || paymentStore.loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"/>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-full lg:w-1/3 lg:ml-10">
                        <div class="card shadow-sm border border-gray-100 sticky top-24">
                            <h5 class="px-6 py-4 border-b border-gray-200 font-bold bg-gray-50 rounded-t-lg">Order Details</h5>
                            <ul class="flex flex-col">
                                <li v-for="item in cartItems" :key="item.id" class="py-4 px-6 border-b border-gray-100">
                                    <div class="flex items-center gap-4">
                                        <img :src="item.product_image || ''" alt="Product" class="w-14 h-14 object-cover rounded-md border border-gray-200 bg-white" >
                                        <div class="flex-1">
                                            <h6 class="font-semibold text-gray-800 text-sm leading-tight">{{item.product_name || 'Unknown Product'}}</h6>
                                            <span class="text-gray-500 text-xs">{{item.weight}} {{ item.unit }} &times; {{ item.quantity }}</span>
                                        </div>
                                        <div class="font-bold text-gray-800 text-sm">
                                            Rp {{ formatPrice((item.sale_price || 0) * (item.quantity || 1)) }}
                                        </div>
                                    </div>
                                </li>
                                
                                <li class="py-3 px-6 border-b border-gray-100">
                                    <div class="flex justify-between text-gray-600 text-sm">
                                        <div>Subtotal</div>
                                        <div>Rp {{ formatPrice(subtotal) }}</div>
                                    </div>
                                </li>
                                <li class="py-3 px-6 border-b border-gray-100">
                                    <div class="flex justify-between text-gray-600 text-sm">
                                        <div>Shipping Fee <span v-if="deliveryMethod" class="text-xs font-semibold text-green-600">({{ deliveryMethod }})</span></div>
                                        <div>Rp {{ formatPrice(shippingFee) }}</div>
                                    </div>
                                </li>
                                <li class="py-4 px-6 bg-gray-50 rounded-b-lg">
                                    <div class="flex justify-between font-bold text-gray-900 text-lg">
                                        <div>Grand Total</div>
                                        <div class="text-green-600">Rp {{ formatPrice(grandTotal) }}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useOrderStore } from '~/stores/orders'
import { usePaymentStore } from '~/stores/payment'
import { useSwal } from '~/composables/useSwal'

const cartStore = useCartStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const paymentStore = usePaymentStore()
const router = useRouter()
const swal = useSwal()

const cartItems = ref([])
const deliveryRemarks = ref('')
const deliveryMethod = ref('')

const sections = ['address', 'instructions', 'payment']
const activeSection = ref('address')
const selectedAddress = ref('home')
const selectedPayment = ref('')

const formData = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    lat: null,
    lng: null,
})

const toggleSection = (section) => {
  activeSection.value = section
}

const nextSection = () => {
  const currentIndex = sections.indexOf(activeSection.value)
  if (currentIndex < sections.length - 1) {
    activeSection.value = sections[currentIndex + 1]
  }
}

const prevSection = () => {
  const currentIndex = sections.indexOf(activeSection.value)
  if (currentIndex > 0) {
    activeSection.value = sections[currentIndex - 1]
  }
}

const formatPrice = (price) => {
  const num = Number(price) || 0
  return new Intl.NumberFormat('id-ID').format(num)
}

const subtotal = computed(() => {
  if (!Array.isArray(cartItems.value)) return 0
  return cartItems.value.reduce((total, item) => {
      const price = Number(item.sale_price) || 0
      const qty = Number(item.quantity) || 0
      return total + (price * qty)
  }, 0)
})

const shippingFee = computed(() => {
    return deliveryMethod.value === 'Delivery' ? 5000 : 0
})

const grandTotal = computed(() => {
    return subtotal.value + shippingFee.value
})

const placeOrder = async () => {
  try {
    if (!deliveryMethod.value) {
        swal.toastError('Please select a Delivery Method')
        activeSection.value = 'instructions'
        return
    }
    if (!selectedPayment.value) {
        swal.toastError('Please select a Payment Method')
        return
    }
    if (!Array.isArray(cartItems.value) || cartItems.value.length === 0) {
        swal.toastError('Your cart is empty')
        return
    }

    const currentTime = new Date();
    const formattedDate = currentTime.toISOString().split('T')[0]
    const formattedTime = currentTime.toTimeString().split(' ')[0]

    const orderData = {
        buyer_id: authStore.user?.id,
        order_date: formattedDate,
        shipping_type: deliveryMethod.value,
        order_time: formattedTime,
        payment_type: selectedPayment.value,
        remarks: deliveryRemarks.value,
        order_details: cartItems.value.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }))
    }

    const orderResponse = await orderStore.createOrders(orderData, formData.value.lat, formData.value.lng)
    
    await cartStore.clearCart()

    const validTotalAmount = orderResponse.data.total_amount
    const orderId = orderResponse.data.order_id

    await new Promise(resolve => setTimeout(resolve, 500))

    const paymentData = {
        order_id: orderId,
        remarks: deliveryRemarks.value,
        payment_method: selectedPayment.value,
        gross_amount: validTotalAmount, 
        user_id: authStore.user?.id,
    }

    const respPayment = await paymentStore.createPayment(paymentData)

    if (!respPayment.data.payment_token || respPayment.data.payment_token === "") {
        swal.success('Order placed successfully! Please prepare cash for delivery.')
        router.push('/shop/success-payment') 
        return
    }

    window.snap.pay(respPayment.data.payment_token, {
        onSuccess: () => {
          swal.toastSuccess('Payment Successful!')
          router.push('/shop/success-payment')
        },
        onPending: () => {
          swal.toastWarning('Waiting for payment...')
          router.push('/shop/success-payment')
        },
        onError: () => {
          swal.toastError('Payment failed. Please contact support.')
        },
        onClose: () => {
          swal.toastWarning('You closed the window before completing payment.')
        }
    })

	} catch (error) {
    console.error('Error placing order:', error)
    
    const errorMessage = error.message || ''

    if (errorMessage.toLowerCase().includes('distance too far')) {
        swal.error(
            'Delivery Unavailable 🛵', 
            'Sorry, your address is beyond our maximum delivery range. Please select "Store Pickup" method instead.'
        )

    } else {
        swal.error("Oops", errorMessage || 'Failed to process order. Please try again.')
    }
  }
}

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        router.push('/auth/signin')
        return
    }

    try {
        const response = await cartStore.fetchCarts()
        let items = []
        if (response && Array.isArray(response.data)) {
            items = response.data
        } else if (Array.isArray(response)) {
            items = response
        } else if (cartStore.carts && Array.isArray(cartStore.carts)) {
            items = cartStore.carts
        }
        cartItems.value = items
    } catch (e) {
        console.warn('Empty cart', e)
    }

    try {
        const profile = await authStore.getProfile()
        
        if (!profile.data.address || profile.data.address === "" || !profile.data.phone || profile.data.phone === "") {
            swal.warning('Attention', 'Please complete your delivery address and phone number in your account settings before proceeding to checkout.')
            router.push('/account/setting')
            return
        }

        formData.value = {
            name: profile.data.name || '',
            email: profile.data.email || '',
            phone: profile.data.phone || '',
            address: profile.data.address || '',
            lat: profile.data.lat || null,
            lng: profile.data.lng || null,
        }
    } catch (e) {
        console.error('Failed to load profile', e)
        swal.toastError('Failed to load user profile. Please try again.')
    }
})
</script>