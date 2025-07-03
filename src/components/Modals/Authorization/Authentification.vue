<script setup lang="ts">
import { onMounted, ref, type Ref, inject } from 'vue';
import Modal from '../Modal.vue';
import DotSpinner from '../../Loaders/DotSpinner.vue';
import axios from 'axios';

const modal = ref<boolean>(false)
const loading = ref<boolean>(false)
const email = ref<string>('');
const password = ref<string>('');
const token = inject<Ref<string>>('token')
const handleCloseModal = () => {
    // modal.value = false
}

const fetchApi = async () => {
    loading.value = true
    try {
        if (password.value !== '' && email.value !== '') {
            const response: any = await axios.post(`http://localhost:8001/api/auth/login`,
                {
                    email: email.value,
                    password: password.value
                })
            if (response.user && token) {
                localStorage.setItem('user', JSON.stringify(response.user))
                token.value = response.user.token
                console.log('resp', response)
            }
            else {
                console.log(response.message)

            }
        }
        loading.value = false
        modal.value = false
    } catch (err) {
        console.error('ERR: ', err)
        loading.value = false
    }
}

const handleSubmit = () => {
    console.log({ email: email.value, password: password.value })
    fetchApi()
}
const checkIfAutentificated = () => {
    const user = localStorage.getItem('user')
    console.log('user', user)
    if (!user) {
        modal.value = true
    }
}

onMounted(() => {
    checkIfAutentificated()
})


</script>

<template>
    <Modal header="registration" message="perform a registration to continue use site" :is-open="modal"
        :onClose="handleCloseModal">
        <template #default>
            <form @submit.prevent="handleSubmit">
                <label for="email">
                    <input type="email" name="email" v-model="email" placeholder="Email" required>
                </label>
                <label for="password">
                    <input type="text" v-model="password" name="password" placeholder="Password" required>
                </label>
                <button type="submit">
                    <span v-if="!loading">Login</span>
                    <DotSpinner v-else />
                </button>
            </form>
        </template>
    </Modal>
</template>