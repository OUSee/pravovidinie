import type { PropType } from 'vue';
declare var __VLS_4: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_4) => any;
};
declare const __VLS_component: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    header: StringConstructor;
    message: StringConstructor;
    isOpen: BooleanConstructor;
    onClose: {
        type: PropType<() => void>;
        required: false;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    header: StringConstructor;
    message: StringConstructor;
    isOpen: BooleanConstructor;
    onClose: {
        type: PropType<() => void>;
        required: false;
    };
}>> & Readonly<{}>, {
    isOpen: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
