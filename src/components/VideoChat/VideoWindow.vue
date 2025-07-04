<script setup lang="ts">
import './VideoChat.scss'
import VideoChatBar from './VideChatBar.vue'
import DotSpinner from '../Loaders/DotSpinner.vue'
import { inject } from 'vue'
// import VideoChatLogic_deprecated from './VideoChatLogic_deprecated.vue';

const refVideo = inject<any>('refVideo');
const refUserVideo = inject<any>('refUserVideo');

</script>

<template>
    <div class="videochat-window">
        <div class="main-window">
            <video ref="refVideo" src=""></video>
            <DotSpinner v-if="refVideo?.srcObject === null || refVideo?.srcObject === undefined" />
        </div>
        <div class="mirror">
            <video ref="refUserVideo" src=""></video>
            <DotSpinner v-if="refUserVideo?.srcObject === null || refUserVideo?.srcObject === undefined" />
        </div>
        <VideoChatBar :checked="true" />
        <!-- <VideoChatLogic_deprecated></VideoChatLogic_deprecated> -->
    </div>
</template>