<template>
  <Teleport to="body">
    <div class="qv-overlay" @click.self="$emit('close')">
      <div class="qv-dialog">

        <button class="qv-close" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div v-if="loading" class="qv-loading">
          <div class="qv-skeleton-left">
            <div class="sk-img"></div>
            <div class="sk-thumbs">
              <div class="sk-thumb" v-for="n in 3" :key="n"></div>
            </div>
          </div>
          <div class="qv-skeleton-right">
            <div class="sk-line w-1/4 h-3 mb-2"></div>
            <div class="sk-line w-3/4 h-7 mb-4"></div>
            <div class="sk-line w-1/3 h-5 mb-6"></div>
            <div class="sk-line w-full h-px mb-6"></div>
            <div class="flex gap-2 mb-6">
              <div class="sk-line w-16 h-9"></div>
              <div class="sk-line w-16 h-9"></div>
              <div class="sk-line w-16 h-9"></div>
            </div>
            <div class="sk-line w-1/3 h-10 mb-2"></div>
          </div>
        </div>

        <div v-else-if="detail" class="qv-content">

          <div class="qv-left">
            <div class="qv-main-img">
              <img :src="activeImage" :alt="detail.name" id="qv-product-image" />
            </div>
            <div v-if="allImages.length > 1" class="qv-thumbs">
              <button
                v-for="(img, i) in allImages"
                :key="i"
                class="qv-thumb"
                :class="{ active: activeImage === img }"
                @click="activeImage = img"
              >
                <img :src="img" :alt="`${detail.name} ${i+1}`" />
              </button>
            </div>
          </div>

          <div class="qv-right">
            <NuxtLink :to="`/shop?category=${detail.category_slug}`" class="qv-category">
              {{ detail.category_name }}
            </NuxtLink>

            <h2 class="qv-title">{{ detail.name }}</h2>

            <div class="qv-price-block">
              <span class="qv-price-sale">Rp {{ formatPrice(activeVariant?.sale_price ?? detail.sale_price) }}</span>
              <span v-if="hasDiscount" class="qv-price-original">Rp {{ formatPrice(activeVariant?.reguler_price ?? detail.reguler_price) }}</span>
              <span v-if="hasDiscount" class="qv-price-badge">{{ discountPct }}% Off</span>
            </div>

            <hr class="qv-divider" />

            <div v-if="detail.child && detail.child.length" class="qv-variants">
              <p class="qv-label">Select Variant</p>
              <div class="qv-variant-list">
                <button
                  v-for="child in detail.child"
                  :key="child.id"
                  class="qv-variant-btn"
                  :class="{ active: activeVariant?.id === child.id }"
                  @click="selectVariant(child)"
                >
                  {{ child.weight }}
                </button>
              </div>
            </div>

            <div class="qv-qty-row">
              <p class="qv-label">Quantity</p>
              <div class="qv-qty">
                <button @click="qty > 1 && qty--">−</button>
                <span>{{ qty }}</span>
                <button @click="qty < maxStock && qty++">+</button>
              </div>
              <span class="qv-stock">Stock: {{ maxStock }}</span>
            </div>

            <div class="qv-actions">
              <button class="qv-btn-cart" @click="addToCart" ref="addToCartBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Add to Cart
              </button>
              <NuxtLink :to="`/shop/${detail.id}`" class="qv-btn-detail">
                View Detail
              </NuxtLink>
            </div>

            <hr class="qv-divider" />

            <div class="qv-meta">
              <div class="qv-meta-row">
                <span class="qv-meta-label">Category</span>
                <span class="qv-meta-value">{{ detail.category_name }}</span>
              </div>
              <div class="qv-meta-row">
                <span class="qv-meta-label">Availability</span>
                <span class="qv-meta-value" :class="detail.stock > 0 ? 'text-green-600' : 'text-red-500'">
                  {{ detail.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                </span>
              </div>
              <div v-if="detail.description" class="qv-meta-row">
                <span class="qv-meta-label">Description</span>
                <span class="qv-meta-value qv-desc">{{ detail.description }}</span>
              </div>
            </div>

          </div>
        </div>

        <div v-else class="qv-error">
          <p>Failed to load product. Please try again.</p>
          <button @click="$emit('close')" class="qv-btn-cart mt-4">Close</button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { useSwal } from '~/composables/useSwal'

const props = defineProps({
  product: { type: Object, required: true }
})
const emit = defineEmits(['close'])

const productStore = useProductStore()
const cartStore    = useCartStore()
const authStore    = useAuthStore()
const router       = useRouter()
const swal         = useSwal()

const detail        = ref(null)
const loading       = ref(true)
const activeVariant = ref(null)
const activeImage   = ref('')
const qty           = ref(1)

const addToCartBtn = ref(null)

const allImages = computed(() => {
  if (!detail.value) return []
  const imgs = [detail.value.image].filter(Boolean)
  if (detail.value.child) {
    detail.value.child.forEach(c => { if (c.image && !imgs.includes(c.image)) imgs.push(c.image) })
  }
  return imgs
})

const maxStock = computed(() => activeVariant.value?.stock ?? detail.value?.stock ?? 0)

const hasDiscount = computed(() => {
  const reg = Number(activeVariant.value?.reguler_price ?? detail.value?.reguler_price) || 0
  const sal = Number(activeVariant.value?.sale_price    ?? detail.value?.sale_price)    || 0
  return reg > 0 && reg > sal
})

const discountPct = computed(() => {
  const reg = Number(activeVariant.value?.reguler_price ?? detail.value?.reguler_price) || 0
  const sal = Number(activeVariant.value?.sale_price    ?? detail.value?.sale_price)    || 0
  return hasDiscount.value ? Math.round(((reg - sal) / reg) * 100) : 0
})

const formatPrice = (p) => new Intl.NumberFormat('id-ID').format(Number(p) || 0)

const selectVariant = (child) => {
  activeVariant.value = child
  if (child.image) activeImage.value = child.image
  qty.value = 1
}

const flyToCartAnimation = () => {
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

const addToCart = async () => {
  if (!authStore.token) {
    swal.toastError('Please sign in first.')
    router.push('/auth/signin')
    emit('close')
    return
  }

  if (detail.value.child && detail.value.child.length > 0 && !activeVariant.value) {
      swal.toastError('Please select a variant first')
      return
  }

  if (maxStock.value <= 0) {
      swal.toastError('Product out of stock')
      return
  }

  const productId = activeVariant.value?.id ?? detail.value?.id
  try {
    const res = await cartStore.addToCart(productId, qty.value)

    if (res.success){
      flyToCartAnimation()
      swal.toastSuccess('Success added to cart!')
    } else {
      swal.toastError(res.message || 'Failed to add to cart.')
    }
  } catch (e) {
    console.error('Error adding to cart:', e)
    swal.toastError('Failed to add to cart.')
  }
}

onMounted(async () => {
  loading.value = true
  const res = await productStore.fetchProductDetailHome(props.product.id)
  if (res.success) {
    detail.value = res.data.data || res.data
    activeImage.value = detail.value.image || ''
    
    if (detail.value.child?.length > 0) {
      selectVariant(detail.value.child[0])
    }
  }
  loading.value = false
})
</script>

<style scoped>
.qv-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

.qv-dialog {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  padding: 2rem;
  animation: slideUp 0.25s ease;
}
@keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

.qv-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10;
}
.qv-close:hover { background: #e0e0e0; }

.qv-left { flex: 0 0 45%; min-width: 260px; }

.qv-main-img {
  border-radius: 12px;
  overflow: hidden;
  background: #f8f8f6;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.qv-main-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qv-thumbs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.qv-thumb {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e8e8e8;
  cursor: pointer;
  padding: 0;
  background: #f8f8f6;
  transition: border-color 0.2s;
}
.qv-thumb.active { border-color: #0aad0a; }
.qv-thumb img { width: 100%; height: 100%; object-fit: cover; }

.qv-right { flex: 1; min-width: 260px; }

.qv-category {
  font-size: 0.8rem;
  font-weight: 600;
  color: #0aad0a;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 8px;
}

.qv-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin: 0 0 16px;
}

.qv-price-block {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.qv-price-sale {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a1a;
}
.qv-price-original {
  font-size: 1rem;
  color: #b0b0b0;
  text-decoration: line-through;
}
.qv-price-badge {
  background: #fff0f0;
  color: #e02020;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
}

.qv-divider { border: none; border-top: 1px solid #f0f0f0; margin: 20px 0; }

.qv-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #9e9e9e;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin: 0 0 8px;
}

.qv-variants { margin-bottom: 20px; }
.qv-variant-list { display: flex; gap: 8px; flex-wrap: wrap; }
.qv-variant-btn {
  border: 1.5px solid #e0e0e0;
  background: #fff;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.qv-variant-btn:hover { border-color: #0aad0a; color: #0aad0a; }
.qv-variant-btn.active { border-color: #0aad0a; background: #f0faf0; color: #0aad0a; font-weight: 700; }

.qv-qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
.qv-qty {
  display: flex;
  align-items: center;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
.qv-qty button {
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.qv-qty button:hover { background: #e8e8e8; }
.qv-qty span { width: 44px; text-align: center; font-weight: 600; font-size: 0.95rem; }
.qv-stock { font-size: 0.8rem; color: #9e9e9e; }

.qv-actions { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.qv-btn-cart {
  background: #0aad0a;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 11px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 3px 10px rgba(10,173,10,0.3);
}
.qv-btn-cart:hover:not(:disabled) { background: #099309; }
.qv-btn-cart:disabled { opacity: 0.6; cursor: not-allowed; }

.qv-btn-detail {
  border: 1.5px solid #e0e0e0;
  background: #fff;
  color: #444;
  border-radius: 10px;
  padding: 11px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;
}
.qv-btn-detail:hover { border-color: #1a1a1a; color: #1a1a1a; }

.qv-meta { display: flex; flex-direction: column; gap: 10px; }
.qv-meta-row { display: flex; gap: 16px; }
.qv-meta-label { font-size: 0.82rem; color: #9e9e9e; min-width: 90px; }
.qv-meta-value { font-size: 0.82rem; color: #444; font-weight: 500; }
.qv-desc { line-height: 1.6; color: #666; font-weight: 400; font-size: 0.8rem; }

.qv-content,
.qv-loading {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  max-height: calc(90vh - 4rem);
  overflow-y: auto;             
  scrollbar-width: none;        
}
.qv-content::-webkit-scrollbar,
.qv-loading::-webkit-scrollbar {
  display: none;
}
.qv-skeleton-left { flex: 0 0 45%; }
.qv-skeleton-right { flex: 1; display: flex; flex-direction: column; }
.sk-img { height: 320px; border-radius: 12px; background: #f0f0f0; margin-bottom: 1rem; animation: shimmer 1.2s infinite; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; }
.sk-thumbs { display: flex; gap: 10px; }
.sk-thumb { width: 72px; height: 72px; border-radius: 8px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.2s infinite; }
.sk-line { border-radius: 6px; background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.2s infinite; }

.qv-error { text-align: center; padding: 3rem; color: #666; }

@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

@media (max-width: 640px) {
  .qv-dialog {
    padding: 1.25rem;
    border-radius: 16px;       
    margin: 1rem;              
    width: calc(100% - 2rem);  
    max-height: 85vh;
  }
  .qv-content,
  .qv-loading {
    max-height: calc(85vh - 2.5rem);
  }
  .qv-left { flex: 0 0 100%; }
  .qv-main-img { height: 220px; }
  .qv-title { font-size: 1.3rem; }
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