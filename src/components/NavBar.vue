<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
    <nav class="bg-blue-600 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <div class="text-white text-xl font-bold">拒絕大腦過勞</div>
            <button @click="isOpen = !isOpen" class="text-white md:hidden">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <ul class="hidden md:flex space-x-4 text-white">
                <li><router-link to="/" class="hover:underline">Home</router-link></li>
                <li><router-link to="/crossCompar" class="hover:underline">CrossCompar</router-link></li>
                <li><router-link to="/searchUnit" class="hover:underline">SearchUnit</router-link></li>
            </ul>
        </div>
        <div v-if="isOpen" class="md:hidden mt-2 bg-blue-500 p-2 rounded-lg">
            <ul class="space-y-2 text-white">
                <li><router-link to="/" class="hover:underline">Home</router-link></li>
                <li><router-link to="/crossCompar" class="hover:underline">CrossCompar</router-link></li>
                <li><router-link to="/searchUnit" class="hover:underline">SearchUnit</router-link></li>
            </ul>
        </div>
    </nav>
</template>
