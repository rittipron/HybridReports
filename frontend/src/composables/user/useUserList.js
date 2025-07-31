import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { fetchUserById } from '../../services/userService'

export function useUser(userId) {
  const userStore = useUserStore()

  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadUser = async () => {
    loading.value = true
    error.value = null
    try {
      user.value = await fetchUserById(userId)
    } catch (err) {
      error.value = err.message || 'Failed to fetch user'
    } finally {
      loading.value = false
    }
  }

  onMounted(loadUser)

  watch(() => userId, loadUser)

  return { user, loading, error, reload: loadUser }
}
