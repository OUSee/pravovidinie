export declare const useVideoChatLogic: () => {
    toggleAudio: () => void;
    toggleVideo: () => void;
    startCall: () => Promise<void>;
    endCall: () => void;
    getCallStatus: () => {
        isActive: boolean;
        ws_open: boolean;
        videoEnabled: boolean;
        audioEnabled: boolean;
        userStream: boolean;
        partnerVideo: boolean;
        error: string | null;
    };
};
