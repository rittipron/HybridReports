import { defineStore } from 'pinia'
import { fetchUsers, createUser } from '@/services/userService'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    error: null
  }),

  actions: {
    async loadUsers() {
      this.loading = true
      this.error = null
      try {
        const data = await fetchUsers()
        this.users = data
      } catch (err) {
        this.error = err.message || 'Error loading users'
      } finally {
        this.loading = false
      }
    },

    async addUser(user) {
      try {
        const newUser = await createUser(user)
        this.users.push(newUser)
      } catch (err) {
        console.error('Error adding user:', err)
      }
    }
  }
})
