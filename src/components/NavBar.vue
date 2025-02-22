<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
    <nav class="p-4">
        <div class="container mx-auto flex justify-between items-center">
            <!-- <div class="text-xl font-bold">拒絕大腦過勞</div> -->
            <!-- <button @click="isOpen = !isOpen" class="md:hidden">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <ul class="hidden md:flex space-x-4">
                <router-link to="/crossCompar" class="hover:underline">
                    <li
                        class="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        資料比對
                    </li>
                </router-link>
                <router-link to="/searchUnit" class="hover:underline">
                    <li
                        class="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        單位搜尋
                    </li>
                </router-link>
            </ul> -->
        </div>
        <!-- <div v-if="isOpen" class="md:hidden mt-2 p-2 rounded-lg">
            <ul class="space-y-2">
                <router-link to="/crossCompar" class="hover:underline">
                    <li
                        class="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        資料比對
                    </li>
                </router-link>
                <router-link to="/searchUnit" class="hover:underline">
                    <li
                        class="hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        單位搜尋
                    </li>
                </router-link>
            </ul>
        </div> -->
    </nav>
</template>
