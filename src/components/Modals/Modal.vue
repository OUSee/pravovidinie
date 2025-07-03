<script setup lang="ts">
import type { PropType } from 'vue';
import CrossIcon from '../Icons/CrossIcon.vue';

defineProps({
    header: String,
    message: String,
    isOpen: Boolean,
    onClose: {
        type: Function as PropType<() => void>,
        required: false
    }
})
</script>

<template>
    <dialog :class="{ active: isOpen }">
        <div class="modal-content">
            <button v-if="!!onClose" class="close-modal" @click="() => { if (onClose) { onClose() } }">
                <CrossIcon color="#072138" />
            </button>
            <h1 class="modal-header">
                {{ header }}
            </h1>
            <p class="modal-message">
                {{ message }}
            </p>
            <div class="incides">
                <slot></slot>
            </div>
        </div>
    </dialog>
</template>