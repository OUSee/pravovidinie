<script setup lang="ts">
import './VideoChat.scss'
import { inject, ref, type Ref } from 'vue'
import MessageTemplate from './MessageTemplate.vue'
import SendMessageIcon from '../Icons/SendMessageIcon.vue'
import AttachFileIcon from '../Icons/AttachFileIcon.vue'
import { UserType } from '../../types'
// import { testMessages } from '../../types'
import { type Message } from '../../types'
import { useConnectChatWebSocket } from './useChatLogic'
import SendFileModal from '../Modals/SendFile/SendFileModal.vue'
import DialogueButton from '../Butons/DialogueButton.vue'
import AcceptOffer from '../Modals/AcceptOffer/AcceptOffer.vue'


const usertext = ref<string>('')
const token = inject<Ref<string>>('token')
const { partnerRef = {
    user_type: UserType.client,
    first_name: 'test',
    last_name: 'test',
}, sendMessage } = useConnectChatWebSocket()
const messages = inject<Ref<Message[]>>('messages')
const bottomRef = ref<HTMLElement | null>(null)
const openAttach = ref<boolean>(false)
const openDialogue = ref(false)
const offerFiles = ref([])
const today = new Date().toISOString().split('T')[0];
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 360); // через 30 дней
const maxDateString = maxDate.toISOString().split('T')[0];
const req_idRef = ref('123')
const details = ref({})
const offerOpen = ref(false)

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

const handleOffer = () => {
    openDialogue.value = !openDialogue.value;
}

const handleSendOffer = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData)
    console.log(data)

    details.value = { details: data.offerAim, deadline: data.offerDate, price: data.offerPrice }
    handleOpenOffer()
    openDialogue.value = false
    // send offer
}


const handleAttachFile = (e: any) => {
    e?.stopPropagation()
    e?.preventDefault()
    openAttach.value = true
}

const closeAttach = () => {
    openAttach.value = false
}

const handleOpenOffer = () => {
    offerOpen.value = true
}

const handleCloseOffer = () => {
    offerOpen.value = false
}


</script>
<template>
    <div class="videochat-chat">
        <div class="chat-dialogue">
            <div class="chat-dialogue-header">
                <div class="options">
                    <!-- <button title="create offer" @click="handleOffer">
                        Заказать услугу
                    </button> -->
                    <DialogueButton text="Заказать услугу" :open="openDialogue" @click="handleOffer" />
                </div>
                <div class="profile">
                    <p>
                        {{ partnerRef.first_name }} {{ partnerRef.last_name }}
                    </p>
                    <div class="img-wrapper" :class="{ lawyer: partnerRef.user_type === 'lawyer' }">
                    </div>
                </div>
            </div>
            <form @submit="handleSendOffer"
                @keypress="(e) => { console.log(e.target); e.key === 'Enter' ? handleSendOffer : null }"
                class="chat-dialogue-body" :class="{ active: openDialogue !== false }">
                <label for="offerAim" class="h2">Что нужно сделать?</label>
                <textarea name="offerAim" id="offerAim" placeholder="Опишите задачу" required></textarea>
                <div class="d-flex align-center justify-sb">
                    <h2 class="m-none">Прикрепить документы</h2>
                    <button class="button-icon" title="attach" @click="handleAttachFile">
                        <AttachFileIcon color="white" />
                    </button>
                </div>
                <div class="offer-files" v-if="offerFiles.length > 0"></div>
                <label for="offerDate" class="h2">К какому времени?</label>
                <input type="date" name="offerDate" id="offerDate" :max="maxDateString" :min="today" required>
                <label for="offerPrice">Предложите цену</label>
                <input type="number" name="offerPrice" id="offerPrice" placeholder="0" required>
                <button type="submit">
                    Отправить заявку
                </button>
            </form>
        </div>
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
    <SendFileModal :is-open="openAttach" :onClose="closeAttach" />
    <AcceptOffer :req_id="req_idRef" :details="details" :onClose="handleCloseOffer" :is_open="offerOpen"></AcceptOffer>
</template>