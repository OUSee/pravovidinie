export declare enum UserType {
    customer = "customer",
    lawyer = "lawyer"
}
export type Message = {
    text: string;
    seen: boolean | undefined;
    timestamp: string;
    id: string;
    from: string;
};
export declare enum CallStatus {
    canceled = "canceled"
}
export declare const testMessages: Message[];
