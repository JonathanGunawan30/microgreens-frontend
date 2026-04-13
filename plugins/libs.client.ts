import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SimpleBar from 'simplebar'
import ApexCharts from 'apexcharts'
import flatpickr from 'flatpickr'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'
import { tns } from 'tiny-slider'
import Swiper from 'swiper'
import L from 'leaflet'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    window.bootstrap = bootstrap
    window.SimpleBar = SimpleBar
    window.ApexCharts = ApexCharts
    window.flatpickr = flatpickr
    window.noUiSlider = noUiSlider
    window.wNumb = wNumb
    window.tns = tns
    window.Swiper = Swiper
    window.L = L
  }

  return {
    provide: {
      bootstrap,
      SimpleBar,
      ApexCharts,
      flatpickr,
      noUiSlider,
      wNumb,
      tns,
      Swiper,
      L
    }
  }
})
