<template>
    <main>
        <section>
          <div class="container">
            <div class="grid grid-cols-12">
                
                <div class="col-span-12">
                    <div class="flex justify-between items-center md:hidden py-4">
                        <h3 class="text-md mb-0">Account Setting</h3>
                        <button
                            class="btn inline-flex items-center gap-x-2 bg-transparent text-gray-600 border-gray-300 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 md:hidden btn-sm ms-3"
                            type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAccount"
                            aria-controls="offcanvasAccount">
                            <Icon name="tabler:menu-2" size="24" />
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-2 md:col-span-4 col-span-12 border-r hidden md:block">
                    <div class="pt-10 md:pr-10">
                        <ul class="nav flex-col nav-pills nav-pills-dark">
                            <li class="nav-item">
                                <NuxtLink class="nav-link gap-2" to="/account">
                                    <Icon name="tabler:shopping-bag" size="18" />
                                    Your Orders
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link gap-2 justify-between" to="/account/notifications">
                                    <div class="flex items-center gap-2">
                                    <Icon name="tabler:bell" size="18" class="icon icon-tabler icons-tabler-outline icon-tabler-bell" />
                                    Notifications
                                    </div>
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link active gap-2" aria-current="page" to="/account/setting">
                                    <Icon name="tabler:settings" size="18" />
                                    Settings
                                </NuxtLink>
                            </li>
                            <li class="nav-item"><hr class="pt-3 mt-5" ></li>
                            <li class="nav-item">
                                <button type="button" class="nav-link gap-2" @click="handleLogout">
                                    <Icon name="tabler:logout" size="18" />
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="lg:col-span-10 md:col-span-8 col-span-12">
                    <div class="py-6 md:p-6 lg:p-10">
                        
                        <div class="mb-6">
                            <h2 class="mb-0 text-lg">Account Setting</h2>
                        </div>
                        
                        <div>
                            <h5 class="mb-4 text-gray-800 font-bold">Account details</h5>
                            <div class="grid grid-cols-12">
                                <div class="col-span-12 lg:col-span-8">
                                    <form @submit.prevent="handleProfileSubmit">
                                        
                                        <div class="mb-6 flex items-center gap-5 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            <div class="relative w-20 h-20 rounded-full overflow-hidden border-2 border-green-600 bg-white flex-shrink-0">
                                                <img v-if="photoPreview || formData.photo" :src="photoPreview || formData.photo" class="w-full h-full object-cover" alt="Profile" >
                                                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Icon name="tabler:user" size="32" />
                                                </div>
                                            </div>
                                            <div>
                                                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" >
                                                <button type="button" class="btn btn-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition" @click="$refs.fileInput.click()">
                                                    Change Photo
                                                </button>
                                                <p class="text-xs text-gray-500 mt-2">JPG, JPEG or PNG. Max size of 2MB.</p>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label class="inline-block text-gray-800 font-medium mb-2">Name</label>
                                            <input
v-model="formData.name" type="text"
                                                class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full text-base"
                                                placeholder="Enter your name" required >
                                        </div>
                                        <div class="mb-3">
                                            <label class="inline-block text-gray-800 font-medium mb-2">Email</label>
                                            <input
v-model="formData.email" type="email"
                                                class="border border-gray-300 text-gray-900 bg-gray-50 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full text-base"
                                                placeholder="example@gmail.com" disabled >
                                                <small class="text-gray-500">Email cannot be changed.</small>
                                        </div>
                                        <div class="mb-5">
                                            <label class="inline-block text-gray-800 font-medium mb-2">Phone</label>
                                            <input
