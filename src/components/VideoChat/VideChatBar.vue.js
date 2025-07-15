import './VideoChat.scss';
import EndVideoChatIcon from '../Icons/EndVideoChatIcon.vue';
import MIcrophoneIcon from '../Icons/MIcrophoneIcon.vue';
import CameraIcon from '../Icons/CameraIcon.vue';
import { inject, ref } from 'vue';
// import { useVideoChatLogic } from './useVideoChatLogic'
import { useVideoChat } from './VideoChatHook';
const time = '85 минут';
const pricing = 100;
const current_time = new Date();
const mute = ref(false);
const camera = ref(false);
const enableCall = inject('enableCall');
const { toggleAudio, toggleVideo, startCall, endCall } = useVideoChat();
const hours = current_time.getHours().toString().padStart(2, '0');
const minutes = current_time.getMinutes().toString().padStart(2, '0');
const handleToggleVideo = () => {
    camera.value = !camera.value;
    toggleVideo?.();
};
const handleToggleAudio = () => {
    mute.value = !mute.value;
    toggleAudio?.();
};
const handleStartCall = () => {
    if (enableCall.value === false) {
        enableCall.value = true;
        startCall?.();
    }
    else {
        enableCall.value = false;
        endCall?.('end by user');
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "videoChatBar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleToggleAudio) },
    title: "mute/unmute microphone",
});
/** @type {[typeof MIcrophoneIcon, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(MIcrophoneIcon, new MIcrophoneIcon({
    checked: (!__VLS_ctx.mute),
}));
const __VLS_1 = __VLS_0({
    checked: (!__VLS_ctx.mute),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleToggleVideo) },
    title: "turn on/off camera",
});
/** @type {[typeof CameraIcon, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(CameraIcon, new CameraIcon({
    checked: (!__VLS_ctx.camera),
}));
const __VLS_4 = __VLS_3({
    checked: (!__VLS_ctx.camera),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "progress" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.time);
(__VLS_ctx.pricing);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "time" },
});
(__VLS_ctx.hours);
(__VLS_ctx.minutes);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleStartCall) },
    title: "end videocall",
});
/** @type {[typeof EndVideoChatIcon, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(EndVideoChatIcon, new EndVideoChatIcon({
    color: "#b92828",
}));
const __VLS_7 = __VLS_6({
    color: "#b92828",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['videoChatBar']} */ ;
/** @type {__VLS_StyleScopedClasses['buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['progress']} */ ;
/** @type {__VLS_StyleScopedClasses['time']} */ ;
/** @type {__VLS_StyleScopedClasses['buttons']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            EndVideoChatIcon: EndVideoChatIcon,
            MIcrophoneIcon: MIcrophoneIcon,
            CameraIcon: CameraIcon,
            time: time,
            pricing: pricing,
            mute: mute,
            camera: camera,
            hours: hours,
            minutes: minutes,
            handleToggleVideo: handleToggleVideo,
            handleToggleAudio: handleToggleAudio,
            handleStartCall: handleStartCall,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
