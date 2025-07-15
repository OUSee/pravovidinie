import { onMounted, ref, inject } from 'vue';
import Modal from '../Modal.vue';
import DotSpinner from '../../Loaders/DotSpinner.vue';
import axios from 'axios';
import EyeShowIcon from '../../Icons/EyeShowIcon.vue';
const modal = ref(false);
const loading = ref(false);
const email = ref('');
const password = ref('');
const token = inject('token');
const hidePassword = ref(true);
const user = inject('user');
const API_ACESS_ROUTE = inject('API_ACESS_ROUTE');
const fetchApi = async () => {
    loading.value = true;
    try {
        if (password.value !== '' && email.value !== '') {
            // const response: any = await fetch(API_ACESS_ROUTE + '/api/auth/login', {
            //     method: 'POST', // HTTP method
            //     headers: {
            //         'Content-Type': 'application/json' // Sending JSON data
            //     },
            //     body: JSON.stringify({
            //         email: email.value,
            //         password: password.value
            //     })
            // });
            const response = await axios.post(API_ACESS_ROUTE + '/api/auth/login', {
                email: email.value,
                password: password.value
            });
            console.log('resp', response.data);
            if (user && response.data.user && token) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                user.value = response.data.user;
                token.value = response.data.user.token;
            }
            else {
                console.log('resp message', response.message);
            }
        }
        loading.value = false;
        modal.value = false;
    }
    catch (err) {
        console.error('ERR: ', err);
        loading.value = false;
        modal.value = false;
    }
};
const handleSubmit = async () => {
    console.log({ email: email.value, password: password.value });
    fetchApi();
};
const checkIfAutentificated = () => {
    const stored_user = localStorage.getItem('user');
    if (!stored_user) {
        modal.value = true;
    }
};
const handleShowPassword = () => {
    hidePassword.value = !hidePassword.value;
};
onMounted(() => {
    checkIfAutentificated();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Modal, typeof Modal, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Modal, new Modal({
    header: "Login",
    message: "log in to continue using site",
    isOpen: (__VLS_ctx.modal),
}));
const __VLS_1 = __VLS_0({
    header: "Login",
    message: "log in to continue using site",
    isOpen: (__VLS_ctx.modal),
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
        id: "email",
        placeholder: "Email",
        required: true,
    });
    (__VLS_ctx.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "password",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: "text",
        value: (__VLS_ctx.password),
        id: "password",
        placeholder: "Password",
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleShowPassword) },
        ...{ class: "show-password" },
    });
    /** @type {[typeof EyeShowIcon, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(EyeShowIcon, new EyeShowIcon({
        checked: (__VLS_ctx.hidePassword),
    }));
    const __VLS_5 = __VLS_4({
        checked: (__VLS_ctx.hidePassword),
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
    });
    if (!__VLS_ctx.loading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    else {
        /** @type {[typeof DotSpinner, ]} */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(DotSpinner, new DotSpinner({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
}
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['show-password']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Modal: Modal,
            DotSpinner: DotSpinner,
            EyeShowIcon: EyeShowIcon,
            modal: modal,
            loading: loading,
            email: email,
            password: password,
            hidePassword: hidePassword,
            handleSubmit: handleSubmit,
            handleShowPassword: handleShowPassword,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
