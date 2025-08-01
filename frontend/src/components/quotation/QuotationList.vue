<template>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Quotation Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Customer
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    notes
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="q in quotations" :key="q.id" class="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ q.quotation_number }}
                </th>
                <td class="px-6 py-4">
                    {{ q.customer_id }}
                </td>
                <td class="px-6 py-4">
                    {{ q.quotation_date }}
                </td>
                <td class="px-6 py-4">
                    {{ q.notes }}
                </td>
                <td class="px-6 py-4 text-right">
                    <div @click.prevent="goTo('QuotationPdf', { id: q.id })" class="font-medium text-blue-600 hover:underline cursor-pointer">View</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref } from 'vue'
import { useNavigation } from '@/composables/useNavigation'

const { goTo } = useNavigation()

defineProps({
  quotations: {
    type: Array,
    default: () => []
  }
})
</script>