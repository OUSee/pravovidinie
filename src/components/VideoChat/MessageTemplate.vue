<script setup lang="ts">
import './VideoChat.scss'
const props = defineProps({
    text: String,
    timestamp: String,
    seen: Boolean || undefined,
    from: String
})

function formatTimestamp(timestamp: string): { date: string; time: string } {
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
    <div class="message" :class="from">
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