import './VideoChat.scss';
import VideoChatBar from './VideChatBar.vue';
import DotSpinner from '../Loaders/DotSpinner.vue';
import { inject, watch } from 'vue';
// import VideoChatLogic_deprecated from './VideoChatLogic_deprecated.vue';
const refVideo = inject('refVideo');
const refUserVideo = inject('refUserVideo');
const isConnecting = inject('isConnecting');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "videochat-window" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-window" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.video, __VLS_intrinsicElements.video)({
    ref: "refVideo",
    src: "",
});
/** @type {typeof __VLS_ctx.refVideo} */ ;
if (__VLS_ctx.isConnecting) {
    /** @type {[typeof DotSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(DotSpinner, new DotSpinner({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mirror" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.video, __VLS_intrinsicElements.video)({
    ref: "refUserVideo",
    src: "",
});
/** @type {typeof __VLS_ctx.refUserVideo} */ ;
if (__VLS_ctx.isConnecting) {
    /** @type {[typeof DotSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(DotSpinner, new DotSpinner({}));
    const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
/** @type {[typeof VideoChatBar, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(VideoChatBar, new VideoChatBar({
    checked: (true),
}));
const __VLS_7 = __VLS_6({
    checked: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['videochat-window']} */ ;
/** @type {__VLS_StyleScopedClasses['main-window']} */ ;
/** @type {__VLS_StyleScopedClasses['mirror']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            VideoChatBar: VideoChatBar,
            DotSpinner: DotSpinner,
            refVideo: refVideo,
            refUserVideo: refUserVideo,
            isConnecting: isConnecting,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
