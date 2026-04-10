<template>
  <main>
    <div class="py-6 md:p-6 lg:p-10">
      
      <div class="mb-8">
        <h2 class="mb-1 text-2xl font-bold text-gray-800">Admin Profile</h2>
        <p class="text-gray-500 text-sm">Manage your administrative account settings and personal information.</p>
      </div>

      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div class="p-6 border-b border-gray-100 bg-gray-50/50">
              <h5 class="mb-0 text-base font-bold text-gray-800">Account Details</h5>
            </div>
            
            <div class="p-6 md:p-8">
              <form @submit.prevent="handleProfileSubmit">
                <div class="mb-8 flex flex-col sm:flex-row items-center gap-6 p-6 border border-green-100 rounded-2xl bg-green-50/30">
                  <div class="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white flex-shrink-0">
                    <img v-if="photoPreview || formData.photo" :src="photoPreview || formData.photo" class="w-full h-full object-cover" alt="Profile" />
                    <div v-else class="w-full h-full flex items-center justify-center text-green-200 bg-green-50">
                      <Icon name="tabler:user" size="48" />
                    </div>
                  </div>
                  <div class="text-center sm:text-left">
                    <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" class="hidden" />
                    <button type="button" @click="$refs.fileInput.click()" class="btn btn-sm bg-green-600 text-white hover:bg-green-700 transition-all px-4 py-2 rounded-lg font-bold shadow-sm shadow-green-200">
                      <Icon name="tabler:camera" size="16" class="mr-2" />
                      Change Photo
                    </button>
                    <p class="text-[11px] text-gray-400 mt-3 font-medium uppercase tracking-wider">JPG, JPEG or PNG. Max size 2MB.</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input v-model="formData.name" type="text"
                        class="border border-gray-300 text-gray-900 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-600 block p-3 w-full text-sm transition-all"
                        placeholder="Enter your name" required />
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input v-model="formData.email" type="email"
                        class="border border-gray-200 text-gray-400 bg-gray-50 rounded-xl block p-3 w-full text-sm cursor-not-allowed"
                        placeholder="example@gmail.com" disabled />
                    <small class="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Email cannot be changed</small>
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input v-model="formData.phone" type="text"
                      class="border border-gray-300 text-gray-900 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500/20 focus:border-green-600 block p-3 w-full text-sm transition-all"
                      placeholder="Phone number" required />
                </div>

                <!-- Administrative Address — same pattern as account setting -->
                <div class="mb-8 p-5 border border-gray-200 rounded-lg bg-gray-50">
                  <div class="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <label class="block text-sm font-bold text-gray-700 m-0">Administrative Address</label>
                    <div class="flex items-center gap-2">
                      <button type="button" @click="openMapModal"
                          class="btn btn-sm bg-gray-900 hover:bg-black/90 text-white border-none py-1.5 px-3 rounded inline-flex items-center gap-1 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                        </svg>
                        Pick from Map
                      </button>
                      <button type="button" @click="getCurrentLocation" :disabled="isLocating"
                          class="btn btn-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-1.5 px-3 rounded inline-flex items-center gap-1 transition disabled:opacity-50">
                        <svg v-if="isLocating" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                        {{ isLocating ? 'Detecting...' : 'Current Location' }}
                      </button>
                    </div>
                  </div>

                  <textarea v-model="formData.address" rows="3" required
                      class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full text-sm mb-3 shadow-sm"
                      placeholder="Enter your full address (e.g. Jl. Sudirman No 1, Jakarta)"></textarea>

                  <div class="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                    <div class="text-xs flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          :class="formData.lat ? 'text-green-600' : 'text-gray-400'">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                      </svg>
                      <span v-if="formData.lat && formData.lng" class="text-green-700 font-semibold">
                        Lat: {{ Number(formData.lat).toFixed(5) }}, Lng: {{ Number(formData.lng).toFixed(5) }}
                      </span>
                      <span v-else class="text-gray-500">Coordinates not set</span>
                    </div>

                    <button type="button" @click="syncAddressToMap" :disabled="isGeocoding || !formData.address"
                        class="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 text-xs py-1.5 px-3 rounded inline-flex items-center gap-1 transition disabled:opacity-50">
                      <span v-if="isGeocoding" class="animate-spin h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                      <span>Find Coordinates</span>
                    </button>
                  </div>
                </div>
                
                <div class="pt-4 border-t border-gray-100 flex justify-end">
                  <button :disabled="authStore.loading" type="submit"
                      class="btn inline-flex items-center justify-center gap-2 bg-green-600 text-white border-none disabled:opacity-50 hover:bg-green-700 transition-all px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-200">
                    <Icon v-if="authStore.loading" name="tabler:loader-2" class="animate-spin" size="18" />
                    <span>{{ authStore.loading ? 'Saving Changes...' : 'Update Profile' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
            <div class="p-6 border-b border-gray-100 bg-gray-50/50">
              <h5 class="mb-0 text-base font-bold text-gray-800">Security</h5>
            </div>
            <div class="p-6">
              <p class="text-xs text-gray-500 mb-5">Update your password to keep your account secure.</p>
              <form @submit.prevent="handleChangePassword">
                <div class="mb-4">
                  <label class="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.current_password"
                      :type="showPassword.current ? 'text' : 'password'"
                      class="border border-gray-300 text-gray-900 rounded-xl shadow-sm block p-3 pr-10 w-full text-sm transition-all"
                      placeholder="Enter current password"
                      required />
                    <button type="button" @click="showPassword.current = !showPassword.current"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                      <Icon :name="showPassword.current ? 'tabler:eye-off' : 'tabler:eye'" size="16" />
                    </button>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.new_password"
                      :type="showPassword.new ? 'text' : 'password'"
                      class="border border-gray-300 text-gray-900 rounded-xl shadow-sm block p-3 pr-10 w-full text-sm transition-all"
                      placeholder="Enter new password"
                      required />
                    <button type="button" @click="showPassword.new = !showPassword.new"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                      <Icon :name="showPassword.new ? 'tabler:eye-off' : 'tabler:eye'" size="16" />
                    </button>
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.confirm_password"
                      :type="showPassword.confirm ? 'text' : 'password'"
                      class="border border-gray-300 text-gray-900 rounded-xl shadow-sm block p-3 pr-10 w-full text-sm transition-all"
                      :class="passwordMismatch ? 'border-red-400' : ''"
                      placeholder="Confirm new password"
                      required />
                    <button type="button" @click="showPassword.confirm = !showPassword.confirm"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                      <Icon :name="showPassword.confirm ? 'tabler:eye-off' : 'tabler:eye'" size="16" />
                    </button>
                  </div>
                  <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1.5 font-medium">Passwords do not match</p>
                </div>

                <button :disabled="authStore.loading || passwordMismatch" type="submit"
                    class="w-full btn inline-flex items-center justify-center gap-2 bg-gray-900 text-white border-none disabled:opacity-50 hover:bg-black transition-all px-4 py-3 rounded-xl font-bold text-sm">
                  <Icon v-if="authStore.loading" name="tabler:loader-2" class="animate-spin" size="16" />
                  <Icon v-else name="tabler:lock" size="16" />
                  <span>{{ authStore.loading ? 'Updating...' : 'Update Password' }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Map Modal — same pattern as account setting -->
    <Teleport to="body">
      <div v-if="showMapModal" class="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
            <h3 class="text-lg font-bold text-gray-800 m-0">Pin Your Location</h3>
            <button @click="closeMapModal" class="text-gray-400 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="p-4 border-b bg-white flex flex-col gap-2">
            <p class="text-sm font-semibold text-gray-700">Drag the marker or click on the map to select your address.</p>
            <div class="flex gap-2">
              <input v-model="tempLocation.address" type="text" readonly
                  class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                  placeholder="Address will appear here..." />
            </div>
          </div>

          <div id="admin-location-map" class="w-full h-[400px] z-0"></div>

          <div class="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50">
            <button @click="closeMapModal" class="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Cancel</button>
            <button @click="confirmLocation" class="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm">Confirm Location</button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useProductStore } from '~/stores/product'
import { useSwal } from '~/composables/useSwal'

useHead({
  link: [
    { rel: 'stylesheet', href: '/libs/leaflet/dist/leaflet.css' }
  ],
  script: [
    { src: '/libs/leaflet/dist/leaflet.js', body: true },
    { src: '/libs/simplebar/dist/simplebar.min.js', body: true },
    { src: '/js/theme.min.js', body: true },
  ],
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['admin'],
})

const authStore = useAuthStore()
const imageStore = useProductStore()
const swal = useSwal()

const fileInput = ref(null)
const isLocating = ref(false)
const isGeocoding = ref(false)
const selectedFile = ref(null)
const photoPreview = ref(null)

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  lat: null,
  lng: null,
  photo: ''
})