v-model="formData.phone" type="text"
                                                class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full text-base"
                                                placeholder="Phone number" required >
                                        </div>

                                        <div class="mb-5 p-5 border border-gray-200 rounded-lg bg-gray-50">
                                            <div class="flex justify-between items-center mb-3 flex-wrap gap-2">
                                                <label class="inline-block text-gray-800 font-bold m-0">Delivery Address</label>
                                                <div class="flex items-center gap-2">
                                                    <button type="button" class="btn btn-sm bg-gray-900 hover:bg-black/90 text-white border-none py-1.5 px-3 rounded inline-flex items-center gap-1 transition" @click="openMapModal">
                                                        <Icon name="tabler:map-pin" size="16" />
                                                        Pick from Map
                                                    </button>
                                                    <button type="button" :disabled="isLocating" class="btn btn-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-1.5 px-3 rounded inline-flex items-center gap-1 transition disabled:opacity-50" @click="getCurrentLocation">
                                                        <Icon name="tabler:loader-2" size="16" class="animate-spin" v-if="isLocating" />
                                                        <Icon v-else name="tabler:location" size="16" />
                                                        {{ isLocating ? 'Detecting...' : 'Current Location' }}
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <textarea
v-model="formData.address" rows="3" required
                                                class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 w-full text-base mb-3 shadow-sm"
                                                placeholder="Enter your full address (e.g. Jl. Sudirman No 1, Jakarta)"/>
                                            
                                            <div class="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                                                <div class="text-xs flex items-center gap-1.5">
                                                    <Icon name="tabler:map-pin" size="16" :class="formData.lat ? 'text-green-600' : 'text-gray-400'" />
                                                    <span v-if="formData.lat && formData.lng" class="text-green-700 font-semibold">
                                                        Lat: {{ Number(formData.lat).toFixed(5) }}, Lng: {{ Number(formData.lng).toFixed(5) }}
                                                    </span>
                                                    <span v-else class="text-gray-500">Coordinates not set</span>
                                                </div>
                                                
                                                <button type="button" :disabled="isGeocoding || !formData.address" class="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 text-xs py-1.5 px-3 rounded inline-flex items-center gap-1 transition disabled:opacity-50" @click="syncAddressToMap">
                                                    <span v-if="isGeocoding" class="animate-spin h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full"/>
                                                    <span>Find Coordinates</span>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div class="mb-3 mt-6">
                                            <button
:disabled="authStore.loading" type="submit"
                                                class="btn inline-flex items-center justify-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 hover:bg-green-700 transition px-6">
                                                <span v-if="authStore.loading">Saving...</span>
                                                <span v-else>Save Details</span>
                                            </button>
                                        </div>
                                    </form>

                                    <hr class="my-10" >

                                    <div class="mb-6">
                                        <h5 class="mb-4 text-gray-800 font-bold">Security</h5>
                                        <p class="text-sm text-gray-500 mb-5">Update your password to keep your account secure.</p>
                                        
                                        <form @submit.prevent="handleChangePassword">
                                            <div class="mb-4">
                                                <label class="inline-block text-gray-800 font-medium mb-2">Current Password</label>
                                                <div class="relative">
                                                    <input
                                                        v-model="passwordForm.current_password"
                                                        :type="showPassword.current ? 'text' : 'password'"
                                                        class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 pr-10 w-full text-base"
                                                        placeholder="Enter current password"
                                                        required >
                                                    <button
type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                                        @click="showPassword.current = !showPassword.current">
                                                        <Icon :name="showPassword.current ? 'tabler:eye-off' : 'tabler:eye'" size="18" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="mb-4">
                                                <label class="inline-block text-gray-800 font-medium mb-2">New Password</label>
                                                <div class="relative">
                                                    <input
                                                        v-model="passwordForm.new_password"
                                                        :type="showPassword.new ? 'text' : 'password'"
                                                        class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 pr-10 w-full text-base"
                                                        placeholder="Enter new password"
                                                        required >
                                                    <button
type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                                        @click="showPassword.new = !showPassword.new">
                                                        <Icon :name="showPassword.new ? 'tabler:eye-off' : 'tabler:eye'" size="18" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="mb-6">
                                                <label class="inline-block text-gray-800 font-medium mb-2">Confirm New Password</label>
                                                <div class="relative">
                                                    <input
                                                        v-model="passwordForm.confirm_password"
                                                        :type="showPassword.confirm ? 'text' : 'password'"
                                                        class="border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 block p-2 px-3 pr-10 w-full text-base"
                                                        :class="passwordMismatch ? 'border-red-400' : ''"
                                                        placeholder="Confirm new password"
                                                        required >
                                                    <button
type="button" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                                        @click="showPassword.confirm = !showPassword.confirm">
                                                        <Icon :name="showPassword.confirm ? 'tabler:eye-off' : 'tabler:eye'" size="18" />
                                                    </button>
                                                </div>
                                                <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1.5 font-medium">Passwords do not match</p>
                                            </div>

                                            <button
