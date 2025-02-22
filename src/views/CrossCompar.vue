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

// 當按下 Enter 鍵時觸發比對
const handleKeydown = (event) => {
    if (event.key === 'Enter') {
        compareFiles();
    }
};
</script>

<template>
    <div class="container mx-auto p-4">
        <div class="my-3">一口氣看幾筆全部複製起來直接丟底下框框</div>
        <div class="flex my-5">
            <textarea
                v-model="file1"
                placeholder="貼上第一份 Excel 內容"
                class="w-full p-2 border rounded mb-2 mr-5"
                rows="10"
            ></textarea>
            <textarea
                v-model="file2"
                placeholder="貼上第二份 Excel 內容"
                class="w-full p-2 border rounded mb-2"
            ></textarea>
        </div>
        <button @click="compareFiles" class="bg-blue-600 text-white p-2 rounded">比對</button>

        <div v-if="differences.length" class="mt-4">
            <h3 class="text-lg font-semibold mb-2">庫存不同的項目</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="border p-2">品名</th>
                            <th class="border p-2">第一份庫存</th>
                            <th class="border p-2">第二份庫存</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in differences" :key="item.name" class="text-center">
                            <td class="border p-2">{{ item.name }}</td>
                            <td class="border p-2">{{ item.stock1 }}</td>
                            <td class="border p-2">{{ item.stock2 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>沒有不同的項目</div>
    </div>
    <SearchUnit />
</template>
