<template>
  <div class="cart-sidebar-container z-[1050]">
    
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      appear
    >
      <div v-if="isOpen" class="fixed inset-0 bg-black/65 z-[1051]" @click="closeCart"></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
      @after-leave="onAfterLeave"
      appear
    >
      <div v-if="isOpen" class="fixed right-0 top-0 h-full bg-white shadow-xl w-full max-w-[520px] z-[1052] flex flex-col">
        
        <div class="border-b p-4 flex justify-between items-start">
          <div>
            <h4 class="font-bold text-lg text-gray-800 mb-1">Shop Cart</h4>
          </div>
          <button type="button" class="text-gray-400 hover:text-gray-700 mt-1" @click="closeCart">
            <Icon name="tabler:x" size="24" />
          </button>
        </div>

        <div class="flex-grow overflow-y-auto p-4 relative">
          
          <div v-if="cartStore.loading" class="absolute inset-0 bg-white/70 z-20 flex items-center justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>

          <div class="bg-red-50 text-red-600 px-3 py-2.5 rounded text-sm mb-4 border border-red-100">
            Items in the cart are temporarily stored and will expire in <strong>24 hours</strong>!
          </div>

          <div v-if="!cartItems || cartItems.length === 0" class="text-center py-12">
            <Icon name="tabler:shopping-cart-x" size="56" class="text-gray-300 mx-auto mb-3" />
            <h6 class="font-bold text-gray-700">Your cart is empty</h6>
            <button @click="closeCart" class="mt-4 btn bg-green-600 text-white hover:bg-green-700 btn-sm text-xs px-3 py-1.5 rounded">
              Start Shopping
            </button>
          </div>

          <ul v-else class="list-none m-0 p-0">
            <li v-for="item in cartItems" :key="item.product_id || item.id" class="py-4 border-b border-gray-100 last:border-0">
              <div class="flex items-center justify-between gap-3">
                
                <div class="w-[58%] flex items-start gap-3 min-w-0">
                  <NuxtLink :to="`/shop/${item.product_id || item.id}`" @click="closeCart" class="flex-shrink-0">
                    <img :src="item.product_image || item.image || '/images/placeholder.jpg'" :alt="item.product_name || item.name" class="w-14 h-14 object-contain rounded border" />
                  </NuxtLink>
                  <div class="flex flex-col min-w-0">
                    <NuxtLink :to="`/shop/${item.product_id || item.id}`" @click="closeCart" class="text-sm font-semibold text-gray-800 hover:text-green-600 leading-tight truncate">
                      {{ item.product_name || item.name }}
                    </NuxtLink>
                    <span class="text-xs text-gray-500 mt-0.5">{{ item.weight }} {{ item.unit }}</span>
                    <button @click="removeItem(item)" class="text-gray-500 hover:text-red-500 flex items-center mt-1.5 w-max group transition">
                      <Icon name="tabler:trash" size="14" class="mr-1 bg-red-500" />
                      <span class="text-xs">Remove</span>
                    </button>
                  </div>
                </div>

                <div class="w-24 flex-shrink-0 flex justify-center">
                  <div class="flex items-center border border-gray-300 rounded-lg h-8 w-full justify-between">
                    <button 
                      @click="decreaseQuantity(item)" 
                      :disabled="cartStore.loading"
                      class="w-8 h-full flex justify-center items-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      :value="item.quantity" 
                      readonly
                      class="w-8 h-full text-center text-sm font-semibold border-0 bg-transparent p-0 focus:ring-0" 
                    />
                    <button 
                      @click="increaseQuantity(item)" 
                      :disabled="cartStore.loading"
                      class="w-8 h-full flex justify-center items-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div class="w-24 flex-shrink-0 text-right">
                  <span class="font-bold text-gray-900 text-sm">Rp {{ formatPrice(item.sale_price || item.price) }}</span>
                </div>

              </div>
            </li>
          </ul>
        </div>

        <div v-if="cartItems && cartItems.length > 0" class="border-t p-4 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-800 font-medium">Subtotal:</span>
            <span class="font-bold text-xl text-gray-900">Rp {{ formatPrice(subtotal) }}</span>
          </div>
          <div class="flex gap-3">
            <button 
              @click="closeCart" 
              class="w-1/2 bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 transition text-sm Checkout"
            >
              Continue Shopping
            </button>
            <NuxtLink 
              to="/shop/checkout" 
              @click="closeCart"
              class="w-1/2 bg-gray-900 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition text-center text-sm"
            >
              Proceed To Checkout
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useSwal } from '~/composables/useSwal'

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const authStore = useAuthStore()
const swal = useSwal()

const isOpen = ref(false)

const cartItems = computed(() => cartStore.carts || [])

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    const price = Number(item.sale_price) || Number(item.price) || 0
    return total + (price * (Number(item.quantity) || 0))
  }, 0)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(Number(price) || 0)
}

onMounted(async () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'

  if (authStore.token) {
    try {
      await cartStore.fetchCarts()
    } catch (error) {
      console.error('[Cart] Error fetching cart:', error)
    }
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const closeCart = () => {
  isOpen.value = false 
}

const onAfterLeave = () => {
  emit('close') 
}

const getProductId = (item) => {
    return item.product_id || item.id || (item.product && item.product.id);
}

const increaseQuantity = async (item) => {
  const targetId = getProductId(item)
  if (!targetId) {
      swal.toastError('Invalid product data')
      return
  }

  if (item.quantity >= 10) {
    swal.toastError('Maximum quantity reached')
    return
  }
  
  item.quantity++ 

  try {
    const res = await cartStore.addToCart(targetId, 1)
    if (!res.success) throw new Error(res.message)
  } catch (error) {
    item.quantity--
    console.error('[Cart] Failed to increase:', error)
    swal.toastError(error.message || 'Failed to update quantity')
  }
}

const decreaseQuantity = async (item) => {
  const targetId = getProductId(item)
  
  if (item.quantity <= 1) {
    removeItem(item)
    return
  }
  
  item.quantity--

  try {
    const res = await cartStore.decreaseItem(targetId)
    if (!res.success) throw new Error(res.message)
  } catch (error) {
    item.quantity++
    console.error('[Cart] Failed to decrease:', error)
    swal.toastError(error.message || 'Failed to update quantity')
  }
}

const removeItem = async (item) => {
  const targetId = getProductId(item)
  
  try {
    const result = await swal.confirm('Remove Item', 'Are you sure you want to remove this item?')
    if (!result.isConfirmed) return

    const res = await cartStore.removeFromCart(targetId)
    
    if (res.success) {
      swal.toastSuccess('Item removed')
    } else {
      throw new Error(res.message)
    }
  } catch (error) {
    console.error('[Cart] Failed to remove item:', error)
    swal.error('Error', error.message || 'Failed to remove item.')
  }
}
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 4px;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>