import { useSwal } from '~/composables/useSwal'
import { useNotificationStore } from '~/stores/notification'

export const useNotificationWs = () => {
  const config = useRuntimeConfig()
  const swal = useSwal()
  let ws = null
  let reconnectTimer = null
  let reconnectAttempts = 0
  let activeUserId = null
  let manualClose = false

  const clearReconnectTimer = () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  }

  const scheduleReconnect = () => {
    if (manualClose || !activeUserId) return
    clearReconnectTimer()

    const delay = Math.min(30000, 2000 * (2 ** reconnectAttempts))
    reconnectAttempts += 1
    reconnectTimer = setTimeout(() => {
      connectWs(activeUserId)
    }, delay)
  }

  const connectWs = (userId) => {
    if (!userId) return

    activeUserId = userId
    manualClose = false
    clearReconnectTimer()

    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      return
    }

    const baseUrl = config.public.apiNotificationBaseUrl
    if (!baseUrl) {
      return
    }

    const wsUrl = baseUrl.replace(/^http:\/\//i, 'ws://').replace(/^https:\/\//i, 'wss://')
    const fullUrl = `${wsUrl}/ws?user_id=${encodeURIComponent(userId)}`

    ws = new WebSocket(fullUrl)

    ws.onopen = () => {
      reconnectAttempts = 0
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

    ws.onclose = () => {
      ws = null
      scheduleReconnect()
    }
  }

  const disconnectWs = () => {
    manualClose = true
    activeUserId = null
    clearReconnectTimer()
    if (ws) {
      ws.close()
      ws = null
    }
  }

  return { connectWs, disconnectWs }
}
