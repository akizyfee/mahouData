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
        const columns = row.split(/\s{2,}|\t/); // 支援多個空格和tab分隔
        if (columns.length >= 6) {
            const name = columns[3].trim();
            const stock = parseInt(columns[5].trim(), 10) || 0;
            data[name] = stock;
        }
    });
    return data;
};

const compareFiles = () => {
    const data1 = parseExcelText(file1.value);
    const data2 = parseExcelText(file2.value);
    differences.value = [];

    const allNames = new Set([...Object.keys(data1), ...Object.keys(data2)]);
    differences.value = Array.from(allNames)
        .map((name) => {
            const stock1 = data1[name] ?? null;
            const stock2 = data2[name] ?? null;
            // 只將庫存不相等的項目加入 differences
            if (stock1 !== stock2) {
                return { name, stock1: stock1 ?? '無', stock2: stock2 ?? '無' };
            }
            return null;
        })
        .filter((item) => item !== null); // 移除庫存相同的項目
};
</script>

<template>
    <div class="container mx-auto px-8 bg-neutral-50 dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl">
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
                @keydown="handleKeydown"
            ></textarea>
            <textarea
                v-model="file2"
                placeholder="貼上第二份 Excel 內容"
                class="focus:outline-none w-full p-5 border rounded-lg shadow-lg mb-4 md:mr-4 bg-gray-100 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-sm text-gray-600 uppercase dark:bg-gray-700 dark:text-white transition-all ease-in-out"
                rows="6"
                @keydown="handleKeydown"
            ></textarea>
        </div>

        <button
            @click="compareFiles"
            type="button"
            class="w-full md:w-auto text-white bg-gradient-to-br from-blue-500 to-teal-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 mb-6"
        >
            開始比對
        </button>

        <div v-if="differences.length" class="mt-4">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">庫存不同的項目</h3>

            <div class="overflow-x-auto rounded-lg shadow-xl bg-white dark:bg-gray-700">
                <table class="min-w-full text-sm text-gray-700 dark:text-gray-300">
                    <thead class="text-sm text-gray-600 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                        <tr>
                            <th class="border-b py-3 px-4 text-left">品名</th>
                            <th class="border-b py-3 px-4 text-left">第一份庫存</th>
                            <th class="border-b py-3 px-4 text-left">第二份庫存</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in differences"
                            :key="item.name"
                            class="dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-300 dark:hover:bg-gray-600"
                        >
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.name }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.stock1 }}</td>
                            <td class="border-b py-3 px-4 text-gray-700 dark:text-white">{{ item.stock2 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <SearchUnit />
    </div>
</template>

<style scoped></style>
