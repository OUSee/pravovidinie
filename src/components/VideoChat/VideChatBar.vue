<script setup lang="ts">
import './VideoChat.scss'
import EndVideoChatIcon from '../Icons/EndVideoChatIcon.vue'
import MIcrophoneIcon from '../Icons/MIcrophoneIcon.vue'
import CameraIcon from '../Icons/CameraIcon.vue'
import { inject, ref } from 'vue'
// import { useVideoChatLogic } from './useVideoChatLogic'
import { useVideoChat } from './VideoChatHook'

const time = '85 минут'
const pricing = 100
const current_time = new Date();
const mute = ref<Boolean>(false)
const camera = ref<Boolean>(false)
const enableCall = inject<any>('enableCall');
const { toggleAudio, toggleVideo, startCall, endCall } = useVideoChat();

const hours = current_time.getHours().toString().padStart(2, '0');
const minutes = current_time.getMinutes().toString().padStart(2, '0');


const handleToggleVideo = (): void => {
    camera.value = !camera.value
    toggleVideo?.()
}

const handleToggleAudio = (): void => {
    mute.value = !mute.value
    toggleAudio?.()
}

const handleStartCall = (): void => {
    if (enableCall.value === false) {
        enableCall.value = true;
        startCall?.();
    }
    else {
        enableCall.value = false;
        endCall?.('end by user')
    }
}

</script>

<template>
    <div class="videoChatBar">
        <div class="buttons">
            <button title="mute/unmute microphone" @click="handleToggleAudio">
                <MIcrophoneIcon :checked="!mute" />
            </button>
            <button title="turn on/off camera" @click="handleToggleVideo">
                <CameraIcon :checked="!camera" />
            </button>
        </div>
        <div class="progress">
            <p>
                {{ time }} ({{ pricing }} ₽/мин)
            </p>
            <p class="time">
                {{ hours }}:{{ minutes }}
            </p>
        </div>
        <div class="buttons">
            <button title="end videocall" @click="handleStartCall">
                <EndVideoChatIcon color="#b92828" />
            </button>
        </div>
    </div>
</template>
