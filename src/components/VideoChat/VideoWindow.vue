<script setup lang="ts">
import './VideoChat.scss'
import VideoChatBar from './VideChatBar.vue'
import DotSpinner from '../Loaders/DotSpinner.vue'
import { inject, watchEffect, ref } from 'vue'

const refVideo = inject<any>('refVideo');
const refUserVideo = inject<any>('refUserVideo');


// test
const testStream = ref<MediaStream | null>(null)

const getMedia = async () => {
    try {
        testStream.value = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    } catch (e) {
        console.error('Error accessing media devices.', e)
    }
}

getMedia()

watchEffect(() => {
    if (refUserVideo && testStream.value !== null) {
        refUserVideo.value.srcObject = testStream.value;
        refUserVideo.value.muted = true;
        refUserVideo.value.play()
    }
},)
</script>

<template>
    <div class="videochat-window">
        <div class="main-window" @click="getMedia">
            <video ref="refVideo" src=""></video>
            <DotSpinner v-if="refVideo?.srcObject === null || refVideo?.srcObject === undefined" />
        </div>
        <div class="mirror">
            <video ref="refUserVideo" src=""></video>
            <DotSpinner v-if="refUserVideo?.srcObject === null || refUserVideo?.srcObject === undefined" />
        </div>
        <VideoChatBar :checked="true" />
    </div>
</template>