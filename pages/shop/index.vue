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
                                <li class="inline-block text-gray-500 active" aria-current="page">{{ selectedCategory?.name || 'All Products' }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-10">
            <div class="container">
                <div class="flex lg:gap-8">
                    <aside class="lg:w-1/4 mb-6 md:">
                        <div
id="offcanvasCategory" class="offcanvas offcanvas-left offcanvas-collapse" tabindex="-1"
                        aria-labelledby="offcanvasCategoryLabel">
                            <div class="lg:invisible lg:hidden flex items-center p-4 justify-between">
                                <h5 id="offcanvasCategoryLabel" class="offcanvas-title">Filter</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <Icon name="tabler:x" size="24" class="text-gray-700" />
                                </button>
                            </div>
                            <div class="offcanvas-body flex flex-col gap-8">
                                <div class="flex flex-col gap-3">
                                    <h5>Categories</h5>
                                    
                                    <div v-if="loadingCategories" class="flex flex-col gap-2">
                                        <div v-for="n in 6" :key="n" class="h-6 bg-gray-200 rounded animate-pulse w-full"/>
                                    </div>

                                    <ul v-else class="flex flex-wrap nav-category">
                                        <CategoryMenuItem
v-for="(category, index) in categories" 
                                            :key="index"
                                            :category="category"
                                            :is-active="categoryFilter === category.slug"
                                            @select="handleCategoryFilter" 
                                        />
                                    </ul>
                                </div>
                                <div class="flex flex-col gap-3">
                                    <h5 class="font-bold text-gray-900">Price</h5>
                                    <div class="px-2 pt-3 pb-2">
                                        <div ref="priceRangeRef" class="custom-slider"/>
                                    </div>
                                    <div class="flex flex-row gap-2 items-center mt-1">
                                        <span class="text-gray-800 text-sm">Price:</span>
                                        <span class="text-sm font-semibold text-green-600">{{ priceRangeValue }}</span>
                                    </div>
                                </div>
                                
                                <div class="mb-8 relative">
                                    <div class="absolute p-5 py-8 z-10 w-3/4">
                                        <h3 class="mb-0 text-xl font-bold text-gray-900 leading-tight">Fresh Fruits</h3>
                                        <p class="text-gray-700 text-sm mb-4">Get Upto 25% Off</p>
                                        <a role="button" tabindex="0" href="#" class="btn bg-gray-900 text-white hover:bg-gray-800 border-none inline-flex items-center gap-1 text-sm py-2 px-4 rounded-md">
                                            Shop Now
                                            <Icon name="tabler:arrow-narrow-right" size="14" />
                                        </a>
                                    </div>
                                    <NuxtImg src="/images/banner/assortment-citrus-fruits.png" alt="Fresh Fruits Banner" class="w-full h-auto rounded-lg object-cover" />
                                </div>
                                
                            </div>
                        </div>
                    </aside>

                    <section class="lg:w-3/4 w-full">
                        <div v-if="categoryFilter && selectedCategory" class="relative flex flex-col min-w-0 rounded-lg break-words bg-gray-100 p-8 mb-6">
                            <div class="flex-auto">
                                <h1 class="text-xl font-bold">{{ selectedCategory?.name || 'All Products' }}</h1>
                            </div>
                        </div>
                        <div class="flex flex-col md:flex-row justify-between lg:items-center mb-6 gap-3">
                            <div class="flex items-center justify-between">
                                <p v-if="paginateProds.total_count > 0" class="mb-0">
                                    <span class="text-gray-900 font-bold">{{ paginateProds.total_count }}</span>
                                    Products found
                                </p>
                                
                                <div class="flex items-center gap-2 md:hidden">
                                    <button 
                                        :class="gridCols === 1 ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'" 
                                        class="p-1.5 rounded border border-gray-200"
                                        @click="gridCols = 1"
                                    >
                                        <Icon name="tabler:list" size="18" />
                                    </button>
                                    <button 
                                        :class="gridCols === 2 ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'" 
                                        class="p-1.5 rounded border border-gray-200"
                                        @click="gridCols = 2"
                                    >
                                        <Icon name="tabler:layout-grid" size="18" />
                                    </button>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                <div class="lg:hidden flex-shrink-0">
                                    <a
class="btn inline-flex items-center gap-x-2 bg-white text-gray-800 border-gray-300 border py-2 px-3 text-sm hover:bg-gray-50"
                                        data-bs-toggle="offcanvas" href="#offcanvasCategory" role="button"
                                        aria-controls="offcanvasCategory">
                                        <Icon name="tabler:filter" size="16" />
                                        Filters
                                    </a>
                                </div>

                                <div class="flex-shrink-0 min-w-[100px]">
                                    <select
                                        v-model="limit"
                                        class="text-sm py-2 block w-full border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600"
                                        @change="handleFilterChange">
                                        <option :value="10">Show: 10</option>
                                        <option :value="20">Show: 20</option>
                                        <option :value="30">Show: 30</option>
                                        <option :value="50">Show: 50</option>
                                    </select>
                                </div>
                                <div class="flex-shrink-0 min-w-[120px]">
                                    <select
                                        v-model="sort"
                                        class="text-sm py-2 block w-full border-gray-300 rounded-lg focus:border-green-600 focus:ring-green-600"
                                        @change="handleFilterChange">
                                        <option value="">Sort: Featured</option>
                                        <option value="price_asc">Price: Low</option>
                                        <option value="price_desc">Price: High</option>
                                        <option value="newest">Release</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div v-if="loading" :class="[gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1']" class="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                            <div v-for="n in (limit || 10)" :key="n" class="col">
                                <div class="card-product card h-100 border border-gray-200 bg-white animate-pulse">
                                    <div class="card-body p-3 flex flex-col h-full">
                                        <div class="rounded-lg bg-gray-200 mb-3 w-full" style="aspect-ratio: 1/1;"/>
                                        <div class="h-3 bg-gray-200 rounded w-1/3 mb-2"/>
                                        <div class="h-4 bg-gray-200 rounded w-4/5 mb-3 flex-grow"/>
                                        <div class="flex justify-between items-center mt-auto">
                                            <div class="h-4 bg-gray-200 rounded w-16"/>
                                            <div class="h-8 bg-gray-200 rounded-lg w-16"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="featuredProducts.length > 0" :class="[gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1']" class="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                            <div v-for="product in featuredProducts" :key="product.id" class="col">
                                <div class="card-product card h-100 flex flex-col justify-between">
                                    <div class="card-body p-3 flex flex-col h-full">

                                        <div class="img-wrapper position-relative">
                                            <div v-if="product.reguler_price > product.sale_price" class="badge-stack">
                                                <span class="badge-sale">Sale</span>
                                                <span class="badge-discount">
                                                    {{ Math.round(((product.reguler_price - product.sale_price) / product.reguler_price) * 100) }}% OFF
                                                </span>
                                            </div>

                                            <NuxtLink :to="`/shop/${product.id}`" class="d-block w-100 h-100">
                                                <img 
                                                    :src="product.image || '/images/placeholder.jpg'" 
                                                    :alt="product.name" 
                                                    class="product-img img-loaded"
                                                >
                                            </NuxtLink>

                                            <div class="quick-view-overlay">
                                                <button class="btn-quick-view" @click="showQuickView(product)">
                                                    <Icon name="tabler:eye" size="15" />
                                                    <span>Quick View</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="product-info mt-3 flex flex-col flex-grow">
                                            <p class="product-category">{{ product.category_name }}</p>

                                            <h2 class="product-name flex-grow">
                                                <NuxtLink :to="`/shop/${product.id}`" class="text-decoration-none text-gray-800 hover:text-green-600 transition">
                                                    {{ product.name }}
                                                </NuxtLink>
                                            </h2>

                                            <div class="price-row mt-auto pt-2">
                                                <div class="price-group">
                                                    <span class="price-sale">Rp {{ formatPrice(product.sale_price) }}</span>
                                                    <span v-if="product.reguler_price > product.sale_price" class="price-original">Rp {{ formatPrice(product.reguler_price) }}</span>
                                                </div>
                                                
                                                <button class="btn-add" @click="showQuickView(product)">
                                                    <Icon name="tabler:plus" size="14" stroke-width="3" />
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-center py-12 bg-white rounded-lg border border-gray-200">
                            <h3 class="text-xl font-bold text-gray-800">No Products Found</h3>
                            <p class="text-gray-500 mt-2">Please try adjusting your category, price, or search filters.</p>
                        </div>

                        <div v-if="!loading && paginateProds.total_page > 1" class="flex my-8">
                            <nav class="flex items-center gap-x-1">
                                <button
type="button"
                                    :disabled="paginateProds.page === 1"
                                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                                    @click="handlePageChange(paginateProds.page - 1)">
                                    <Icon name="tabler:chevron-left" size="16" />
                                </button>
                                <div class="flex items-center gap-x-1">
                                    <button
v-for="page in paginateProds.total_page" 
                                        :key="page"
                                        :class="[
                                            'leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border',
                                            page === paginateProds.page 
                                                ? 'text-white border bg-green-600 border-green-600 hover:bg-green-600 focus:outline-none focus:bg-green-600'
                                                : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300'
                                        ]"
                                        @click="handlePageChange(page)">
                                        {{ page }}
                                    </button>
                                </div>
                                <button
