<script setup lang="ts">
import { inject, type Ref } from 'vue';
import './VideoChat.scss'
defineProps({
    text: String,
    timestamp: String || undefined,
    seen: Boolean || undefined,
    from: String
})

const token = inject<Ref<string>>('token')

function formatTimestamp(timestamp: string | undefined): { date: string; time: string } {
    if (!timestamp) {
        return { date: '', time: '' }
    }
    const dateObj = new Date(timestamp);

    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid timestamp');
    }

    // Форматируем дату в формате "ДД.ММ.ГГГГ"
    const date = dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Форматируем время в формате "чч:мм"
    const time = dateObj.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return { date, time };
}

</script>
<template>
    <div class="message" :class="{ user2: from === token }">
        <p class="timestamp">
            {{ from }}
        </p>
        <p class="message-text">
            {{ text }}
        </p>
        <p class="timestamp">
            {{ formatTimestamp(timestamp).time }}
        </p>
        <div class="read-mark" :class="seen ? 'active' : ''">
        </div>
    </div>
</template>