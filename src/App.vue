<script setup lang="ts">
import { provide, ref } from 'vue';
import Header from '../src/components/Header/Header.vue';
import VideoChat from '../src/components/VideoChat/VideoChat.vue';
import Authentification from './components/Modals/Authorization/Authentification.vue';

const token = ref<string>('')
const roomID = ref<string>('')
const user = ref<any>(localStorage.getItem('user'))

provide('token', token)
provide('roomID', roomID)
provide('user', user)


</script>

<template>
  <Header />
  <VideoChat />
  <Authentification />
</template>
