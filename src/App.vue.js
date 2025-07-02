import Header from '../src/components/Header/Header.vue';
import VideoChat from '../src/components/VideoChat/VideoChat.vue';
// import { UserType } from './types'
// import { ref } from 'vue'
// const userType = ref<UserType>(UserType.customer)
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Header, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Header, new Header({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof VideoChat, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(VideoChat, new VideoChat({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Header: Header,
            VideoChat: VideoChat,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
