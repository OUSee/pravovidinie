<script setup lang="ts">
import './VideoChat.scss'
import VideoChatBar from './VideChatBar.vue'
</script>

<template>
    <div class="videochat-window">
        <video class="main-window" src=""></video>
        <video class="mirror" src=""></video>
        <VideoChatBar :checked="true" />
    </div>
</template>