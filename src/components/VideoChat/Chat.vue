<script setup lang="ts">
import './VideoChat.scss'
import { inject, ref, type Ref } from 'vue'
import MessageTemplate from './MessageTemplate.vue'
import SendMessageIcon from '../Icons/SendMessageIcon.vue'
import AttachFileIcon from '../Icons/AttachFileIcon.vue'
// import { testMessages } from '../../types'
import type { Message } from '../../types'
import { useConnectChatWebSocket } from './useChatLogic'
import SendFileModal from '../Modals/SendFile/SendFileModal.vue'


const usertext = ref<string>('')
const token = inject<Ref<string>>('token')
const { sendMessage } = useConnectChatWebSocket()
const messages = inject<Ref<Message[]>>('messages')
const bottomRef = ref<HTMLElement | null>(null)
const openAttach = ref<boolean>(false)

const scrollBottom = () => {
    setTimeout(() => {
        bottomRef.value?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
}

const generateTimestamp = (): string => {
    return new Date().toISOString();
}
const generateRandomId = (): string => {
    return Math.random().toString(36).substring(2, 10) + '_' + token;
}

const handleSendMessage = (): void => {
    if (usertext.value.trim() === '' || !token) {
        return
    }
    else {
        const newMessage: Message = {
            text: usertext.value,
            seen: false,
            timestamp: generateTimestamp(),
            id: generateRandomId(),
            from: token.value
        }

        sendMessage(newMessage)
        usertext.value = '';
        scrollBottom()
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

const handleAttachFile = () => {
    openAttach.value = !openAttach.value
}

</script>
<template>
    <div class="videochat-chat">
        <div class="history" ref="meassagesTarget">
            <MessageTemplate v-for="message in messages" :key="message.id" :text="message.text"
                :timestamp="message.timestamp" :seen="message.seen" :from="message.from" />
            <div ref="bottomRef"></div>
        </div>
        <div class="user-bar">
            <button class="button-icon" title="attach" @click="handleAttachFile">
                <AttachFileIcon color="#0A2463" />
            </button>
            <label for="user-input">
                <textarea v-model="usertext" @keydown.enter.prevent="handleEnter" name="user-input" id="user-input" />
            </label>
            <button class="button-icon" title="send-message" @click="handleSendMessage">
                <SendMessageIcon color="#0A2463" />
            </button>
        </div>
    </div>
    <SendFileModal :is-open="openAttach" :onClose="handleAttachFile" />
</template>