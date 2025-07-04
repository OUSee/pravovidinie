<script setup lang="ts">
import './VideoChat.scss'
import VideoChatBar from './VideChatBar.vue'
import DotSpinner from '../Loaders/DotSpinner.vue'
import { inject, watch, type Ref } from 'vue'
// import VideoChatLogic_deprecated from './VideoChatLogic_deprecated.vue';

const refVideo = inject<any>('refVideo');
const refUserVideo = inject<any>('refUserVideo');
const isConnecting = inject<Ref<boolean>>('isConnecting');

watch(refVideo, (refVideo, prevVideo) => {
    console.log('changed ref source=> ', refVideo.srcObject)
})


</script>

<template>
    <div class="videochat-window">
        <div class="main-window">
            <video ref="refVideo" src=""></video>
            <DotSpinner v-if="isConnecting" />
        </div>
        <div class="mirror">
            <video ref="refUserVideo" src=""></video>
            <DotSpinner v-if="isConnecting" />
        </div>
        <VideoChatBar :checked="true" />
        <!-- <VideoChatLogic_deprecated></VideoChatLogic_deprecated> -->
    </div>
</template>