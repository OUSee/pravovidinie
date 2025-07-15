import { ref } from 'vue';
import Modal from '../Modal.vue';
import DotSpinner from '../../Loaders/DotSpinner.vue';
const modal = ref(false);
const loading = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const handleCloseModal = () => {
    modal.value = false;
};
const phone = ref('');
const handleSubmit = () => {
    // send to backend
    loading.value = true;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Modal, new Modal({
    header: "registration",
    message: "perform a registration to continue use site",
    isOpen: (__VLS_ctx.modal),
    onClose: (__VLS_ctx.handleCloseModal),
}));
const __VLS_1 = __VLS_0({
    header: "registration",
    message: "perform a registration to continue use site",
    isOpen: (__VLS_ctx.modal),
    onClose: (__VLS_ctx.handleCloseModal),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_2.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "email",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "email",
        name: "email",
        placeholder: "Email",
        required: true,
    });
    (__VLS_ctx.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "phone",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "phone",
        name: "phone",
        placeholder: "Phone",
        required: true,
    });
    (__VLS_ctx.phone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "nickname",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        name: "nickname",
        value: (__VLS_ctx.name),
        placeholder: "Nickname",
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "password",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.password),
        name: "password",
        placeholder: "Password",
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
    });
    if (!__VLS_ctx.loading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else {
        /** @type {[typeof DotSpinner, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(DotSpinner, new DotSpinner({}));
        const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
}
var __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Modal: Modal,
            DotSpinner: DotSpinner,
            modal: modal,
            loading: loading,
            name: name,
            email: email,
            password: password,
            handleCloseModal: handleCloseModal,
            phone: phone,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
