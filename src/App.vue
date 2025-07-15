<script setup lang="ts">
import { provide, ref } from 'vue';
import Header from '../src/components/Header/Header.vue';
import VideoChat from '../src/components/VideoChat/VideoChat.vue';
import Authentification from './components/Modals/Authorization/Authentification.vue';

const token = ref<string>('')
const roomID = ref<string>('')
const user = ref<any>(localStorage.getItem('user'))

const API_ACESS_ROUTE = "http://xn--80aeaifasc8bfim.xn--p1ai";
const API_CREATE_ROOM = "http://api.xn--80aeaifasc8bfim.xn--p1ai"
const API_ACESS_ROUTE_WS = "ws://api.xn--80aeaifasc8bfim.xn--p1ai";

provide('API_ACESS_ROUTE', API_ACESS_ROUTE)
provide('API_ACESS_ROUTE_WS', API_ACESS_ROUTE_WS)
provide('API_CREATE_ROOM', API_CREATE_ROOM)

provide('token', token)
provide('roomID', roomID)
provide('user', user)



</script>

<template>
  <Header />
  <VideoChat />
  <Authentification />

</template>
