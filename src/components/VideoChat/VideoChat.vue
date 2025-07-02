<script setup lang="ts">
import './VideoChat.scss'
import VideoWindow from './VideoWindow.vue'
import Chat from './Chat.vue'
import VideoLogic from './VideoLogic.vue';
import { ref, provide } from 'vue'

const refVideo = ref<HTMLTextAreaElement | null>(null)
const refUserVideo = ref<HTMLTextAreaElement | null>(null)
const enableCall = ref<boolean>(false)

const videoCallRef = ref<any>(null)

provide('refVideo', refVideo)
provide('refUserVideo', refUserVideo)
provide('enableCall', enableCall)

provide('startCall', async () => { videoCallRef.value.startCall() })
provide('endCall', () => { videoCallRef.value.endCall() })
// provide('getCallStatus', async () => { videoCallRef.value.getCallStatus() })
provide('toggleAudio', () => { videoCallRef.value.toggleAudio() })
provide('toggleVideo', () => { videoCallRef.value.toggleVideo() })




</script>
<template>
    <div class="videochat">
        <VideoWindow />
        <Chat />
        <VideoLogic ref="videoCallRef" />
    </div>
</template>