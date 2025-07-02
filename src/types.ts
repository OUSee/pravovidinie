export enum UserType {
    customer = 'customer',
    lawyer = 'lawyer',
    autorize = 'autorize'
}

export type Message = {
    text: string;
    seen: boolean | undefined;
    timestamp: string;
    id: string;
    from: string;
}

export enum CallStatus {
  canceled = 'canceled'
}


