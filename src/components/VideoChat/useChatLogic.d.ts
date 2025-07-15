import type { Message } from '../../types';
export declare const useConnectChatWebSocket: () => {
    sendMessage: (message: Message) => Promise<void>;
};
