import './VideoChat.scss';
import VideoChatBar from './VideChatBar.vue';
import DotSpinner from '../loaders/DotSpinner.vue';
import { inject, watchEffect, ref } from 'vue';
const refVideoStream = inject('refVideo');
const refUserVideoStream = inject('refUserVideo');
const yourVideo = ref(null);
const partnerVideo = ref(null);
const handleVideoStream = () => {
    if (yourVideo.value !== null && refUserVideoStream.value) {
        console.log('Setting srcObject for yourVideo');
        refUserVideoStream.getTracks().forEach((track) => {
            console.log(`Track ${track.kind} enabled:`, track.enabled);
            track.enabled = true;
        });
        yourVideo.value.muted = true;
        yourVideo.value.srcObject = refUserVideoStream.value;
    }
};
watchEffect(() => {
    console.log(refVideoStream.value);
    console.log(refUserVideoStream.value);
});
watchEffect(() => {
    if (refVideoStream.value !== null && refVideoStream.value !== undefined && partnerVideo.value !== null) {
        partnerVideo.value.srcObject = refVideoStream.value;
    }
});
watchEffect(() => {
    handleVideoStream();
    if (yourVideo.value !== null && !refUserVideoStream.value) {
        const observer = new MutationObserver(() => {
            if (refUserVideoStream.value) {
                handleVideoStream();
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        return () => observer.disconnect();
    }
});
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
    ref: "partnerVideo",
    src: "",
});
/** @type {typeof __VLS_ctx.partnerVideo} */ ;
if (__VLS_ctx.refVideoStream === null || __VLS_ctx.refVideoStream === undefined) {
    /** @type {[typeof DotSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(DotSpinner, new DotSpinner({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mirror" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.video, __VLS_intrinsicElements.video)({
    ref: "yourVideo",
    src: "",
});
/** @type {typeof __VLS_ctx.yourVideo} */ ;
if (__VLS_ctx.refUserVideoStream === null || __VLS_ctx.refUserVideoStream === undefined) {
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
            refVideoStream: refVideoStream,
            refUserVideoStream: refUserVideoStream,
            yourVideo: yourVideo,
            partnerVideo: partnerVideo,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
