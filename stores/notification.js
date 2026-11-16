import { defineStore } from 'pinia'
import { apiFetch } from '~/utils/api'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false
  }),

  actions: {
    async fetchNotifications() {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const res = await apiFetch(`${config.public.apiNotificationBaseUrl}/auth/notifications`)
        if (res.ok) {
          const response = await res.json()
          if (response && response.data) {
            this.notifications = response.data
            this.unreadCount = this.notifications.filter(n => !n.read_at).length
          }
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error)
      } finally {
        this.loading = false
      }
    },

    async markAsRead(id) {
      try {
        const config = useRuntimeConfig()
        const res = await apiFetch(`${config.public.apiNotificationBaseUrl}/auth/notifications/${id}/read`, {
          method: 'PATCH',
        })
        if (!res.ok) return

        const notif = this.notifications.find(n => n.id === id)
        if (notif && !notif.read_at) {
          notif.read_at = new Date().toISOString()
          this.unreadCount = Math.max(0, this.unreadCount - 1)
        }
      } catch (error) {
        console.error('Failed to mark notification as read:', error)
      }
    },

    async markAllAsRead() {
      try {
        const config = useRuntimeConfig()
        const res = await apiFetch(`${config.public.apiNotificationBaseUrl}/auth/notifications/read-all`, {
          method: 'PATCH',
        })
        if (!res.ok) return

        const now = new Date().toISOString()
        this.notifications = this.notifications.map(n => ({
          ...n,
          read_at: n.read_at ?? now
        }))
        this.unreadCount = 0
      } catch (error) {
        console.error('Failed to mark all notifications as read:', error)
      }
    },

    addNewRealtimeNotif(data) {
      const newNotif = {
        id: data.id || Date.now(),
        subject: data.subject,
        message: data.message,
        send_at: data.send_at || new Date().toISOString(),
        read_at: null
      }

      this.notifications.unshift(newNotif)
      this.unreadCount++
    }
  }
})