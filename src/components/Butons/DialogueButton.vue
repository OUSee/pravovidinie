<script setup lang="ts">
import CrossIcon from '../Icons/CrossIcon.vue';

defineProps({
    open: Boolean,
    text: String || undefined
})
</script>

<template>
    <button class="toggle-button" :class="{ 'button-icon': open }"
        :aria-label="open ? 'Закрыть диалог' : 'Открыть диалог'">
        <span class="text">
            <CrossIcon v-if="open"></CrossIcon>
            <b v-else>{{ text }}</b>
        </span>
    </button>
</template>

<style scoped>
span {
    max-height: 24px;
}

.toggle-button {
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

/* Текстовая обертка для плавного перехода */
.toggle-button .text {
    display: inline-block;
    transition: all 0.4s ease-in-out;
    transform-origin: center;
}

/* Переход в крестик — масштабируем текст "X" */
.toggle-button.open .text {
    width: 24px;
    max-height: 24px;
}
</style>