// Password form
const passwordForm = ref({
  current_password: '',
  new_password: '',
  confirm_password: ''
})

const showPassword = ref({
  current: false,
  new: false,
  confirm: false
})

const passwordMismatch = computed(() => {
  return passwordForm.value.confirm_password.length > 0 &&
    passwordForm.value.new_password !== passwordForm.value.confirm_password
})

const handleChangePassword = async () => {
  if (passwordMismatch.value) return
  try {
    await authStore.changePassword({
      current_password: passwordForm.value.current_password,
      new_password: passwordForm.value.new_password,
      confirm_password: passwordForm.value.confirm_password
    })
    passwordForm.value = { current_password: '', new_password: '', confirm_password: '' }
  } catch (error) {
    console.error('Failed to update password:', error)
  }
}

// Map state
const showMapModal = ref(false)
const mapInstance = ref(null)
const mapMarker = ref(null)
const tempLocation = ref({ lat: -6.200000, lng: 106.816666, address: '' })

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.includes('image/')) return swal.toastError('File must be an image')
  if (file.size > 2 * 1024 * 1024) return swal.toastError('Max size 2MB')

  selectedFile.value = file
  photoPreview.value = URL.createObjectURL(file)
}

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`)
    const data = await res.json()
    return data?.display_name || ''
  } catch {
    return ''
  }
}

const geocodeAddress = async (addressText) => {
  if (!addressText) return false
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressText)}&accept-language=id`)
    const data = await res.json()
    if (data && data.length > 0) {
      formData.value.lat = data[0].lat
      formData.value.lng = data[0].lon
      return true
    }
    return false
  } catch {
    return false
  }
}

