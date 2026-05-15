<template>
    <main>
        <div class="mt-4">
			<div class="container">
				<div class="flex flex-wrap">
					<div class="w-full">
						<nav aria-label="breadcrumb">
							<ol class="flex flex-wrap">
								<li class="inline-block text-green-600 mr-2">
									<a href="/">
										Home
										<Icon name="tabler:chevron-right" size="14" class="inline-block" />
									</a>
								</li>
								<li class="inline-block text-green-600 mr-2">
									<a href="../shop">
										Shop
										<Icon name="tabler:chevron-right" size="14" class="inline-block" />
									</a>
								</li>
								<li class="inline-block text-gray-500 active" aria-current="page">Shop Cart</li>
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
						<!-- card -->

						<h1 class="text-xl">Shop Cart</h1>
					</div>
				</div>

				<div class="flex flex-wrap lg:flex-nowrap lg:gap-x-12 gap-y-6">
					<div class="lg:w-2/3 w-full">
						<div class="flex flex-col gap-5">
							<ul class="list-none">
								<li v-for="item in cartItems" :key="item.id" class="py-3 border-gray-300 border-t">
									<div class="flex items-center justify-between">
										<div class="w-1/2 md:w-1/2 lg:w-3/5">
											<div class="flex flex-row gap-5">
												<img :src="item.product_image" alt="Ecommerce"
													class="w-16 h-16" >
												<div class="flex flex-col gap-2">
													<div>
														<NuxtLink :to="`../shop/${item.id}`" class="text-inherit">
															<h6>{{item.product_name}}</h6>
														</NuxtLink>
														<span class="text-gray-500 text-sm">{{ item.weight }} / {{item.unit}}</span>
													</div>
													<div class="text-sm leading-none">
														<a href="#!" class="text-green-600 flex items-center gap-1">
															<span class="align-text-bottom">
																<Icon name="tabler:trash" size="14" class="icon icon-tabler icon-tabler-trash" />
															</span>
															<span class="text-gray-500 text-sm" @click="removeItem(item.id)">Remove</span>
														</a>
													</div>
												</div>
											</div>
										</div>
										<div class="w-1/3 md:w-1/4 lg:w-1/6">
											<div
												class="input-group input-spinner rounded-lg flex justify-between items-center">
												<button
                                                    class="w-8 py-1 border-r cursor-pointer border-gray-300"
                                                    @click="decreaseQuantity(item)"
                                                >
                                                    -
                                                </button>
												<input v-model="item.quantity" type="number" step="1" max="10"
													class="quantity-field w-9 px-2 text-center h-7 border-0 bg-transparent" >
                                                    <button
                                                    class="w-8 py-1 border-l cursor-pointer border-gray-300"
                                                    @click="increaseQuantity(item)"
                                                >
                                                    +
                                                </button>
											</div>
										</div>
										<div class="w-1/5 md:w-1/5 text-right">
											<span class="font-bold text-gray-800">Rp. {{ formatPrice(item.sale_price) }}</span>
										</div>
									</div>
								</li>
							</ul>
							<div class="flex justify-between">
								<a href="../shop"
									class="btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
									Continue Shopping
								</a>
								<a href="#!"
									class="btn inline-flex items-center gap-x-2 bg-gray-800 text-white border-gray-800 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-900 hover:border-gray-900 active:bg-gray-900 active:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300">
									Update Cart
								</a>
							</div>
						</div>
					</div>

					<div class="w-full lg:w-1/3 md:w-full">
						<div class="relative card min-w-0">
							<div class="card-body flex flex-col gap-4">
								<h2 class="text-md">Summary</h2>
								<div
									class="relative flex flex-col min-w-0 rounded-lg break-words border bg-white border-1 border-gray-300">
									<ul class="flex flex-col">
										<li
											class="relative py-3 px-4 -mb-px border-r-0 border-l-0 border-gray-300 no-underline flex justify-between items-start">
											<div>
												<div class="font-bold text-gray-800">Subtotal</div>
											</div>
											<span class="font-bold text-gray-800">Rp. {{formatPrice(subtotal)}}</span>
										</li>
									</ul>
								</div>
								<div>
									<div class="grid">
										<a href="../shop/checkout"
											class="btn flex justify-between bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 btn-lg"
											type="submit">
											Go to Checkout
											<span class="font-bold">Rp. {{formatPrice(subtotal)}}</span>
										</a>
									</div>
									<p class="mt-1">
										<span class="text-sm">
											By placing your order, you agree to be bound by the Freshcart
											<a href="#!" class="text-green-600">Terms of Service</a>
											and
											<a href="#!" class="text-green-600">Privacy Policy.</a>
										</span>
									</p>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </main>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const cartItems = ref([])

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        router.push('/auth/signin')
        return
    }
    const response = await cartStore.fetchCarts()
    cartItems.value = response.data
})

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.sale_price * item.quantity), 0)
})

const increaseQuantity = (item) => {
  if (item.quantity < 10) item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) item.quantity--
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const removeItem = async (itemId) => {
  if (!authStore.token) {
    alert('Please login first')
    router.push('/auth/signin')
    return
  }
  try {
    cartStore.deleteCart(itemId)
    router.replace(route.fullPath)
  } catch (error) {
    console.error('Error deleting item:', error)
    alert('An error occurred while removing from cart')
  }
}

</script>