type="button"
                                    :disabled="paginateProds.page === paginateProds.total_page"
                                    class="leading-none min-h-[36px] min-w-[36px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 rounded-md border bg-white border-gray-300 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                                    @click="handlePageChange(paginateProds.page + 1)">
                                    <Icon name="tabler:chevron-right" size="16" />
                                </button>
                            </nav>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <QuickView v-if="showQuickViewModal && selectedProduct" :product="selectedProduct" @close="showQuickViewModal = false" />
        <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    </main>
</template>

<script setup>
import CategoryMenuItem from '~/components/home/CategoryMenuItem.vue'
import { ref, onMounted, watch } from 'vue'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'
import QuickView from '../../components/modals/QuickView.vue'
import { useCategoryStore } from '~/stores/category'
import { useProductStore } from '~/stores/product'
import { useRouter, useRoute } from 'vue-router'
import LoginModal from '~/components/modals/LoginModal.vue'

const categoryStore = useCategoryStore()
const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const loading = ref(true)
const loadingCategories = ref(true)
const categories = ref([])
const featuredProducts = ref([])
const paginateProds = ref({ page: 1, total_page: 1, total_count: 0 })
const showLoginModal = ref(false)
const showQuickViewModal = ref(false)
const selectedCategory = ref(null)
const selectedProduct = ref(null)
const gridCols = ref(2)

