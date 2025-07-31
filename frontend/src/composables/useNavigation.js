import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  function goTo(name, params) {
    if (!params) {
      router.push({ name })
    } else {
      router.push({ name, params })
    }
  }

  return {
    goTo
  }
}
