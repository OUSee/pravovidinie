<script setup lang="ts">
import { ref, type Ref, onMounted, onBeforeUnmount, inject } from 'vue'
import type { Message } from '../../types';

const ws = ref<WebSocket | null>(null);
const messages = inject<Ref<Message[]>>('messages');


const connectWebSocket = () => {
    ws.value = new WebSocket('ws://localhost:3000');

    ws.value.onopen = () => {
        console.log('Соединение установлено');
    };

    ws.value.onmessage = (event) => {
        if (messages !== undefined) {
            messages.value.unshift(JSON.parse(event.data));
        }
    };

    ws.value.onclose = () => {
        console.log('Соединение закрыто');
    };

    ws.value.onerror = (error) => {
        console.error('Ошибка WebSocket', error);
    };
};

const sendMessage = (message: Message) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN && message) {
        ws.value.send(JSON.stringify(message));
    }
};

onMounted(() => {
    connectWebSocket();
});

onBeforeUnmount(() => {
    if (ws.value) {
        ws.value.close();
    }
});

defineExpose({
    sendMessage
})

</script>