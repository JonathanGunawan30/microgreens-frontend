export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const script = document.createElement('script')
  script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
  script.setAttribute('data-client-key', String(config.public.midtransClientKey ?? ''))
  document.head.appendChild(script)
})