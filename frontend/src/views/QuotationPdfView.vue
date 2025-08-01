<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const iframeSrc = ref(null)
const downloadUrl = ref(null)
const authStore = useAuthStore()
const route = useRoute()
const id = route.params.id
const token = authStore?.user?.token

const loadPdf = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/quotations/${id}/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (!response.ok) throw new Error('Failed to fetch PDF')

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    iframeSrc.value = blobUrl
    downloadUrl.value = blobUrl
  } catch (err) {
    alert('เกิดข้อผิดพลาด: ' + err.message)
  }
}

onMounted(() => {
  loadPdf()
})
</script>

<template>
  <div class="w-full h-screen p-4">
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-semibold text-black">ใบเสนอราคา PDF</h2>
      <a
        v-if="downloadUrl"
        :href="downloadUrl"
        download="quotation.pdf"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </a>
    </div>

    <iframe
      v-if="iframeSrc"
      :src="iframeSrc"
      class="w-full h-[90vh] border rounded"
    />

    <div v-else class="text-center text-gray-500 mt-10">กำลังโหลด PDF...</div>
  </div>
</template>