:disabled="authStore.loading || passwordMismatch" type="submit"
                                                class="btn inline-flex items-center justify-center gap-x-2 bg-gray-900 text-white border-none disabled:opacity-50 hover:bg-black transition px-6">
                                                <span v-if="authStore.loading">Updating...</span>
                                                <span v-else>Update Password</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
          </div>
        </section>

        <Teleport to="body">
            <div v-if="showMapModal" class="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
                <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col">
                    <div class="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                        <h3 class="text-lg font-bold text-gray-800 m-0">Pin Your Location</h3>
                        <button class="text-gray-400 hover:text-gray-700" @click="closeMapModal">
                            <Icon name="tabler:x" size="24" />
                        </button>
                    </div>
                    
                    <div class="p-4 border-b bg-white flex flex-col gap-2">
                        <p class="text-sm font-semibold text-gray-700">Drag the marker or click on the map to select your address.</p>
                        <div class="flex gap-2">
                            <input v-model="tempLocation.address" type="text" readonly class="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder="Address will appear here...">
                        </div>
                    </div>

                    <div id="location-map" class="w-full h-[400px] z-0"/>

                    <div class="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50">
                        <button class="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100" @click="closeMapModal">Cancel</button>
                        <button class="px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm" @click="confirmLocation">Confirm Location</button>
                    </div>
                </div>
            </div>
        </Teleport>
    </main>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { onMounted, ref, nextTick } from 'vue'
import { useSwal } from '~/composables/useSwal'
import { useProductStore } from '~/stores/product'

useHead({
})

definePageMeta({
  middleware: ['auth'],
})

const router = useRouter()
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

const showMapModal = ref(false)
const mapInstance = ref(null)
const mapMarker = ref(null)
const tempLocation = ref({ lat: -6.200000, lng: 106.816666, address: '' }) 

const handleLogout = () => {
    try {
        authStore.logout()
        router.push('/auth/signin')
    } catch (error) {
        console.error('Error during logout:', error)
    }
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.includes('image/')) {
        swal.toastError('File must be an image')
        return
    }
    
    if (file.size > 2 * 1024 * 1024) {
        swal.toastError('Maximum file size is 2MB')
        return
    }

    selectedFile.value = file
    photoPreview.value = URL.createObjectURL(file)
}

const reverseGeocode = async (lat, lng) => {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`)
        const data = await res.json()
        if (data && data.display_name) {
            return data.display_name
        }
        return ''
    } catch (error) {
        console.error('Reverse Geocoding error:', error)
        return ''
    }
}

const geocodeAddress = async (addressText) => {
    if (!addressText) return false;
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressText)}&accept-language=id`)
        const data = await res.json()
        
        if (data && data.length > 0) {
            formData.value.lat = data[0].lat
            formData.value.lng = data[0].lon
            return true
        }
        return false
    } catch (error) {
        console.error('Geocoding error:', error)
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
            
            if(address) {
                formData.value.address = address
                swal.toastSuccess('Location pinned & address auto-filled!')
            } else {
                swal.toastSuccess('Location pinned! (Address name not found)')
            }
        },
        (err) => {
            isLocating.value = false
            console.warn('Geolocation error:', err.message)
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
    tempLocation.value.address = formData.value.address || 'Memuat alamat...'

    nextTick(() => {
        if (mapInstance.value) {
            mapInstance.value.remove();
        }

        mapInstance.value = window.L.map('location-map').setView([tempLocation.value.lat, tempLocation.value.lng], 16)

        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
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
    tempLocation.value.address = "Searching address..."
    
    const addressName = await reverseGeocode(lat, lng)
    tempLocation.value.address = addressName || "Address not found"
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

        let finalPhotoUrl = '';
        if (typeof formData.value.photo === 'string') {
            finalPhotoUrl = formData.value.photo;
        }

        if (selectedFile.value) {
            
            if (authStore.user && authStore.user.photo) {
                await imageStore.deleteImageAuth(authStore.user.photo).catch(e => console.warn('Failed to delete old photo:', e))
            }

            const uploadRes = await imageStore.uploadImageAuth(selectedFile.value)
            
            if (!uploadRes.success) {
                throw new Error(uploadRes.message || 'Failed to upload photo')
            }

            finalPhotoUrl = uploadRes.data?.data?.image_url || '';
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
        swal.toastSuccess('Profile successfully updated!')
        
        selectedFile.value = null
        
    } catch (error) {
        console.error('Update profile error:', error)
        swal.toastError(error.message || 'Failed to update profile.')
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