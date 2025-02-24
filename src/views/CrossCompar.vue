<script setup>
import { ref } from 'vue';

import SearchUnit from '@/components/SearchUnit.vue';

const file1 = ref('');
const file2 = ref('');
const differences = ref([]);

const parseExcelText = (text) => {
    const rows = text.trim().split('\n');
    const data = {};

    rows.forEach((row) => {
        const columns = row.split(/\t/); // 只用 Tab 分隔，避免解析錯誤

        if (columns.length >= 5) {
            // 確保至少有 5 個欄位
            const warehouse = columns[0].trim();
            const productId = columns[1].trim();
            const name = columns[2].trim();
            const stock = parseInt(columns[3].trim(), 10) || 0;
            const unit = columns[4].trim();

            const key = `${productId}`; // 以品號作為唯一 key
            data[key] = { warehouse, productId, name, stock, unit };
        }
    });

    return data;
};

const compareFiles = () => {
    const data1 = parseExcelText(file1.value);
    const data2 = parseExcelText(file2.value);
    differences.value = [];

    const allKeys = new Set([...Object.keys(data1), ...Object.keys(data2)]);

    differences.value = Array.from(allKeys)
        .map((key) => {
            const item1 = data1[key] || {};
            const item2 = data2[key] || {};

            const stock1 = item1.stock ?? '無';
            const stock2 = item2.stock ?? '無';

            if (stock1 !== stock2) {
                return {
                    warehouse: item1.warehouse || item2.warehouse || '未知',
                    productId: item1.productId || item2.productId || key.split('-')[0],
                    name: item1.name || item2.name || key.split('-')[1],
                    stock1,
                    stock2,
                    unit: item1.unit || item2.unit || '未知',
                };
            }
            return null;
        })
        .filter((item) => item !== null);
};

const removeFiles = () => {
    differences.value = [];
    file1.value = '';
    file2.value = '';
};
</script>

<template>
    <div class="container mx-auto px-8 rounded-lg shadow-xl max-w-6xl">
        <div class="flex flex-col items-center my-8">
            <h1 class="text-3xl font-semibold text-gray-800 dark:text-white mb-4">庫存比對</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">貼上您的 Excel 內容來比對庫存</p>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
            <textarea
                v-model="file1"
                placeholder="貼上第一份 Excel 內容"
                class="focus:outline-none w-full p-5 border rounded-lg shadow-lg mb-4 md:mr-4 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-sm text-gray-600 uppercase dark:bg-gray-700 dark:text-white transition-all ease-in-out"
                rows="6"
            ></textarea>
            <textarea
                v-model="file2"
                placeholder="貼上第二份 Excel 內容"
                class="focus:outline-none w-full p-5 border rounded-lg shadow-lg mb-4 md:mr-4 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-sm text-gray-600 uppercase dark:bg-gray-700 dark:text-white transition-all ease-in-out"
                rows="6"
            ></textarea>
        </div>

        <button
            @click="compareFiles"
            type="button"
            class="w-full md:w-auto font-medium rounded-lg text-lg px-6 py-3 mb-6"
        >
            開始比對
        </button>
        <button
            @click="removeFiles"
            type="button"
            class="w-full md:w-auto font-medium rounded-lg text-lg px-6 py-3 mb-6"
        >
            清空比對
        </button>

        <div v-if="differences.length" class="mt-4">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">庫存不同的項目</h3>

            <div class="overflow-x-auto rounded-lg shadow-xl bg-white dark:bg-gray-700">
                <table class="min-w-full text-sm text-gray-700 dark:text-gray-300">
                    <thead class="text-sm text-gray-600 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th class="border-b py-3 px-4 text-left">倉庫</th>
                            <th class="border-b py-3 px-4 text-left">品號</th>
                            <th class="border-b py-3 px-4 text-left">品名</th>
                            <th class="border-b py-3 px-4 text-left">第一份庫存</th>
                            <th class="border-b py-3 px-4 text-left">第二份庫存</th>
                            <th class="border-b py-3 px-4 text-left">單位</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in differences"
                            :key="item.productId"
                            class="dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-300 dark:hover:bg-gray-600"
                        >
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.warehouse }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.productId }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.name }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.stock1 }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.stock2 }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.unit }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <SearchUnit />
    </div>
</template>

<style scoped></style>
