import './VideoChat.scss';
import VideoWindow from './VideoWindow.vue';
import Chat from './Chat.vue';
import { ref, provide } from 'vue';
import {} from '../../types';
const refVideo = ref(null);
const refUserVideo = ref(null);
const webSocketRef = ref(null);
const enableCall = ref(false);
const messages = ref([]);
const isConnecting = ref(false);
provide('refVideo', refVideo);
provide('refUserVideo', refUserVideo);
provide('enableCall', enableCall);
provide('messages', messages);
provide('webSocketRef', webSocketRef);
provide('isConnecting', isConnecting);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "videochat" },
});
/** @type {[typeof VideoWindow, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(VideoWindow, new VideoWindow({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof Chat, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Chat, new Chat({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {__VLS_StyleScopedClasses['videochat']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            VideoWindow: VideoWindow,
            Chat: Chat,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
