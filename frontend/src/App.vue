<script setup>
import { RouterView } from 'vue-router'
import NavberLogin from '@/components/layout/NavberLoginComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<template>
  <div class="min-h-screen min-w-screen bg-white">
    <div v-if="authStore.token"><NavberLogin /></div>
    <div class="">
      <RouterView />
    </div>
  </div>
</template>
