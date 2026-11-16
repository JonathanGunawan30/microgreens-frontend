<template>
  <div ref="containerRef" class="relative w-full">
    <form @submit.prevent="submitSearch">
      <div class="relative">
        <label :for="inputId" class="sr-only">Search products</label>
        <input
          :id="inputId"
          v-model="query"
          class="border border-gray-300 text-gray-900 rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:ring-green-600 focus:ring-0 focus:border-green-600 block p-2 px-3 pr-10 disabled:opacity-50 disabled:pointer-events-none w-full text-base"
          type="search"
          autocomplete="off"
          placeholder="Search for products (Press Enter to search or clear)"
          @focus="handleFocus"
          @keydown.down.prevent="moveSelection(1)"
          @keydown.up.prevent="moveSelection(-1)"
          @keydown.enter="handleEnter"
          @keydown.esc="closeDropdown"
        >
        <button
          class="absolute right-0 top-0 p-3 text-gray-500 hover:text-green-600"
          type="submit"
          aria-label="Search"
        >
          <Icon name="tabler:search" size="16" />
        </button>
      </div>
    </form>

    <div
      v-if="isOpen && (loading || suggestions.length > 0)"
      class="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[1100] overflow-hidden"
    >
      <div v-if="loading && suggestions.length === 0" class="px-4 py-3 text-sm text-gray-500">
        Searching...
      </div>

      <ul v-else class="divide-y divide-gray-100 max-h-80 overflow-y-auto m-0 p-0 list-none">
        <li
          v-for="(item, idx) in suggestions"
          :key="item.id"
          class="cursor-pointer transition-colors"
          :class="idx === activeIndex ? 'bg-green-50' : 'hover:bg-gray-50'"
          @mousedown.prevent="selectSuggestion(item)"
          @mouseenter="activeIndex = idx"
        >
          <div class="flex items-center gap-3 px-3 py-2.5">
            <img
              :src="item.image || '/images/products/product-img-1.jpg'"
              :alt="item.name"
              class="w-10 h-10 object-contain rounded border border-gray-100 bg-white shrink-0"
            >
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900 truncate mb-0">
                {{ item.name }}
              </p>
              <p v-if="item.category_name" class="text-xs text-gray-500 truncate mb-0">
                {{ item.category_name }}
              </p>
            </div>
            <span class="text-xs font-semibold text-green-600 shrink-0">
              Rp {{ formatPrice(item.sale_price) }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useDebounceFn, onClickOutside } from '@vueuse/core'
import { useProductStore } from '~/stores/product'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  inputId: {
    type: String,
    default: 'searchProducts',
  },
})

const emit = defineEmits(['update:modelValue', 'submit', 'select'])

const productStore = useProductStore()
const router = useRouter()

const containerRef = ref(null)
const query = ref(props.modelValue)
const suggestions = ref([])
const loading = ref(false)
const isOpen = ref(false)
const activeIndex = ref(-1)

let abortController = null

watch(
  () => props.modelValue,
  (val) => {
    if (val !== query.value) {
      query.value = val
    }
  }
)

const fetchSuggestions = useDebounceFn(async (val) => {
  const trimmed = (val || '').trim()
  if (trimmed.length < 2) {
    suggestions.value = []
    isOpen.value = false
    loading.value = false
    return
  }

  if (abortController) {
    abortController.abort()
  }
  abortController = new AbortController()

  loading.value = true
  isOpen.value = true

  try {
    const data = await productStore.fetchProductSuggestions(trimmed, 5, abortController.signal)
    suggestions.value = data
    activeIndex.value = -1
    isOpen.value = data.length > 0
  } catch (err) {
    if (err?.name !== 'AbortError') {
      suggestions.value = []
      isOpen.value = false
    }
  } finally {
    loading.value = false
  }
}, 250)

watch(query, (val) => {
  emit('update:modelValue', val)
  if ((val || '').trim().length < 2) {
    if (abortController) {
      abortController.abort()
    }
    suggestions.value = []
    isOpen.value = false
    activeIndex.value = -1
    return
  }
  fetchSuggestions(val)
})

const handleFocus = () => {
  if (suggestions.value.length > 0) {
    isOpen.value = true
  }
}

const closeDropdown = () => {
  isOpen.value = false
  activeIndex.value = -1
}

const moveSelection = (step) => {
  if (!isOpen.value || suggestions.value.length === 0) return
  const total = suggestions.value.length
  activeIndex.value = (activeIndex.value + step + total) % total
}

const handleEnter = (event) => {
  if (isOpen.value && activeIndex.value >= 0 && suggestions.value[activeIndex.value]) {
    event.preventDefault()
    selectSuggestion(suggestions.value[activeIndex.value])
  }
}

const selectSuggestion = (item) => {
  closeDropdown()
  emit('select', item)
  router.push(`/shop/${item.id}`)
}

const submitSearch = () => {
  closeDropdown()
  emit('submit', query.value)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price || 0)
}

onClickOutside(containerRef, closeDropdown)

onBeforeUnmount(() => {
  if (abortController) {
    abortController.abort()
  }
})
</script>
