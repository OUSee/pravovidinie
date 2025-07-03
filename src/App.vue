<script setup lang="ts">
import { provide, ref } from 'vue';
import Header from '../src/components/Header/Header.vue';
import VideoChat from '../src/components/VideoChat/VideoChat.vue';
import Authentification from './components/Modals/Authorization/Authentification.vue';

// import { UserType } from './types'
// import { ref } from 'vue'
const token = ref<string>('')
const roomID = ref<string>('')
provide('token', token)
provide('roomID', roomID)
// const userType = ref<UserType>(UserType.autorize)
const modal = ref<boolean>(false)

// debug
document.addEventListener('keypress', (e: any) => {
  if (e.target.key = "\\") {
    modal.value = !modal.value;
  }
})

const handleCloseModal = () => {
  modal.value = false;
}



</script>

<template>
  <Header />
  <VideoChat />
  <Authentification />
</template>
