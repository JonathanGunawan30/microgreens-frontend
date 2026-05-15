import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SimpleBar from 'simplebar'
import flatpickr from 'flatpickr'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'
import Swiper from 'swiper'
import L from 'leaflet'

export default defineNuxtPlugin((_nuxtApp) => {
  if (import.meta.client) {
    window.bootstrap = bootstrap
    window.SimpleBar = SimpleBar
    window.flatpickr = flatpickr
    window.noUiSlider = noUiSlider
    window.wNumb = wNumb
    window.Swiper = Swiper
    window.L = L
  }

  return {
    provide: {
      bootstrap,
      SimpleBar,
      flatpickr,
      noUiSlider,
      wNumb,
      Swiper,
      L
    }
  }
})
