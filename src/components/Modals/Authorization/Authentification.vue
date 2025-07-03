<script setup lang="ts">
import { onMounted, ref, type Ref, inject } from 'vue';
import Modal from '../Modal.vue';
import DotSpinner from '../../Loaders/DotSpinner.vue';
import axios from 'axios';
import EyeShowIcon from '../../Icons/EyeShowIcon.vue';


const modal = ref<boolean>(false)
const loading = ref<boolean>(false)
const email = ref<string>('');
const password = ref<string>('');
const token = inject<Ref<string>>('token')
const hidePassword = ref<boolean>(true)
const user = inject<any>('user')
const API_ACESS_ROUTE = inject<string>('API_ACESS_ROUTE')


const fetchApi = async () => {
    loading.value = true
    try {
        if (password.value !== '' && email.value !== '') {
            // const response: any = await fetch(API_ACESS_ROUTE + '/api/api/auth/login', {
            //     method: 'POST', // HTTP method
            //     headers: {
            //         'Content-Type': 'application/json' // Sending JSON data
            //     },
            //     body: JSON.stringify({
            //         email: email.value,
            //         password: password.value
            //     })
            // });
            const response: any = await axios.post(API_ACESS_ROUTE + '/api/api/auth/login',
                {
                    email: email.value,
                    password: password.value
                }
            )
            console.log('resp', response)
            if (user && response.user && token) {
                localStorage.setItem('user', JSON.stringify(response.user))
                user.value = response.user
                token.value = response.user.token
            }
            else {
                console.log('resp message', response.message)
            }
        }
        loading.value = false
        modal.value = false
    } catch (err) {
        console.error('ERR: ', err)
        loading.value = false
        modal.value = false
    }
}

const handleSubmit = async () => {
    console.log({ email: email.value, password: password.value })
    fetchApi()
}
const checkIfAutentificated = () => {
    const stored_user = localStorage.getItem('user')
    if (!stored_user) {
        modal.value = true
    }
}


const handleShowPassword = () => {
    hidePassword.value = !hidePassword.value
}

onMounted(() => {
    checkIfAutentificated()
})


</script>

<template>
    <Modal header="Login" message="log in to continue using site" :is-open="modal">
        <template #default>
            <form @submit.prevent="handleSubmit">
                <label for="email">
                    <input type="email" id="email" v-model="email" placeholder="Email" required>
                </label>
                <label for="password">
                    <input type="text" v-model="password" id="password" placeholder="Password" required>
                    <button class="show-password" @click.prevent="handleShowPassword">
                        <EyeShowIcon :checked="hidePassword" />
                    </button>
                </label>
                <button type="submit">
                    <span v-if="!loading">Login</span>
                    <DotSpinner v-else />
                </button>
            </form>
        </template>
    </Modal>
</template>