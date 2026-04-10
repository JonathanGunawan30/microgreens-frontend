<template>
  <div>
    <section class="mt-8">
      <div class="container">
        <Swiper
          :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination, SwiperNavigation]"
          :effect="'fade'"
          :speed="400"
          :space-between="100"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :pagination="{ 
            clickable: true,
            el: '.swiper-pagination'
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
          :breakpoints="{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 }
          }"
          class="swiper-container"
        >
          <SwiperSlide>
            <div 
              class="relative rounded-lg overflow-hidden"
              style="min-height: 400px;"
            >
              <img
                src="~/assets/images/slider/slide-1.jpg"
                alt="Slider 1"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="relative lg:py-32 p-12 lg:pl-12 xl:w-2/5 md:w-3/5">
                <span class="inline-block p-2 text-sm align-baseline leading-none rounded-lg bg-yellow-500 text-gray-900 font-semibold">
                  Opening Sale Discount 50%
                </span>
                <div class="my-7 flex flex-col gap-2">
                  <h1 class="text-gray-900 text-xl lg:text-5xl font-bold leading-tight">
                    SuperMarket For Fresh Grocery
                  </h1>
                  <p class="text-md font-light">
                    Introduced a new model for online grocery shopping and convenient home delivery.
                  </p>
                </div>
                <NuxtLink
                  to="/shop"
                  class="btn inline-flex items-center gap-x-2 bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 focus:ring-4 focus:ring-gray-300"
                >
                  Shop Now
                  <Icon name="tabler:arrow-right" class="inline-block" size="14" />
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div 
              class="relative rounded-lg overflow-hidden"
              style="min-height: 400px;"
            >
              <img
                src="/images/slider/slider-2.jpg"
                alt="Slider 2"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="relative lg:py-32 lg:pl-12 lg:pr-6 px-12 py-12 xl:w-2/5 md:w-3/5">
                <span class="inline-block p-2 text-sm align-baseline leading-none rounded-lg bg-yellow-500 text-gray-900 font-semibold">
                  Free Shipping - orders over $100
                </span>
                <div class="my-7 flex flex-col gap-2">
                  <h2 class="text-gray-900 text-xl lg:text-5xl font-bold leading-tight">
                    Free Shipping on
                    <br />
                    orders over
                    <span class="text-green-600">$100</span>
                  </h2>
                  <p class="text-md font-light">
                    Free Shipping to First-Time Customers Only, After promotions and discounts are applied.
                  </p>
                </div>
                <NuxtLink
                  to="/shop"
                  class="btn inline-flex items-center gap-x-2 bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 focus:ring-4 focus:ring-gray-300"
                >
                  Shop Now
                  <Icon name="tabler:arrow-right" class="inline-block" size="14" />
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>

          <div class="swiper-pagination !bottom-14"></div>

        </Swiper>
      </div>
    </section>

    <section class="mt-8 mb-12">
      <div class="container">
        
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold text-gray-800">Featured Categories</h2>
          
          <div class="flex gap-2">
            <button class="custom-prev flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white transition-all cursor-pointer">
              <Icon name="tabler:chevron-left" size="20" />
            </button>
            <button class="custom-next flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-green-600 hover:text-white transition-all cursor-pointer">
              <Icon name="tabler:chevron-right" size="20" />
            </button>
          </div>
        </div>

        <div v-if="loading" class="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-4">
          <div
            v-for="n in skeletonCount"
            :key="n"
            class="rounded-lg border border-gray-200 bg-white animate-pulse"
          >
            <div class="py-10 px-3 flex flex-col items-center gap-4">
              <div class="w-24 h-24 rounded-full bg-gray-200"></div>
              <div class="w-3/4 h-4 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        <Swiper
          v-else
          :modules="[SwiperAutoplay, SwiperNavigation]"
          :speed="1000"
          :space-between="20"
          :loop="true" 
          :navigation="{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
          :slidesPerGroup="2" 
          :slidesPerGroupSkip="0"
          :breakpoints="{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 }
          }"
          class="category-slider py-4"
        >
          <SwiperSlide
            v-for="category in categories"
            :key="category.id"
            class="!h-auto"
          >
            <NuxtLink :to="`/shop?category=${category.slug}`" class="block h-full">
              <div class="h-full rounded-lg border bg-white border-gray-200 transition duration-300 ease-in-out hover:border-green-600 hover:shadow-md">
                <div class="py-10 px-3 flex flex-col items-center justify-between h-full gap-4">
                  <div class="w-24 h-24 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img v-if="category.icon" :src="category.icon" :alt="category.name" class="max-w-full max-h-full object-contain" />
                    <Icon v-else name="tabler:photo" class="text-gray-300 w-12 h-12" />
                  </div>
                  <div class="text-[14px] font-medium text-gray-500 text-center leading-tight min-h-[2.5rem] flex items-center justify-center">
                    {{ category.name }}
                  </div>
                </div>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="py-10 px-8 rounded-lg" style="background-image: url('/images/banner/grocery-banner.png'); background-repeat: no-repeat; background-size: cover; background-position: center center;">
            <div>
              <h3 class="font-bold text-2xl mb-1 text-gray-900">Fruits & Vegetables</h3>
              <p class="mb-4 text-gray-700">Get Upto <span class="font-bold">30%</span> Off</p>
              <NuxtLink to="/shop" class="btn bg-gray-900 text-white hover:bg-gray-800 border-0 inline-flex">Shop Now</NuxtLink>
            </div>
          </div>
          
          <div class="py-10 px-8 rounded-lg" style="background-image: url('/images/banner/grocery-banner-2.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center center;">
            <div>
              <h3 class="font-bold text-2xl mb-1 text-gray-900">Freshly Baked Buns</h3>
              <p class="mb-4 text-gray-700">Get Upto <span class="font-bold">25%</span> Off</p>
              <NuxtLink to="/shop" class="btn bg-gray-900 text-white hover:bg-gray-800 border-0 inline-flex">Shop Now</NuxtLink>
            </div>
          </div>
        </div>
        </div>
    </section>

    <section class="lg:my-14 my-8">
      <div class="container">
        <div class="flex flex-wrap">
          <div class="w-full mb-6">
            <h2 class="text-lg font-bold text-gray-800">New Products</h2>
          </div>
        </div>

        <div v-if="loading" class="grid gap-4 grid-cols-2 md:grid-cols-2 lg:gap-4 xl:grid-cols-5">
          <div
            v-for="n in 5"
            :key="n"
            class="rounded-xl border border-gray-200 bg-white animate-pulse p-3"
          >
            <div class="rounded-lg bg-gray-200 mb-3" style="height: 200px;"></div>
            <div class="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-4/5 mb-1"></div>
            <div class="h-4 bg-gray-200 rounded w-3/5 mb-4"></div>
            <div class="flex justify-between items-center">
              <div>
                <div class="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                <div class="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div class="h-8 bg-gray-200 rounded-lg w-16"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid gap-4 grid-cols-2 md:grid-cols-2 lg:gap-4 xl:grid-cols-5">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

      </div>
    </section>

    <section class="lg:my-14 my-8">
			<div class="container">
				<div class="flex flex-wrap gap-y-6">
					<div class="md:w-1/2 lg:w-1/4 px-3">
						<div class="flex flex-col gap-4">
							<div class="inline-block"><img src="../assets/images/icons/clock.svg" alt="" /></div>
							<div class="flex flex-col gap-2">
								<h3 class="text-md">10 minute grocery now</h3>
								<p>Get your order delivered to your doorstep at the earliest from FreshCart pickup
									stores near you.</p>
							</div>
						</div>
					</div>
					<div class="md:w-1/2 lg:w-1/4 px-3">
						<div class="flex flex-col gap-4">
							<div class="inline-block"><img src="../assets/images/icons/gift.svg" alt="" /></div>
							<div class="flex flex-col gap-2">
								<h3 class="text-md">Best Prices & Offers</h3>
								<p>Cheaper prices than your local supermarket, great cashback offers to top it off. Get
									best pricess & offers.</p>
							</div>
						</div>
					</div>
					<div class="md:w-1/2 lg:w-1/4 px-3">
						<div class="flex flex-col gap-4">
							<div class="inline-block"><img src="../assets/images/icons/package.svg" alt="" /></div>
							<div class="flex flex-col gap-2">
								<h3 class="text-md">Wide Assortment</h3>
								<p>Choose from 5000+ products across food, personal care, household, bakery, veg and
									non-veg & other categories.</p>
							</div>
						</div>
					</div>
					<div class="md:w-1/2 lg:w-1/4 px-3">
						<div class="flex flex-col gap-4">
							<div class="inline-block"><img src="../assets/images/icons/refresh-cw.svg" alt="" /></div>
							<div class="flex flex-col gap-2">
								<h3 class="text-md">Easy Returns</h3>
								<p>
									Not satisfied with a product? Return it at the doorstep & get a refund within hours.
									No questions asked
									<a href="#!" class="text-green-600">policy</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' 
