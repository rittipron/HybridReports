<template>
  <div class="flex min-h-full flex-1 flex-col justify-center">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign In </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input 
                v-model="username" 
                placeholder="Username" 
                type="email" 
                name="email" 
                id="email" 
                autocomplete="email" 
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
              />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input 
              v-model="password"  
              placeholder="Password"
              type="password" 
              name="password" 
              id="password" 
              autocomplete="current-password" 
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
            />
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            class='flex w-full justify-center 
            rounded-md bg-indigo-600 px-3 py-1.5 
            text-sm/6 font-semibold text-white shadow-xs 
            hover:bg-indigo-500 focus-visible:outline-2 
            focus-visible:outline-offset-2 
            focus-visible:outline-indigo-600 
            cursor-pointer'>Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLogin } from '@/composables/useLogin'

const username = ref('')
const password = ref('')

const { user, loading, error, reload } = useLogin({ username, password })

const handleLogin = () => {
  reload()
}
</script>