<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../Modal.vue';
import DotSpinner from '../../Loaders/DotSpinner.vue';

const modal = ref<boolean>(false)
const loading = ref<boolean>(false)
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const handleCloseModal = () => {
    modal.value = false
}
const phone = ref<string>('');

const handleSubmit = () => {
    // send to backend
    loading.value = true
}

</script>

<template>
    <Modal header="registration" message="perform a registration to continue use site" :is-open="modal"
        :onClose="handleCloseModal">
        <template #default>
            <form @submit.prevent="handleSubmit">
                <label for="email">
                    <input type="email" name="email" v-model="email" placeholder="Email" required>
                </label>
                <label for="phone">
                    <input type="phone" name="phone" v-model="phone" placeholder="Phone" required>
                </label>
                <label for="nickname">
                    <input type="text" name="nickname" v-model="name" placeholder="Nickname" required>
                </label>
                <label for="password">
                    <input type="text" v-model="password" name="password" placeholder="Password" required>
                </label>
                <button type="submit">
                    <span v-if="!loading">Зарегистрироваться</span>
                    <DotSpinner v-else />
                </button>
            </form>
        </template>
    </Modal>
</template>