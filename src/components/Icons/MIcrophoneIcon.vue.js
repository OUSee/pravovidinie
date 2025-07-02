const __VLS_props = defineProps({
    checked: Boolean,
    color: String || undefined
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.rect)({
    x: "9",
    y: "3",
    width: "6",
    height: "11",
    rx: "3",
    stroke: (__VLS_ctx.color ?? 'white'),
    'stroke-width': "2",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M5 11C5 12.8565 5.7375 14.637 7.05025 15.9497C8.36301 17.2625 10.1435 18 12 18C13.8565 18 15.637 17.2625 16.9497 15.9497C18.2625 14.637 19 12.8565 19 11",
    stroke: (__VLS_ctx.color ?? 'white'),
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M12 21V19",
    stroke: (__VLS_ctx.color ?? 'white'),
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
if (!__VLS_ctx.checked) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        d: "M22.5 13.5H1.5C0.671578 13.5 0 12.8284 0 12C0 11.1716 0.671578 10.5 1.5 10.5H22.5C23.3284 10.5 24 11.1716 24 12C24 12.8284 23.3284 13.5 22.5 13.5Z",
        fill: (__VLS_ctx.color ?? 'white'),
    });
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        checked: Boolean,
        color: String || undefined
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        checked: Boolean,
        color: String || undefined
    },
});
; /* PartiallyEnd: #4569/main.vue */
