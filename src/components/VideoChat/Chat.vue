<script setup lang="ts">
import './VideoChat.scss'
import { ref } from 'vue'
import MessageTemplate from './MessageTemplate.vue'
import SendMessageIcon from '../Icons/SendMessageIcon.vue'
import AttachFileIcon from '../Icons/AttachFileIcon.vue'
import { testMessages } from '../../types.ts'

const usertext = ref<String>('')
const messages = ref<Message>(testMessages);

const generateTimestamp = (): string => {
    return new Date().toISOString();
}
const generateRandomId = (): string => {
    return Math.random().toString(36).substring(2, 10);
}

const handleSendMessage = (): void => {
    if (usertext.value.trim() === '') {
        return
    }
    else {
        const newMessage: Message = {
            text: usertext.value,
            seen: false,
            timestamp: generateTimestamp(),
            id: generateRandomId(),
            from: "user2"
        }

        messages.value = [...messages.value, newMessage]
        usertext.value = '';
    }
}

function handleEnter(event: KeyboardEvent) {
    if (event.shiftKey) {
        // Если Shift+Enter — вставляем новую строку
        usertext.value += '\n'
        console.log(usertext.value)
    } else {
        // Иначе — обрабатываем отправку
        handleSendMessage()
    }
}

</script>
<template>
    <div class="videochat-chat">
        <div class="history">
            <MessageTemplate v-for="message in messages" :key="message.id" :text="message.text"
                :timestamp="message.timestamp" :seen="message.seen" :from="message.from" />
        </div>
        <div class="user-bar">
            <button class="button-icon" title="attach">
                <AttachFileIcon color="#0A2463" />
            </button>
            <label ref for="user-input">
                <textarea v-model="usertext" @keydown.enter.prevent="handleEnter" name="user-input" id="user-input" />
            </label>
            <button class="button-icon" title="send-message" @click="handleSendMessage">
                <SendMessageIcon color="#0A2463" />
            </button>
        </div>
    </div>
</template>