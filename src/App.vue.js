import { provide, ref } from 'vue';
import Header from '../src/components/Header/Header.vue';
import VideoChat from '../src/components/VideoChat/VideoChat.vue';
import Authentification from './components/Modals/Authorization/Authentification.vue';
const token = ref('');
const roomID = ref('');
const user = ref(localStorage.getItem('user'));
const API_ACESS_ROUTE = "http://xn--80aeaifasc8bfim.xn--p1ai";
const API_CREATE_ROOM = "http://api.xn--80aeaifasc8bfim.xn--p1ai";
const API_ACESS_ROUTE_WS = "ws://api.xn--80aeaifasc8bfim.xn--p1ai";
provide('API_ACESS_ROUTE', API_ACESS_ROUTE);
provide('API_ACESS_ROUTE_WS', API_ACESS_ROUTE_WS);
provide('API_CREATE_ROOM', API_CREATE_ROOM);
provide('token', token);
provide('roomID', roomID);
provide('user', user);
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
/** @type {[typeof Authentification, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(Authentification, new Authentification({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Header: Header,
            VideoChat: VideoChat,
            Authentification: Authentification,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
