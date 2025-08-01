<template>
    <div>
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
                        <div class="flex justify-between items-start">
                            <div>
                                <h1 class="text-3xl font-bold mb-2">QUOTATION</h1>
                                <p class="text-blue-100">Professional Quote Document</p>
                            </div>
                            <button @click="showPreview = false"
                                class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                                ← Back to Form
                            </button>
                        </div>
                    </div>

                    <!-- Quote Details -->
                    <div class="p-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div class="space-y-4">
                                <div>
                                    <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Customer
                                        ID</label>
                                    <p class="text-xl font-semibold text-gray-800">#{{ quotation.customer_id }}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Quotation
                                        Date</label>
                                    <p class="text-xl font-semibold text-gray-800">{{ quotation.quotation_date }}</p>
                                </div>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-500 uppercase tracking-wide">Notes</label>
                                <p class="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg">{{ quotation.notes }}</p>
                            </div>
                        </div>

                        <!-- Items Table -->
                        <div class="bg-gray-50 rounded-xl overflow-hidden">
                            <table class="w-full">
                                <thead class="bg-gray-800 text-white">
                                    <tr>
                                        <th class="px-6 py-4 text-left font-semibold">Product ID</th>
                                        <th class="px-6 py-4 text-center font-semibold">Quantity</th>
                                        <th class="px-6 py-4 text-right font-semibold">Unit Price</th>
                                        <th class="px-6 py-4 text-right font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in quotation.items" :key="index"
                                        class="border-b border-gray-200 hover:bg-white transition-colors">
                                        <td class="px-6 py-4 font-medium text-gray-800">#{{ item.product_id }}</td>
                                        <td class="px-6 py-4 text-center text-gray-700">{{ item.quantity }}</td>
                                        <td class="px-6 py-4 text-right text-gray-700">{{ formatCurrency(item.price) }}
                                        </td>
                                        <td class="px-6 py-4 text-right font-semibold text-gray-800">
                                            {{ formatCurrency(item.quantity * item.price) }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                                    <tr>
                                        <td colspan="3" class="px-6 py-4 text-right text-lg font-semibold">TOTAL AMOUNT:
                                        </td>
                                        <td class="px-6 py-4 text-right text-xl font-bold">{{
                                            formatCurrency(calculateTotal()) }}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form Mode -->
        <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
                        <h1 class="text-2xl font-bold mb-2">Create Quotation</h1>
                        <p class="text-slate-300">Design and generate professional quotations</p>
                    </div>

                    <div class="p-6 space-y-6">
                        <!-- Basic Information -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Customer ID</label>
                                <input type="number" v-model.number="quotation.customer_id"
                                    class="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter customer ID" />
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Quotation Date</label>
                                <input type="date" readonly v-model="quotation.quotation_date"
                                    class="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Notes</label>
                            <textarea v-model="quotation.notes" rows="3"
                                class="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Enter quotation notes..."></textarea>
                        </div>

                        <!-- Items Section -->
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <h2 class="text-lg font-semibold text-gray-800">Quotation Items</h2>
                                <button @click="addItem"
                                    class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Item
                                </button>
                            </div>

                            <div class="space-y-3">
                                <div v-for="(item, index) in quotation.items" :key="index"
                                    class="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                        <div class="space-y-2">
                                            <label class="block text-sm font-medium text-gray-700">Product ID</label>
                                            <input type="number" v-model.number="item.product_id"
                                                class="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Product ID" />
                                        </div>
                                        <div class="space-y-2">
                                            <label class="block text-sm font-medium text-gray-700">Quantity</label>
                                            <input type="number" v-model.number="item.quantity"
                                                class="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Qty" min="1" />
                                        </div>
                                        <div class="space-y-2">
                                            <label class="block text-sm font-medium text-gray-700">Price (THB)</label>
                                            <input type="number" step="0.01" v-model.number="item.price"
                                                class="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="0.00" />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="text-sm text-gray-600">
                                                Total:
                                                <span class="font-semibold text-gray-800">{{
                                                    formatCurrency(item.quantity * item.price) }}</span>
                                            </div>
                                            <button @click="removeItem(index)" :disabled="quotation.items.length === 1"
                                                class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <div class="text-right">
                                    <span class="text-lg font-medium text-gray-700">Grand Total: </span>
                                    <span class="text-2xl font-bold text-blue-700">{{ formatCurrency(calculateTotal())
                                        }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-4 pt-6 border-t border-gray-200">
                            <button @click="handleSave"
                                class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Save JSON
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const quotation = reactive({
    customer_id: null,
    quotation_date: `${new Date().toISOString().split('T')[0]}`, // Format as YYYY-MM-DD
    notes: null,
    items: [],
})

function addItem() {
    quotation.items.push({
        product_id: 1,
        quantity: 1,
        price: 0,
    })
}

function removeItem(index) {
    if (quotation.items.length > 1) {
        quotation.items.splice(index, 1)
    }
}

function calculateTotal() {
    return quotation.items.reduce((total, item) => total + item.quantity * item.price, 0)
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
    }).format(amount || 0)
}

async function handleSave() {
    console.log('Saving authStore:', authStore?.user?.token)
    try {
        const response = await fetch('http://127.0.0.1:8000/api/quotations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authStore?.user?.token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(quotation),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to save quotation')
        }

        const data = await response.json()
        alert('Quotation saved successfully! ID: ' + data.id)
        console.log('Saved data:', data)

        // ถ้าต้องการ reset form หลังบันทึก
        // resetQuotation()
    } catch (error) {
        alert('Error saving quotation: ' + error.message)
        console.error(error)
    }
}
</script>