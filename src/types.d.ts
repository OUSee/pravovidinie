export declare enum UserType {
    client = "client",
    lawyer = "lawyer",
    autorize = "autorize"
}
export type Message = {
    text: string;
    seen: boolean | undefined;
    timestamp: string | undefined;
    id: string | undefined;
    from: string;
};
export declare enum CallStatus {
    canceled = "canceled"
}
