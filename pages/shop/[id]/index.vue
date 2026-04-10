<template>
    <main v-if="featuredProduct && featuredProduct.id" class="overflow-x-hidden">
        <div class="mt-4">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="flex flex-wrap items-center text-base">
                        <li class="inline-block text-green-600 mr-2 mb-1">
                            <NuxtLink to="/" class="flex items-center hover:text-green-700">
                                Home
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-chevron-right inline-block ml-1" width="16"
                                    height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </NuxtLink>
                        </li>
                        <li class="inline-block text-green-600 mr-2 mb-1">
                            <NuxtLink to="/shop" class="flex items-center hover:text-green-700">
                                Shop
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-chevron-right inline-block ml-1" width="16"
                                    height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </NuxtLink>
                        </li>
                        <li v-if="featuredProduct.category_name" class="inline-block text-green-600 mr-2 mb-1">
                            <NuxtLink :to="`/shop?category=${featuredProduct.category_slug}`" class="flex items-center hover:text-green-700">
                                {{ featuredProduct.category_name }}
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-chevron-right inline-block ml-1" width="16"
                                    height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </NuxtLink>
                        </li>
                        <li class="inline-block text-gray-500 active mb-1" aria-current="page">{{ featuredProduct.name }}</li>
                    </ol>
                </nav>
            </div>
        </div>

        <section class="my-10">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    
                    <div class="w-full">
                        <div class="relative rounded-lg overflow-hidden bg-white h-[400px] md:h-[500px] flex items-center justify-center p-8 mb-4 border border-gray-200">
                            <Transition name="fade" mode="out-in">
                                <img 
                                    :key="activeImage" 
                                    :src="activeImage || '/images/placeholder.jpg'" 
                                    :alt="featuredProduct.name" 
                                    class="w-full h-full object-contain" 
                                />
                            </Transition>
                        </div>
                        <div class="product-tools" v-if="allImages.length > 1">
                            <div class="thumbnails flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                <div 
                                    v-for="(img, idx) in allImages" 
                                    :key="idx" 
                                    @click="activeImage = img"
                                    :class="[
                                        'w-24 h-24 rounded-lg flex-shrink-0 cursor-pointer border p-2 flex items-center justify-center bg-white transition-all duration-300', 
                                        activeImage === img ? 'border-green-600 border-2' : 'border-gray-200 hover:border-green-400'
                                    ]"
                                >
                                    <img :src="img" :alt="`thumbnail-${idx}`" class="w-full h-full object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="w-full">
                        <div class="flex flex-col gap-4">
                            <NuxtLink :to="`/shop?category=${featuredProduct.category_slug}`" class="block text-green-600 font-semibold text-base">
                                {{ featuredProduct.category_name }}
                            </NuxtLink>
                            
                            <h1 class="text-3xl font-bold text-gray-900 leading-tight mb-0">{{ featuredProduct.name }}</h1>
                            
                            <div class="flex flex-col gap-2">
                                
                                <div class="mt-2 flex items-center">
                                    <span class="text-gray-900 font-bold text-xl">Rp. {{ formatPrice(currentProductData.sale_price) }}</span>
                                    <span v-if="hasDiscount" class="line-through text-gray-500 ml-3 text-base">Rp. {{ formatPrice(currentProductData.reguler_price) }}</span>
                                    <span v-if="hasDiscount"><small class="text-red-600 font-bold ml-3 text-base">{{ discountPercentage }}% Off</small></span>
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-6 mt-2">
                                <hr />
                                
                                <div v-if="featuredProduct.child && featuredProduct.child.length > 0">
                                    <button v-for="child in featuredProduct.child" :key="child.id"
                                        type="button"
                                        @click="handleVariantSelect(child)"
                                        :class="[
                                            'btn inline-flex items-center gap-x-2 border disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-4 mr-2 mb-2 transition-colors py-2 px-4 text-base font-medium rounded',
                                            selectedChild?.id === child.id 
                                                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 focus:ring-green-300' 
                                                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-gray-400 focus:ring-gray-300'
                                        ]">
                                        {{ child.weight }}
                                    </button>
                                </div>

                                <div>
                                    <div class="w-32 mb-4">
                                        <div class="input-group input-spinner rounded flex justify-between items-center h-12 border border-gray-300">
                                            <button type="button" @click="handleQuantityChange('decrement')" :disabled="quantity <= 1" class="button-minus w-12 h-full border-r border-gray-300 cursor-pointer text-gray-600 hover:bg-gray-100 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                                -
                                            </button>
                                            <input type="number" v-model="quantity" readonly class="quantity-field w-12 px-2 text-center h-full border-0 bg-transparent focus:ring-0 text-base font-semibold text-gray-800 p-0" />
                                            <button type="button" @click="handleQuantityChange('increment')" :disabled="quantity >= maxAllowed || availableStock <= 0" class="button-plus w-12 h-full border-l border-gray-300 cursor-pointer text-gray-600 hover:bg-gray-100 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap justify-start gap-2 items-center">
                                        <div class="md:w-2/5 w-full grid">
                                            <button type="button" @click="addToCart" :disabled="availableStock <= 0" ref="addToCartBtn"
                                                class="btn bg-green-600 text-white border-green-600 disabled:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 justify-center flex items-center gap-2 h-12 text-base">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                                    <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                                                </svg>
                                                {{ currentProductData.stock <= 0 ? 'Out of Stock' : (availableStock <= 0 ? 'Max in Cart' : 'Add to cart') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <hr />
                                
                                <div>
                                    <table class="text-left w-full text-base text-gray-800">
                                        <tbody>
                                            <tr>
                                                <td class="px-2 py-3 w-1/3">Availability:</td>
                                                <td class="px-2 py-3 font-semibold" :class="currentProductData.stock > 0 ? 'text-green-600' : 'text-red-500'">
                                                    {{ currentProductData.stock > 0 ? 'In Stock' : 'Out of Stock' }} 
                                                    <span v-if="currentProductData.stock > 0" class="text-gray-500 text-sm font-normal ml-1">
                                                        ({{ availableStock > 0 ? availableStock + ' left' : 'Max Limit Reached' }})
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-3">Type:</td>
                                                <td class="px-2 py-3 font-semibold">{{ featuredProduct.category_name }}</td>
                                            </tr>
                                            <tr>
                                                <td class="px-2 py-3">Shipping:</td>
                                                <td class="px-2 py-3">
                                                    01 day shipping.
                                                    <span class="text-gray-500 text-sm ml-1">(Free pickup today)</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-10">
            <div class="container">
                <div class="flex flex-wrap">
                    <div class="w-full">
                        <ul class="nav nav-line-bottom border-b border-gray-300 pl-0 flex flex-wrap gap-4 overflow-x-hidden" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button @click="activeTab = 'details'" :class="['inline-block py-3 font-semibold px-4 no-underline nav-link text-base transition-colors', activeTab === 'details' ? 'active border-green-600 text-green-600' : 'text-gray-600 hover:text-gray-900']" type="button" role="tab">
                                    Product Details
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button @click="activeTab = 'info'" :class="['inline-block py-3 font-semibold px-4 no-underline nav-link text-base transition-colors', activeTab === 'info' ? 'active border-green-600 text-green-600' : 'text-gray-600 hover:text-gray-900']" type="button" role="tab">
                                    Information
                                </button>
                            </li>
                        </ul>
                        
                        <div class="tab-content mt-8" id="myTabContent">
                            
                            <div v-show="activeTab === 'details'" class="tab-pane active opacity-100 block" role="tabpanel">
                                <div class="my-8 flex flex-col gap-6 max-w-4xl">
                                    <div class="flex flex-col gap-2">
                                        <h3 class="text-lg font-bold text-gray-900">Nutrient Value &amp; Benefits</h3>
                                        <div v-if="featuredProduct.description" v-html="featuredProduct.description" class="text-gray-700 leading-relaxed text-base"></div>
                                        <p v-else class="text-gray-500 italic text-base">No description available.</p>
                                    </div>
                                    <div class="flex flex-col gap-2 mt-2">
                                        <h4 class="text-lg font-bold text-gray-900">Disclaimer</h4>
                                        <p class="text-gray-700 text-base leading-relaxed">Image shown is a representation and may slightly vary from the actual product. Every effort is made to maintain accuracy of all information displayed.</p>
                                    </div>
                                </div>
                            </div>

                            <div v-show="activeTab === 'info'" class="tab-pane active opacity-100 block" role="tabpanel">
                                <div class="my-8 max-w-4xl">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                                        <div>
                                            <div class="flex py-4 border-b border-gray-200">
                                                <div class="w-1/2 text-gray-600 text-base font-medium">Weight</div>
                                                <div class="w-1/2 text-gray-900 text-base font-semibold">{{ currentProductData.weight }} {{ currentProductData.unit || featuredProduct.unit }}</div>
                                            </div>
                                             <div class="flex py-4 border-b border-gray-200">
                                                <div class="w-1/2 text-gray-600 text-base font-medium">Product Name</div>
                                                <div class="w-1/2 text-gray-900 text-base font-semibold">{{ featuredProduct.name }}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex py-4 border-b border-gray-200">
                                                <div class="w-1/2 text-gray-600 text-base font-medium">Category</div>
                                                <div class="w-1/2 text-gray-900 text-base font-semibold">{{ featuredProduct.category_name }}</div>
                                            </div>
                                            <div class="flex py-4 border-b border-gray-200">
                                                <div class="w-1/2 text-gray-600 text-base font-medium">Stock Available</div>
                                                <div class="w-1/2 text-gray-900 text-base font-semibold">{{ currentProductData.stock }} Units</div>
                                            </div>
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

    <div v-else class="overflow-x-hidden">
        <div class="mt-4">
            <div class="container">
                <div class="flex items-center gap-2">
                    <div class="skeleton h-4 w-10 rounded"></div>
                    <div class="skeleton h-4 w-4 rounded"></div>
                    <div class="skeleton h-4 w-12 rounded"></div>
                    <div class="skeleton h-4 w-4 rounded"></div>
                    <div class="skeleton h-4 w-24 rounded"></div>
                </div>
            </div>
        </div>

        <section class="my-10">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    
                    <div class="w-full">
                        <div class="skeleton rounded-lg h-[400px] md:h-[500px] mb-4"></div>
                        <div class="flex gap-3">
                            <div class="skeleton w-24 h-24 rounded-lg flex-shrink-0"></div>
                            <div class="skeleton w-24 h-24 rounded-lg flex-shrink-0"></div>
                            <div class="skeleton w-24 h-24 rounded-lg flex-shrink-0"></div>
                        </div>
                    </div>

                    <div class="w-full flex flex-col gap-4">
                        <div class="skeleton h-4 w-24 rounded"></div>
                        <div class="skeleton h-8 w-3/4 rounded"></div>
                        <div class="skeleton h-8 w-1/2 rounded"></div>

                        <hr class="my-2"/>

                        <div class="flex gap-2">
                            <div class="skeleton h-10 w-20 rounded"></div>
                            <div class="skeleton h-10 w-20 rounded"></div>
                            <div class="skeleton h-10 w-20 rounded"></div>
                        </div>

                        <div class="skeleton h-12 w-32 rounded"></div>
                        <div class="skeleton h-12 w-full md:w-2/5 rounded"></div>

                        <hr class="my-2"/>

                        <div class="flex flex-col gap-3">
                            <div class="flex gap-4">
                                <div class="skeleton h-4 w-24 rounded"></div>
                                <div class="skeleton h-4 w-32 rounded"></div>
                            </div>
                            <div class="flex gap-4">
                                <div class="skeleton h-4 w-24 rounded"></div>
                                <div class="skeleton h-4 w-32 rounded"></div>
                            </div>
                            <div class="flex gap-4">
                                <div class="skeleton h-4 w-24 rounded"></div>
                                <div class="skeleton h-4 w-32 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-10">
            <div class="container">
                <div class="flex gap-4 border-b border-gray-200 pb-3 mb-8">
                    <div class="skeleton h-6 w-32 rounded"></div>
                    <div class="skeleton h-6 w-24 rounded"></div>
                </div>
                <div class="flex flex-col gap-3 max-w-4xl">
                    <div class="skeleton h-6 w-48 rounded"></div>
                    <div class="skeleton h-4 w-full rounded"></div>
                    <div class="skeleton h-4 w-full rounded"></div>
                    <div class="skeleton h-4 w-3/4 rounded"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'
import { useSwal } from '~/composables/useSwal'

const featuredProduct = ref(null)
const productStore = useProductStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const swal = useSwal()

const productId = route.params.id

const selectedChild = ref(null)
const quantity = ref(1)
const activeTab = ref('details')
const activeImage = ref('')

const addToCartBtn = ref(null)

const allImages = computed(() => {
    if (!featuredProduct.value) return []
    const imgs = []
    
    if (featuredProduct.value.image) imgs.push(featuredProduct.value.image)
    
    if (featuredProduct.value.child && featuredProduct.value.child.length > 0) {
        featuredProduct.value.child.forEach(c => {
            if (c.image && !imgs.includes(c.image)) {
                imgs.push(c.image)
            }
        })
    }
    return imgs
})

const currentProductData = computed(() => {
    if (!featuredProduct.value) return {}
    return selectedChild.value ? selectedChild.value : featuredProduct.value
})

const qtyInCart = computed(() => {
    const targetId = currentProductData.value?.id
    if (!targetId || !cartStore.carts) return 0
    const cartItem = cartStore.carts.find(item => Number(item.product_id) === Number(targetId))
    return cartItem ? Number(cartItem.quantity) : 0
})

const availableStock = computed(() => {
    const realStock = Number(currentProductData.value?.stock || 0)
    return Math.max(0, realStock - qtyInCart.value)
})

const maxAllowed = computed(() => {
    return Math.min(availableStock.value, 10)
})

const hasDiscount = computed(() => {
    const reg = Number(currentProductData.value.reguler_price) || 0
    const sale = Number(currentProductData.value.sale_price) || 0
    return reg > 0 && reg > sale
})

const discountPercentage = computed(() => {
    if (!hasDiscount.value) return 0
    const reg = Number(currentProductData.value.reguler_price)
    const sale = Number(currentProductData.value.sale_price)
    return Math.round(((reg - sale) / reg) * 100)
})

const handleQuantityChange = (type) => {
    if (type === 'increment') {
        if (quantity.value < maxAllowed.value) {
            quantity.value++
        } else {
            if (availableStock.value <= 0) {
                swal.toastError('You already have all available stock in your cart.')
            } else {
                swal.toastError(`Maximum ${maxAllowed.value} items allowed.`)
            }
        }
    } else if (type === 'decrement' && quantity.value > 1) {
        quantity.value--
    }
}

const handleVariantSelect = (child) => {
    selectedChild.value = child
    quantity.value = 1 
    
    if (child && child.image) {
        activeImage.value = child.image
    } else if (featuredProduct.value.image) {
        activeImage.value = featuredProduct.value.image
    }
}

watch(maxAllowed, (newMax) => {
    if (quantity.value > newMax) {
        quantity.value = newMax === 0 ? 1 : newMax
    }
})

const flyToCartAnimation = () => {
    if (!addToCartBtn.value) return;
    const btnRect = addToCartBtn.value.getBoundingClientRect();
    
    const flyingImage = document.createElement('img');
    flyingImage.src = activeImage.value || '/images/placeholder.jpg';
    flyingImage.className = 'fly-to-cart-img';
    
    flyingImage.style.left = `${btnRect.left + (btnRect.width / 2) - 25}px`; 
    flyingImage.style.top = `${btnRect.top + (btnRect.height / 2) - 25}px`;
    
    document.body.appendChild(flyingImage);

    setTimeout(() => {
        flyingImage.style.left = `85vw`;
        flyingImage.style.top = `5vh`;
        flyingImage.style.width = `20px`;
        flyingImage.style.height = `20px`;
        flyingImage.style.opacity = `0.2`;
    }, 10);

    setTimeout(() => {
        if (document.body.contains(flyingImage)) {
            document.body.removeChild(flyingImage);
        }
    }, 800);
}

onMounted(async () => {
    const response = await productStore.fetchProductDetailHome(productId)
    if (response.success) {
        featuredProduct.value = response.data.data || response.data
        
        activeImage.value = featuredProduct.value.image || ''

        if (featuredProduct.value.child && featuredProduct.value.child.length > 0) {
            handleVariantSelect(featuredProduct.value.child[0])
        }
    } else {
        swal.toastError('Failed to load product details.')
    }
})

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(Number(price) || 0)
}

const addToCart = async () => {
    if (!authStore.token) {
        swal.toastError('Please sign in first to add items to your cart.')
        router.push('/auth/signin')
        return
    }

    if (featuredProduct.value.child && featuredProduct.value.child.length > 0 && !selectedChild.value) {
        swal.toastError('Please select a variant first')
        return
    }

    if (availableStock.value <= 0) {
        swal.toastError('Product out of stock or max limit reached')
        return
    }
    
    try {
        const targetId = currentProductData.value.id
        const res = await cartStore.addToCart(parseInt(targetId), quantity.value)
        
        if (res.success) {
            flyToCartAnimation()
            swal.toastSuccess('Product added to cart!')
            quantity.value = 1
        } else {
            swal.toastError(res.message || 'Failed to add to cart.')
        }
    } catch (error) {
        console.error('[Product Detail] Error adding to cart:', error)
        swal.toastError('An error occurred while adding to cart.')
    }
}

useHead({
  script: [
    { src: '/js/theme.min.js', body: true },
  ],
})
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
  -moz-appearance: textfield;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overflow-x-hidden {
    overflow-x: hidden;
}

.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 50%,
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

</style>

<style>
.fly-to-cart-img {
    position: fixed;
    z-index: 999999;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    pointer-events: none;
}
</style>