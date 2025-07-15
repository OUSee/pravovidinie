import { inject } from 'vue';
import './VideoChat.scss';
const __VLS_props = defineProps({
    text: String,
    timestamp: String || undefined,
    seen: Boolean || undefined,
    from: String
});
const token = inject('token');
function formatTimestamp(timestamp) {
    if (!timestamp) {
        return { date: '', time: '' };
    }
    const dateObj = new Date(timestamp);
    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid timestamp');
    }
    // Форматируем дату в формате "ДД.ММ.ГГГГ"
    const date = dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    // Форматируем время в формате "чч:мм"
    const time = dateObj.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return { date, time };
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "message" },
    ...{ class: ({ user2: __VLS_ctx.from === __VLS_ctx.token }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "timestamp" },
});
(__VLS_ctx.from);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "message-text" },
});
(__VLS_ctx.text);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "timestamp" },
});
(__VLS_ctx.formatTimestamp(__VLS_ctx.timestamp).time);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "read-mark" },
    ...{ class: (__VLS_ctx.seen ? 'active' : '') },
});
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['user2']} */ ;
/** @type {__VLS_StyleScopedClasses['timestamp']} */ ;
/** @type {__VLS_StyleScopedClasses['message-text']} */ ;
/** @type {__VLS_StyleScopedClasses['timestamp']} */ ;
/** @type {__VLS_StyleScopedClasses['read-mark']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            token: token,
            formatTimestamp: formatTimestamp,
        };
    },
    props: {
        text: String,
        timestamp: String || undefined,
        seen: Boolean || undefined,
        from: String
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        text: String,
        timestamp: String || undefined,
        seen: Boolean || undefined,
        from: String
    },
});
; /* PartiallyEnd: #4569/main.vue */
