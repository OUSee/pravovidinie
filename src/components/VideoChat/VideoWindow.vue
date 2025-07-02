<script setup lang="ts">
import './VideoChat.scss'
import VideoChatBar from './VideChatBar.vue'
import { inject } from 'vue'

const refVideoStream = inject('refVideo');
const refUserVideoStream = inject('refUserVideo');



</script>

<template>
    <div class="videochat-window">
        <video ref="refUserVideo" class="main-window" src=""></video>
        <video ref="refVideo" class="mirror" src=""></video>
        <VideoChatBar :checked="true" />
    </div>
</template>