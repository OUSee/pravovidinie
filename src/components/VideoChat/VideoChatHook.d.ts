export declare const useVideoChat: () => {
    startCall: () => void;
    endCall: (reason: string) => void;
    toggleAudio: () => void;
    toggleVideo: () => void;
    getConnectionStatus: () => "connected" | "connecting" | "reconnecting" | "disconnected";
};
