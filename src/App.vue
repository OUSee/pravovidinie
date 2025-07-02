<script setup lang="ts">
import { provide, ref } from 'vue';
import Header from '../src/components/Header/Header.vue';
import VideoChat from '../src/components/VideoChat/VideoChat.vue';
// import { UserType } from './types'
// import { ref } from 'vue'
const generateRandomId = (): string => Math.random().toString(36).substring(2, 10)
const token = ref<string>(generateRandomId())
provide('token', token)
// const userType = ref<UserType>(UserType.autorize)


</script>

<template>
  <Header />
  <VideoChat />
</template>
