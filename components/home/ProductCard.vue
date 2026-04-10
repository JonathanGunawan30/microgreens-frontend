<template>
  <div class="col">
    <div class="card-product card h-100">
      <div class="card-body p-3">

        <div class="img-wrapper position-relative">

          <div v-if="hasDiscount" class="badge-stack">
            <span class="badge-sale">Sale</span>
            <span class="badge-discount">{{ discountPercentage }}% OFF</span>
          </div>

          <NuxtLink :to="`/shop/${product.id}`" class="d-block w-100 h-100">
            <img
              :src="product.image || '/images/placeholder.jpg'"
              :alt="product.name"
              class="product-img"
              :class="{ 'img-loaded': imageLoaded }"
              @load="imageLoaded = true"
            >
            <div v-if="!imageLoaded" class="img-placeholder"></div>
          </NuxtLink>

          <div class="quick-view-overlay">
            <button class="btn-quick-view" @click="showQuickView">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="15" height="15" fill="currentColor">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.19 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
              <span>Quick View</span>
            </button>
          </div>
        </div>

        <div class="product-info mt-3">

          <p class="product-category">{{ product.category_name }}</p>

          <h2 class="product-name">
            <NuxtLink :to="`/shop/${product.id}`" class="text-decoration-none text-dark">
              {{ product.name }}
            </NuxtLink>
          </h2>

          <div class="price-row">
            <div class="price-group">
              <span class="price-sale">Rp {{ formatPrice(product.sale_price) }}</span>
              <span v-if="hasDiscount" class="price-original">Rp {{ formatPrice(product.reguler_price) }}</span>
            </div>
            
            <button class="btn-add" @click="showQuickView">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add
            </button>
          </div>

        </div>
      </div>
    </div>

    <QuickView v-if="showQuickViewModal" :product="product" @close="showQuickViewModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QuickView from '../modals/QuickView.vue'

const imageLoaded = ref(false)

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      reguler_price: 0,
      sale_price: 0,
      image: '',
      category_name: '',
    })
  }
})

const showQuickViewModal = ref(false)

const regulerPrice = computed(() => Number(props.product.reguler_price) || 0)
const salePrice    = computed(() => Number(props.product.sale_price)    || 0)

const hasDiscount = computed(() => regulerPrice.value > 0 && regulerPrice.value > salePrice.value)

const discountPercentage = computed(() =>
  hasDiscount.value
    ? Math.round(((regulerPrice.value - salePrice.value) / regulerPrice.value) * 100)
    : 0
)

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID').format(Number(price) || 0)

const showQuickView = () => { 
    showQuickViewModal.value = true 
}

</script>

<style scoped>
.card-product {
  border: 1.5px solid #e8e8e8;
  border-radius: 8px;
  transition: border-color 0.25s ease;
  overflow: hidden;
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
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
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

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>