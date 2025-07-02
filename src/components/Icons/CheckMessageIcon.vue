<script setup lang="ts">
defineProps({
    checked: Boolean,
    color: String || undefined
})
</script>

<template>
    <svg v-if="checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12L11.9497 16.9497L22.5572 6.34326M2.0498 12.0503L6.99955 17M17.606 6.39355L12.3027 11.6969"
            :stroke="color ?? 'white'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12L10.2426 16.2426L18.727 7.75732" :stroke="color ?? 'white'" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>