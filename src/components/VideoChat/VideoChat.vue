<script setup lang="ts">
import './VideoChat.scss'
import VideoWindow from './VideoWindow.vue'
import Chat from './Chat.vue'
import VideoChatLogic from './VideoChatLogic.vue';
import { ref, provide } from 'vue'

const refVideo = ref<HTMLTextAreaElement | null>(null)
const refUserVideo = ref<HTMLTextAreaElement | null>(null)

provide('refVideo', refVideo)
provide('refUserVideo', refUserVideo)

</script>
<template>
    <div class="videochat">
        <VideoWindow />
        <Chat />
        <VideoChatLogic />
    </div>
</template>