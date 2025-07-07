<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue';
import SendMessageIcon from '../../Icons/SendMessageIcon.vue';
import Modal from '../Modal.vue';

const props = defineProps({
    isOpen: Boolean,
    onClose: {
        type: Function as PropType<() => void>,
        required: false
    }
})

const fileInputref = ref<any>(null)

const handleChooseFromFolders = () => {
    fileInputref.value.click()
}

const handleDragOver = (e: any) => {
    console.log(e.target.classList.contains('drag-over'))
    if (!e.target.classList.contains('drag-over')) e.target.classList.add('drag-over')
}

const handleDragEnd = (e: any) => {
    e.target.classList.remove('drag-over')
}

const handleChooseDropped = (e: any) => {
    let files;
    if (e.dataTransfer.items) {
        files = [];
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === 'file') {
                files.push(e.dataTransfer.items[i].getAsFile())
            }
        }
    }
    else {
        files = Array.from(e.dataTransfer.files);
    }
    console.log('sucsess added fiels: ', files)
    e.target.classList.remove('drag-over')
}

const handleChoosePasted = (e: any) => {
    if (e.clipboardData && e.clipboardData.files.length > 0) {
        const files = Array.from(e.clipboardData.files);
        console.log('files pasted: ', files)
        e.preventDefault()
    }
}

const handleSendFile = () => {
    if (props.onClose) props.onClose();
}

onMounted(() => {
    document.addEventListener('paste', (e) => {
        handleChoosePasted(e)
    })
})

</script>

<template>
    <Modal header="Send file" message="Paste, drag or choose file from your computer" :is-open="isOpen"
        :onClose="onClose">
        <template #default>
            <label for="fileInput" class="media-choose-area" @dragleave.prevent="handleDragEnd"
                @dragover.prevent="handleDragOver" @click.prevent="handleChooseFromFolders"
                @drop.prevent="handleChooseDropped">
                <p style="pointer-events: none;">Drag your file here, paste from clipboard or just click to choose from
                    your device storage</p>
            </label>
            <input ref="fileInputref" id="fileInput" type="file" style="display: none;">
            <button @click.prevent="handleSendFile" class="button ml-auto mt-20">
                Send
                <SendMessageIcon color="#26b36c" />
            </button>
        </template>
    </Modal>
</template>