const getCurrentLocation = () => {
  if (!import.meta.client || !('geolocation' in navigator)) {
    swal.toastError('Geolocation is not supported by your browser')
    return
  }

  isLocating.value = true
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      formData.value.lat = lat
      formData.value.lng = lng

      const address = await reverseGeocode(lat, lng)
      isLocating.value = false

      if (address) {
        formData.value.address = address
        swal.toastSuccess('Location pinned & address auto-filled!')
      } else {
        swal.toastSuccess('Location pinned! (Address name not found)')
      }
    },
    () => {
      isLocating.value = false
      swal.toastError('Failed to get device location. Please allow GPS access.')
    },
    { timeout: 10000, enableHighAccuracy: true }
  )
}

const syncAddressToMap = async () => {
  if (!formData.value.address) {
    swal.toastError('Please enter an address first')
    return
  }

  isGeocoding.value = true
  const success = await geocodeAddress(formData.value.address)
  isGeocoding.value = false

  if (success) {
    swal.toastSuccess('Coordinates matched with your address!')
  } else {
    swal.toastError('Could not find coordinates for this address. Try being more specific.')
  }
}

const openMapModal = () => {
  showMapModal.value = true

  tempLocation.value.lat = formData.value.lat ? parseFloat(formData.value.lat) : -6.200000
  tempLocation.value.lng = formData.value.lng ? parseFloat(formData.value.lng) : 106.816666
  tempLocation.value.address = formData.value.address || 'Loading address...'

  nextTick(() => {
    if (mapInstance.value) {
      mapInstance.value.remove()
    }

    mapInstance.value = window.L.map('admin-location-map').setView([tempLocation.value.lat, tempLocation.value.lng], 16)

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(mapInstance.value)

    mapMarker.value = window.L.marker([tempLocation.value.lat, tempLocation.value.lng], {
      draggable: true
    }).addTo(mapInstance.value)

    if (!formData.value.address) {
      updateMarkerData(tempLocation.value.lat, tempLocation.value.lng)
    } else {
      tempLocation.value.address = formData.value.address
    }

    mapInstance.value.on('click', (e) => {
      updateMarkerData(e.latlng.lat, e.latlng.lng)
    })

    mapMarker.value.on('dragend', () => {
      const position = mapMarker.value.getLatLng()
      updateMarkerData(position.lat, position.lng)
    })
  })
}

const updateMarkerData = async (lat, lng) => {
  mapMarker.value.setLatLng([lat, lng])
  mapInstance.value.panTo([lat, lng])
  tempLocation.value.lat = lat
  tempLocation.value.lng = lng
  tempLocation.value.address = 'Searching address...'

  const addressName = await reverseGeocode(lat, lng)
  tempLocation.value.address = addressName || 'Address not found'
}

const closeMapModal = () => {
  showMapModal.value = false
}

const confirmLocation = () => {
  formData.value.lat = tempLocation.value.lat
  formData.value.lng = tempLocation.value.lng
  formData.value.address = tempLocation.value.address
  closeMapModal()
  swal.toastSuccess('Location updated from map!')
}

const handleProfileSubmit = async () => {
  try {
    if ((!formData.value.lat || !formData.value.lng) && formData.value.address) {
      await geocodeAddress(formData.value.address)
    }

    let finalPhotoUrl = formData.value.photo

    if (selectedFile.value) {
      const uploadRes = await imageStore.uploadImageAuth(selectedFile.value)
      if (!uploadRes.success) throw new Error(uploadRes.message)
      finalPhotoUrl = uploadRes.data?.data?.image_url || ''
    }

    const userData = {
      name: String(formData.value.name),
      email: String(formData.value.email),
      phone: String(formData.value.phone),
      address: String(formData.value.address),
      lat: formData.value.lat ? String(formData.value.lat) : '',
      lng: formData.value.lng ? String(formData.value.lng) : '',
      photo: String(finalPhotoUrl)
    }

    await authStore.updateProfile(userData)
    swal.toastSuccess('Profile updated!')
    selectedFile.value = null
  } catch (error) {
    swal.toastError(error.message || 'Update failed')
  }
}

onMounted(async () => {
  await authStore.getProfile()
  if (authStore.user) {
    formData.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || '',
      address: authStore.user.address || '',
      lat: authStore.user.lat || null,
      lng: authStore.user.lng || null,
      photo: authStore.user.photo || ''
    }
  }
})
</script>

<style scoped>
input:focus,
textarea:focus,
select:focus {
  outline: none !important;
  border-color: #16a34a !important;
  box-shadow: 0 0 0 0.25rem rgba(22, 163, 74, 0.15) !important;
}

:deep(.leaflet-container) {
  z-index: 10 !important;
}
</style>