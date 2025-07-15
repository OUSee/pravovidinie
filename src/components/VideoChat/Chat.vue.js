import './VideoChat.scss';
import { inject, ref } from 'vue';
import MessageTemplate from './MessageTemplate.vue';
import SendMessageIcon from '../Icons/SendMessageIcon.vue';
import AttachFileIcon from '../Icons/AttachFileIcon.vue';
import { useConnectChatWebSocket } from './useChatLogic';
import SendFileModal from '../Modals/SendFile/SendFileModal.vue';
const usertext = ref('');
const token = inject('token');
const { sendMessage } = useConnectChatWebSocket();
const messages = inject('messages');
const bottomRef = ref(null);
const openAttach = ref(false);
const scrollBottom = () => {
    setTimeout(() => {
        bottomRef.value?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
};
const generateTimestamp = () => {
    return new Date().toISOString();
};
const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10) + '_' + token;
};
const handleSendMessage = () => {
    if (usertext.value.trim() === '' || !token) {
        return;
    }
    else {
        const newMessage = {
            text: usertext.value,
            seen: false,
            timestamp: generateTimestamp(),
            id: generateRandomId(),
            from: token.value
        };
        sendMessage(newMessage);
        usertext.value = '';
        scrollBottom();
    }
};
function handleEnter(event) {
    if (event.shiftKey) {
        // Если Shift+Enter — вставляем новую строку
        usertext.value += '\n';
        console.log(usertext.value);
    }
    else {
        // Иначе — обрабатываем отправку
        handleSendMessage();
    }
}
const handleAttachFile = () => {
    openAttach.value = !openAttach.value;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "videochat-chat" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "history" },
    ref: "meassagesTarget",
});
/** @type {typeof __VLS_ctx.meassagesTarget} */ ;
for (const [message] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    /** @type {[typeof MessageTemplate, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MessageTemplate, new MessageTemplate({
        key: (message.id),
        text: (message.text),
        timestamp: (message.timestamp),
        seen: (message.seen),
        from: (message.from),
    }));
    const __VLS_1 = __VLS_0({
        key: (message.id),
        text: (message.text),
        timestamp: (message.timestamp),
        seen: (message.seen),
        from: (message.from),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "bottomRef",
});
/** @type {typeof __VLS_ctx.bottomRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "user-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleAttachFile) },
    ...{ class: "button-icon" },
    title: "attach",
});
/** @type {[typeof AttachFileIcon, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(AttachFileIcon, new AttachFileIcon({
    color: "#0A2463",
}));
const __VLS_4 = __VLS_3({
    color: "#0A2463",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "user-input",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.textarea)({
    ...{ onKeydown: (__VLS_ctx.handleEnter) },
    value: (__VLS_ctx.usertext),
    name: "user-input",
    id: "user-input",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleSendMessage) },
    ...{ class: "button-icon" },
    title: "send-message",
});
/** @type {[typeof SendMessageIcon, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(SendMessageIcon, new SendMessageIcon({
    color: "#0A2463",
}));
const __VLS_7 = __VLS_6({
    color: "#0A2463",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof SendFileModal, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(SendFileModal, new SendFileModal({
    isOpen: (__VLS_ctx.openAttach),
    onClose: (__VLS_ctx.handleAttachFile),
}));
const __VLS_10 = __VLS_9({
    isOpen: (__VLS_ctx.openAttach),
    onClose: (__VLS_ctx.handleAttachFile),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {__VLS_StyleScopedClasses['videochat-chat']} */ ;
/** @type {__VLS_StyleScopedClasses['history']} */ ;
/** @type {__VLS_StyleScopedClasses['user-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MessageTemplate: MessageTemplate,
            SendMessageIcon: SendMessageIcon,
            AttachFileIcon: AttachFileIcon,
            SendFileModal: SendFileModal,
            usertext: usertext,
            messages: messages,
            bottomRef: bottomRef,
            openAttach: openAttach,
            handleSendMessage: handleSendMessage,
            handleEnter: handleEnter,
            handleAttachFile: handleAttachFile,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
