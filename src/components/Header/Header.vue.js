import LogOutButton from '../Icons/LogOutButton.vue';
import './Header.scss';
const user = localStorage.getItem('user') ?? '{}';
const { first_name = '', last_name = '', balance = 0, user_type = 'client' } = JSON.parse(user);
const handleNumberToRanges = (number) => {
    if (!Number.isFinite(number)) {
        return '0';
    }
    return new Intl.NumberFormat('ru-RU').format(number);
};
const handleLogOut = () => {
    localStorage.removeItem('user');
    location.reload();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "logo-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "lk" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
(__VLS_ctx.handleNumberToRanges(__VLS_ctx.balance));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "lk-profile" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "img-wrapper" },
    ...{ class: ({ lawyer: __VLS_ctx.user_type === 'lawyer' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.first_name);
(__VLS_ctx.last_name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleLogOut) },
    ...{ class: "button-icon" },
});
/** @type {[typeof LogOutButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(LogOutButton, new LogOutButton({
    color: "#072138",
}));
const __VLS_1 = __VLS_0({
    color: "#072138",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {__VLS_StyleScopedClasses['logo-container']} */ ;
/** @type {__VLS_StyleScopedClasses['lk']} */ ;
/** @type {__VLS_StyleScopedClasses['lk-profile']} */ ;
/** @type {__VLS_StyleScopedClasses['img-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['lawyer']} */ ;
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LogOutButton: LogOutButton,
            first_name: first_name,
            last_name: last_name,
            balance: balance,
            user_type: user_type,
            handleNumberToRanges: handleNumberToRanges,
            handleLogOut: handleLogOut,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
