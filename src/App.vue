<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import VideoChat from '@/components/VideoChat/Videochat.vue';
import { UserType } from './types.ts'
import { ref } from 'vue'

const userType = ref<UserType>(UserType.customer)


</script>

<template>
  <Header />
  <VideoChat />
</template>