import ProductCard from '~/components/home/ProductCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useCategoryStore } from '~/stores/category'
import { useProductStore } from '~/stores/product'

const categories = ref([])
const categoryStore = useCategoryStore()
const featuredProducts = ref([])
const productStore = useProductStore()
const loading = ref(true)

const skeletonCount = computed(() => {
  if (import.meta.client) {
    const w = window.innerWidth
    if (w >= 1024) return 6
    if (w >= 768) return 4
    if (w >= 480) return 3
    return 2
  }
  return 6
})

const SwiperAutoplay = Autoplay
const SwiperEffectFade = EffectFade
const SwiperPagination = Pagination
const SwiperNavigation = Navigation

useHead({
  script: [
    { src: '/libs/bootstrap/dist/js/bootstrap.bundle.min.js', body: true },
    { src: '/js/vendors/zoom.js', body: true },
    { src: '/libs/simplebar/dist/simplebar.min.js', body: true },
    { src: '/js/theme.min.js', body: true },
    { src: '/js/vendors/countdown.js', body: true },
    { src: '/libs/tiny-slider/dist/min/tiny-slider.js', body: true },
    { src: '/js/vendors/tns-slider.js', body: true },
  ],
})

onMounted(async () => {
  loading.value = true

  const catRes = await categoryStore.fetchCategoriesHome()
  if (catRes.success) {
    categories.value = categoryStore.categories 
  } else {
    console.error("Failed to load categories:", catRes.message)
  }

  const prodRes = await productStore.fetchProductsHome()
  if (prodRes.success) {
    featuredProducts.value = productStore.products || prodRes.data?.data || prodRes.data
  } else {
    console.error("Failed to load product:", prodRes.message)
  }

  loading.value = false
})
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>