const priceRangeRef = ref(null)
const priceRangeValue = ref('')

const search = ref(route.query.search || '')
const categoryFilter = ref(route.query.category || '')
const limit = ref(Number(route.query.limit) || 10)
const sort = ref(route.query.orderBy || '')
const pageVal = ref(Number(route.query.page) || 1)
const startPrice = ref(route.query.startPrice || '')
const endPrice = ref(route.query.endPrice || '')

const fetchProducts = async () => {
    loading.value = true

    const queryParams = { page: pageVal.value, limit: limit.value }
    if (search.value) queryParams.search = search.value
    if (categoryFilter.value) queryParams.category = categoryFilter.value
    if (sort.value) queryParams.orderBy = sort.value
    if (startPrice.value) queryParams.startPrice = startPrice.value
    if (endPrice.value) queryParams.endPrice = endPrice.value

    router.push({ query: queryParams })

    await productStore.fetchProductsShop({
        search: search.value,
        category: categoryFilter.value,
        page: pageVal.value,
        limit: limit.value,
        orderBy: sort.value,
        startPrice: startPrice.value, 
        endPrice: endPrice.value
    })

    featuredProducts.value = productStore.products
    paginateProds.value = productStore.pagination || { page: 1, total_page: 1, total_count: 0 }
    
    loading.value = false
}

const handleFilterChange = () => {
    pageVal.value = 1
    fetchProducts()
}

const handleCategoryFilter = (slug) => {
    categoryFilter.value = categoryFilter.value === slug ? '' : slug
    pageVal.value = 1
    
    if (categoryFilter.value === '') {
        selectedCategory.value = null
    } else {
        selectedCategory.value = categories.value.find(cat => cat.slug === categoryFilter.value)
    }
    
    fetchProducts()
}

