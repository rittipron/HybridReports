<script setup>
import { RouterView } from 'vue-router'
import Navber from '@/components/layout/NavbarComponent.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<template>
  <div class="min-h-screen min-w-screen bg-white">
    <div><Navber /></div>
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
