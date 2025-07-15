<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import Modal from '../Modal.vue';
import DotSpinner from '../../Loaders/DotSpinner.vue';
// import axios from 'axios';

// const API_ACESS_ROUTE = inject<string>('API_ACESS_ROUTE')
const props = defineProps({
    is_open: Boolean,
    details: Object,
    req_id: String,
    onClose: {
        type: Function as PropType<() => void>,
        required: true
    }
})


const loading = ref<Boolean>(false)

const fetchOffer = async () => {
    loading.value = true
    try {
        loading.value = false
        // fetch offer by props.req_id
        // location.reload()
    } catch (err) {
        console.error('ERR: ', err)
        loading.value = false
    }
}

const sendDecline = () => {
    loading.value = true
    try {
        loading.value = false
        // fetch offer by props.req_id
        // location.reload()
    } catch (err) {
        console.error('ERR: ', err)
        loading.value = false
    }
}

// const post

const handleSubmit = async () => {
    console.log('submit')
    // fetchApi()
}

const handleDecline = () => {
    console.log('decline')
    sendDecline()
}

const handleCloseModal = () => {
    handleDecline()
    props.onClose()
}

onMounted(() => {
    console.log(`=> offer: ${props.details}`, props.details);
    fetchOffer()
})

</script>

<template>
    <Modal header="Входящее предложение" message="Вы принимаете предложение?" :is-open="is_open"
        :onClose="handleCloseModal">
        <template #default>
            <div v-if="!loading" class="offer-modal">
                <h2>Детали</h2>
                <p class="details">
                    {{ details?.details }}
                </p>
                <h2>Дедлайн</h2>
                <p class="date">
                    {{ details?.deadline }}
                </p>
                <h2>Цена</h2>
                <p class="price">
                    {{ details?.price }}
                </p>
                <div class="d-flex align-center gap-10">
                    <button @click="handleSubmit" class="flex-fill green">Принять</button>
                    <button @click="handleCloseModal" class="flex-fill red">Отказаться</button>
                </div>
            </div>
            <DotSpinner v-else></DotSpinner>
        </template>
    </Modal>
</template>