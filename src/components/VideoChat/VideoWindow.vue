<script setup lang="ts">
import './VideoChat.scss'
import VideoChatBar from './VideChatBar.vue'
import { inject, watchEffect, ref } from 'vue'

const refVideoStream = inject<any>('refVideo');
const refUserVideoStream = inject<any>('refUserVideo');

const yourVideo = ref<HTMLVideoElement | null>(null)
const partnerVideo = ref<HTMLVideoElement | null>(null)


const handleVideoStream = () => {
    if (yourVideo.value !== null && refUserVideoStream.value) {
        console.log('Setting srcObject for yourVideo');
        refUserVideoStream.getTracks().forEach((track: any) => {
            console.log(`Track ${track.kind} enabled:`, track.enabled);
            track.enabled = true;
        });
        yourVideo.value.muted = true
        yourVideo.value.srcObject = refUserVideoStream.value;
    }
};

watchEffect(() => {
    console.log(refVideoStream.value);
    console.log(refUserVideoStream.value);
})

watchEffect(() => {
    if (refVideoStream.value !== null && refVideoStream.value !== undefined && partnerVideo.value !== null) {
        partnerVideo.value.srcObject = refVideoStream.value;
    }
});

watchEffect(() => {
    handleVideoStream()

    if (yourVideo.value !== null && !refUserVideoStream.value) {
        const observer = new MutationObserver(() => {
            if (refUserVideoStream.value) {
                handleVideoStream();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }
})

</script>

<template>
    <div class="videochat-window">
        <video ref="refUserVideo" class="main-window" src=""></video>
        <video ref="refVideo" class="mirror" src=""></video>
        <VideoChatBar :checked="true" />
    </div>
</template>