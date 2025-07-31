<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">Users</h2>

    <div v-if="userStore.loading">Loading...</div>
    <div v-else-if="userStore.error" class="text-red-600">{{ userStore.error }}</div>

    <ul v-else>
      <li v-for="user in userStore.users" :key="user.id" class="mb-1">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>

    <form @submit.prevent="addUser" class="mt-4 space-y-2">
      <input v-model="name" type="text" placeholder="Name" class="border p-1 rounded w-full" />
      <input v-model="email" type="email" placeholder="Email" class="border p-1 rounded w-full" />
      <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded">Add User</button>
    </form>
  </div>
</template>

<script setup>
    import { useUser } from '@/composables/useUser'

    const userId = 1
    const { user, loading, error, reload } = useUser(userId)
</script>
