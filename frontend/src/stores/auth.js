import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      try {
        const res = await fetchApi('http://localhost:8000/api/profile', {
          credentials: 'include'
        })
        if (!res.ok) throw new Error('Not authenticated')
        this.user = await res.json()
      } catch {
        this.user = null
      }
    },
    async login(username, password) {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: username, password })
      })
      if (!res.ok) throw new Error('Login failed')
      await this.fetchUser()
      return this.user
    },
    async logout() {
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include'
      })
      this.user = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  persist: false
})
