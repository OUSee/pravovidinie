import CrossIcon from '../Icons/CrossIcon.vue';
const __VLS_props = defineProps({
    header: String,
    message: String,
    isOpen: Boolean,
    onClose: {
        type: Function,
        required: false
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.dialog, __VLS_intrinsicElements.dialog)({
    ...{ class: ({ active: __VLS_ctx.isOpen }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "modal-content" },
});
if (!!__VLS_ctx.onClose) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (() => { if (__VLS_ctx.onClose) {
                __VLS_ctx.onClose();
            } }) },
        ...{ class: "close-modal" },
    });
    /** @type {[typeof CrossIcon, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CrossIcon, new CrossIcon({
        color: "#072138",
    }));
    const __VLS_1 = __VLS_0({
        color: "#072138",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "modal-header" },
});
(__VLS_ctx.header);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "modal-message" },
});
(__VLS_ctx.message);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "incides" },
});
var __VLS_3 = {};
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-content']} */ ;
/** @type {__VLS_StyleScopedClasses['close-modal']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-header']} */ ;
/** @type {__VLS_StyleScopedClasses['modal-message']} */ ;
/** @type {__VLS_StyleScopedClasses['incides']} */ ;
// @ts-ignore
var __VLS_4 = __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CrossIcon: CrossIcon,
        };
    },
    props: {
        header: String,
        message: String,
        isOpen: Boolean,
        onClose: {
            type: Function,
            required: false
        }
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        header: String,
        message: String,
        isOpen: Boolean,
        onClose: {
            type: Function,
            required: false
        }
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
