import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useLogin(req) {
  const userStore = useAuthStore()
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadUser = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await userStore.login(req.username.value, req.password.value)
    } catch (err) {
      error.value = err.message || 'Failed to fetch user'
    } finally {
      loading.value = false
    }
  }

  // ถ้าอยากให้โหลดอัตโนมัติเมื่อ username หรือ password เปลี่ยน
  watch(
    () => [req.username.value, req.password.value],
    ([newUsername, newPassword]) => {
      if (newUsername && newPassword) {
        loadUser()
      }
    }
  )

  return { user, loading, error, reload: loadUser }
}