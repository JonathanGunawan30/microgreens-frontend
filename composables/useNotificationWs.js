import { useSwal } from '~/composables/useSwal'
import { useNotificationStore } from '~/stores/notification'

export const useNotificationWs = () => {
  const config = useRuntimeConfig()
  const swal = useSwal()
  let ws = null

  const connectWs = (userId) => {
    if (!userId) return

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected')
      return
    }

    const baseUrl = config.public.apiNotificationBaseUrl
    if (!baseUrl) {
      console.warn('WebSocket base URL is not defined')
      return
    }

        const wsUrl = baseUrl.replace(/^http:\/\//i, 'ws://').replace(/^https:\/\//i, 'wss://') 
        const fullUrl = `${wsUrl}/ws?user_id=${userId}`
        console.log('Initiating WebSocket connection to:', fullUrl)
    
        ws = new WebSocket(fullUrl)
    
        ws.onopen = () => {
          console.log('Notification WebSocket connected successfully to', fullUrl)
        }
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.subject && data.message) {
          swal.success(data.subject, data.message)

          const notifStore = useNotificationStore()
          notifStore.addNewRealtimeNotif(data)
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('Notification WebSocket error:', error)
    }

    ws.onclose = (event) => {
      console.log('WebSocket disconnected, code:', event.code, 'reason:', event.reason, 'wasClean:', event.wasClean)
    }
  }

  const disconnectWs = () => {
    if (ws) {
      ws.close()
      ws = null
    }
  }

  return { connectWs, disconnectWs }
}
