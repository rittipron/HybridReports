<template>
  <div class="flex justify-between mb-4">
    <h2 class="text-xl font-semibold text-black">
      <span @click.prevent="toggleAdd" class="cursor-pointer hover:text-blue-600">Quotation</span> <span v-if="add">/
        Add Quotation</span>
    </h2>
    <button v-if="!add" @click.prevent="toggleAdd"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
      Add Quotation
    </button>
  </div>
  <div v-if="!add" class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <QuotationList :quotations="quotations"/>
  </div>
  <div v-if="add" class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <QuotationCreate />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QuotationCreate from '@/components/quotation/QuotationCreate.vue'
import QuotationList from '@/components/quotation/QuotationList.vue'
import { useAuthStore } from '@/stores/auth'

const add = ref(false)
const quotations = ref([])
const authStore = useAuthStore()

const toggleAdd = () => {
  add.value = !add.value;
};

const fetchQuotations = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/quotations', {
      headers: {
        'Authorization': `Bearer ${authStore?.user?.token}`,
        'Accept': 'application/json'
      }
    })
    const data = await res.json()
    console.log('Quotations:', data)
    quotations.value = data.data ?? data
  } catch (err) {
    console.error('Error fetching quotations:', err)
  }
}

onMounted(() => {
  fetchQuotations()
})
</script>