const handlePageChange = (newPage) => {
    pageVal.value = newPage
    fetchProducts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
    loadingCategories.value = true
    const responseCat = await categoryStore.fetchCategoriesHome()
    if (responseCat.success){
        categories.value = categoryStore.categories
        if (categoryFilter.value) {
            selectedCategory.value = categories.value.find(cat => cat.slug === categoryFilter.value)
        }
    }
    loadingCategories.value = false

    const initMin = startPrice.value ? Number(startPrice.value) : 0
    const initMax = endPrice.value ? Number(endPrice.value) : 5000000

    const slider = noUiSlider.create(priceRangeRef.value, {
        start: [initMin, initMax],
        connect: true,
        range: { 'min': 0, 'max': 5000000 },
        step: 5000,
        behavior: 'none',
        format: wNumb({ decimals: 0, thousand: '.', prefix: 'Rp. ' })
    })

    slider.on('update', (values) => {
        priceRangeValue.value = values.join(' - ')
    })

    slider.on('change', (values) => {
        const minVal = parseInt(values[0].replace('Rp. ', '').replace(/\./g, ''))
        const maxVal = parseInt(values[1].replace('Rp. ', '').replace(/\./g, ''))
        
        startPrice.value = minVal
        endPrice.value = maxVal
        
        handleFilterChange()
    })

    fetchProducts()
})

watch(() => route.query.search, (newSearch) => {
    if (newSearch !== search.value) {
        search.value = newSearch || ''
        handleFilterChange()
    }
})

const showQuickView = (product) => {
    selectedProduct.value = product
    showQuickViewModal.value = true
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price)
}

useHead({
    script: [
        { src: '/js/theme.min.js', body: true },
    ],
})</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.card-product {
    border: 1.5px solid #e8e8e8;
    border-radius: 8px;
    transition: border-color 0.25s ease;
    overflow: hidden;
    background: #fff;
}
.card-product:hover {
    border-color: #0aad0a;
    box-shadow: none;
    transform: none;
}
.img-wrapper {
    border-radius: 8px;
    overflow: hidden;
    background: #ffffff;
    width: 100%;
    aspect-ratio: 1 / 1;
    position: relative;
    display: block;
}
.product-img.img-loaded {
    opacity: 1;
}
.product-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
}
:deep(.custom-slider.noUi-target) {
    background: #e5e7eb;
    border: none;
    border-radius: 10px;
    box-shadow: none;
    height: 8px;
}

:deep(.custom-slider .noUi-connect) {
    background: #0aad0a;
}

:deep(.custom-slider .noUi-handle) {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    top: -7px;
    right: -10px;
    cursor: pointer;
}

:deep(.custom-slider .noUi-handle::before),
:deep(.custom-slider .noUi-handle::after) {
    display: none; 
}

:deep(.custom-slider .noUi-handle:focus) {
    outline: none;
}
.badge-stack {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    z-index: 3;
}
.badge-sale {
    display: inline-block;
    background: linear-gradient(135deg, #ff4444, #e02020);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 6px rgba(224, 32, 32, 0.35);
}
.badge-discount {
    display: inline-block;
    background: linear-gradient(135deg, #00b300, #0aad0a);
    color: #fff;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 6px rgba(10, 173, 10, 0.35);
}
.quick-view-overlay {
    position: absolute;
    inset: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, visibility 0.25s ease;
    border-radius: 10px;
}
.img-wrapper:hover .quick-view-overlay {
    opacity: 1;
    visibility: visible;
}
.btn-quick-view {
    background: #fff;
    color: #212529;
    border: none;
    border-radius: 22px;
    padding: 8px 18px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
    cursor: pointer;
    transform: translateY(6px);
    transition: transform 0.25s ease, background 0.2s ease, color 0.2s ease;
}
.img-wrapper:hover .btn-quick-view {
    transform: translateY(0);
}
.btn-quick-view:hover {
    background: #0aad0a;
    color: #fff;
}
.product-category {
    font-size: 0.75rem;
    color: #9e9e9e;
    margin: 0 0 4px;
    text-transform: uppercase;
    letter-spacing: 0.4px;
}
.product-name {
    font-size: 0.93rem;
    font-weight: 600;
    line-height: 1.4;
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 42px;
    color: #1a1a1a;
}
.price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.price-group {
    display: flex;
    flex-direction: column;
    gap: 1px;
}
.price-sale {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.2;
}
.price-original {
    font-size: 0.78rem;
    color: #b0b0b0;
    text-decoration: line-through;
    line-height: 1.2;
}
.btn-add {
    background: #0aad0a;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 0.82rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    box-shadow: 0 2px 8px rgba(10, 173, 10, 0.3);
}
.btn-add:hover {
    background: #099309;
    transform: scale(1.04);
}
</style>