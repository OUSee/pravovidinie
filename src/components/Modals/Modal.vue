<script setup lang="ts">
defineProps({
    header: String,
    message: String,
    insides: HTMLElement,
    isOpen: Boolean
})
</script>

<template>
    <dialog class="modal-window" :class="{ active: isOpen }">
        <h1 class="modal-header">
            {{ header }}
        </h1>
        <p class="modal-message">
            {{ message }}
        </p>
        <div class="incides">
            {{ insides }}
        </div>
    </dialog>
</template>