import { onMounted, ref } from 'vue';
import SendMessageIcon from '../../Icons/SendMessageIcon.vue';
import Modal from '../Modal.vue';
const props = defineProps({
    isOpen: Boolean,
    onClose: {
        type: Function,
        required: false
    }
});
const fileInputref = ref(null);
const handleChooseFromFolders = () => {
    fileInputref.value.click();
};
const handleDragOver = (e) => {
    console.log(e.target.classList.contains('drag-over'));
    if (!e.target.classList.contains('drag-over'))
        e.target.classList.add('drag-over');
};
const handleDragEnd = (e) => {
    e.target.classList.remove('drag-over');
};
const handleChooseDropped = (e) => {
    let files;
    if (e.dataTransfer.items) {
        files = [];
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === 'file') {
                files.push(e.dataTransfer.items[i].getAsFile());
            }
        }
    }
    else {
        files = Array.from(e.dataTransfer.files);
    }
    console.log('sucsess added fiels: ', files);
    e.target.classList.remove('drag-over');
};
const handleChoosePasted = (e) => {
    if (e.clipboardData && e.clipboardData.files.length > 0) {
        const files = Array.from(e.clipboardData.files);
        console.log('files pasted: ', files);
        e.preventDefault();
    }
};
const handleSendFile = () => {
    if (props.onClose)
        props.onClose();
};
onMounted(() => {
    document.addEventListener('paste', (e) => {
        handleChoosePasted(e);
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Modal, new Modal({
    header: "Send file",
    message: "Paste, drag or choose file from your computer",
    isOpen: (__VLS_ctx.isOpen),
    onClose: (__VLS_ctx.onClose),
}));
const __VLS_1 = __VLS_0({
    header: "Send file",
    message: "Paste, drag or choose file from your computer",
    isOpen: (__VLS_ctx.isOpen),
    onClose: (__VLS_ctx.onClose),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ onDragleave: (__VLS_ctx.handleDragEnd) },
        ...{ onDragover: (__VLS_ctx.handleDragOver) },
        ...{ onClick: (__VLS_ctx.handleChooseFromFolders) },
        ...{ onDrop: (__VLS_ctx.handleChooseDropped) },
        for: "fileInput",
        ...{ class: "media-choose-area" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        ref: "fileInputref",
        id: "fileInput",
        type: "file",
        ...{ style: {} },
    });
    /** @type {typeof __VLS_ctx.fileInputref} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSendFile) },
        ...{ class: "button ml-auto mt-20" },
    });
    /** @type {[typeof SendMessageIcon, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(SendMessageIcon, new SendMessageIcon({
        color: "#26b36c",
    }));
    const __VLS_5 = __VLS_4({
        color: "#26b36c",
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['media-choose-area']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-20']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SendMessageIcon: SendMessageIcon,
            Modal: Modal,
            fileInputref: fileInputref,
            handleChooseFromFolders: handleChooseFromFolders,
            handleDragOver: handleDragOver,
            handleDragEnd: handleDragEnd,
            handleChooseDropped: handleChooseDropped,
            handleSendFile: handleSendFile,
        };
    },
    props: {
        isOpen: Boolean,
        onClose: {
            type: Function,
            required: false
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        isOpen: Boolean,
        onClose: {
            type: Function,
            required: false
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
