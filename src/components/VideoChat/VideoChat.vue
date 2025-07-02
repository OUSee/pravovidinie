<script setup lang="ts">
import './VideoChat.scss'
import VideoWindow from './VideoWindow.vue'
import Chat from './Chat.vue'
import { ref, provide } from 'vue'
import { type Message } from '../../types'

const refVideo = ref<HTMLTextAreaElement | null>(null)
const refUserVideo = ref<HTMLTextAreaElement | null>(null)
const enableCall = ref<boolean>(false)
const messages = ref<Message[]>([]);

provide('refVideo', refVideo)
provide('refUserVideo', refUserVideo)
provide('enableCall', enableCall)
provide('messages', messages)


</script>
<template>
    <div class="videochat">
        <VideoWindow />
        <Chat />
    </div>
</template>