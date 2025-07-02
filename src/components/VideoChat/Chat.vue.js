import './VideoChat.scss';
import { ref } from 'vue';
import MessageTemplate from './MessageTemplate.vue';
import SendMessageIcon from '../Icons/SendMessageIcon.vue';
import AttachFileIcon from '../Icons/AttachFileIcon.vue';
import { testMessages } from '../../types';
const usertext = ref('');
const messages = ref(testMessages);
const generateTimestamp = () => {
    return new Date().toISOString();
};
const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10);
};
const handleSendMessage = () => {
    if (usertext.value.trim() === '') {
        return;
    }
    else {
        const newMessage = {
            text: usertext.value,
            seen: false,
            timestamp: generateTimestamp(),
            id: generateRandomId(),
            from: "user2"
        };
        messages.value = [...messages.value, newMessage];
        usertext.value = '';
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "videochat-chat" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "history" },
});
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
    ...{ class: "user-bar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
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
            usertext: usertext,
            messages: messages,
            handleSendMessage: handleSendMessage,
            handleEnter: handleEnter,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
