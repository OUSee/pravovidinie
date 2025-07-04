import { ref, type Ref, watchEffect, inject, onUnmounted, nextTick } from 'vue'
import axios from "axios";
import callSound from '../../assets/skype-incoming.mp3'

export const useVideoChatLogic = () => {
    // Refs
    const refVideo = inject<Ref<HTMLVideoElement>>('refVideo')
    const refUserVideo = inject<Ref<HTMLVideoElement>>('refUserVideo')
    const enableCall = inject<Ref<boolean>>('enableCall')
    const webSocketRef = inject<Ref<WebSocket | null>>('webSocketRef')
    const yourVideo = ref<MediaStream | null>(null)
    const partnerVideo = ref<MediaStream | null>(null)
    const roomID = inject<Ref<string>>('roomID')
    const userStream = ref<MediaStream | null>(null)
    const peerRef = ref<RTCPeerConnection | null>(null)
    const videoEnabled = ref(true)
    const audioEnabled = ref(true)
    // const callStatus = ref('')
    const callError = ref<string | null>(null)
    const audioPlayer = ref<HTMLAudioElement | null>(null)
    const isPlaying = ref(false)
    const token = inject<Ref<string>>('token')
    // const API_ACESS_ROUTE = inject<string>('API_ACESS_ROUTE')
    const API_ACESS_ROUTE_WS = inject<string>('API_ACESS_ROUTE_WS')
    const API_CREATE_ROOM = inject<string>('API_CREATE_ROOM')
    const isConnecting = inject<Ref<boolean>>('isConnecting')
    const isNegotiating = ref<boolean>(false)
    const pendingIceCandidates = ref<RTCIceCandidate[]>([]);
    const isRemoteDescriptionSet = ref(false);

    const ICE_SERVERS = [
    { urls: "stun:stun.relay.metered.ca:80" },
    {
        urls: "turn:standard.relay.metered.ca:80",
        username: "dd41ff40517c1c1a921b3a52",
        credential: "x+5Oogy2z2lno+ca"
    }
]
    

    const addIceCandidate = async (candidate: RTCIceCandidate) => {
        if (!peerRef.value) {
            console.warn('No peer connection to add ICE candidate');
            return;
        }

        if (!isRemoteDescriptionSet.value) {
            console.log('Buffering ICE candidate - remote description not set yet');
            pendingIceCandidates.value.push(candidate);
            return;
        }

        try {
            await peerRef.value.addIceCandidate(candidate);
            console.log('Successfully added ICE candidate');
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    };

    // Update when remote description is set
    const setRemoteDescription = async (description: RTCSessionDescriptionInit) => {
        if (!peerRef.value) return;

        try {
            await peerRef.value.setRemoteDescription(description);
            isRemoteDescriptionSet.value = true;
            console.log('Remote description set successfully');

            // Process any buffered candidates
            while (pendingIceCandidates.value.length > 0) {
                const candidate = pendingIceCandidates.value.shift();
                if (candidate) {
                    await addIceCandidate(candidate);
                }
            }
        } catch (error) {
            console.error('Failed to set remote description:', error);
        }
    };

    // WebRTC functions
    const createPeer = (): RTCPeerConnection => {
        const peer = new RTCPeerConnection({
            iceServers: ICE_SERVERS
        })

        peer.onnegotiationneeded = handleNegotiationNeeded;


        pendingIceCandidates.value = [];
        isRemoteDescriptionSet.value = false;

        if(!webSocketRef || !webSocketRef.value){
            console.error('no websocket connection')
        }

        peer.onicecandidate = (e) => {
            if (e.candidate) {
                console.log('New ICE candidate generated');
                webSocketRef?.value?.send(JSON.stringify({ iceCandidate: e.candidate }));
            } else {
                console.log('ICE gathering complete');
            }
        };

        peer.ontrack = (e) => {
        if (e.streams && e.streams.length > 0) {
            console.log('Received remote stream:', e.streams[0]);
            partnerVideo.value = e.streams[0];
            
            if(!refVideo){console.log('no refvideo'); return}
            // Ensure the video element is properly updated
            nextTick(() => {
                if (refVideo.value && partnerVideo.value) {
                    refVideo.value.srcObject = partnerVideo.value;
                    refVideo.value.play().catch(e => console.error('Video play error:', e));
                }
            });
        }
    };

        return peer;
    }

    const handleNegotiationNeeded = async () => {
    console.log('Negotiation needed event fired');
    if (!peerRef.value || !webSocketRef?.value || isNegotiating.value) return;
    
    isNegotiating.value = true;
    try {
        const offer = await peerRef.value.createOffer();
        await peerRef.value.setLocalDescription(offer);
        console.log('sending offer', peerRef.value.localDescription);
        webSocketRef.value.send(JSON.stringify({ 
            offer: peerRef.value.localDescription 
        }));
    } catch (e) {
        console.error("Offer creation error:", e);
        // Consider cleanup or retry logic here
    } finally {
        isNegotiating.value = false;
    }
};

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        if (peerRef.value && peerRef.value.signalingState !== 'stable') {
            console.warn('Ignoring offer - already in negotiation');
            return;
        }

    if (!peerRef.value) {
        peerRef.value = createPeer();
    }

    if (!userStream.value || !webSocketRef?.value) return;

    try {
        await peerRef.value.setRemoteDescription(new RTCSessionDescription(offer));
        
        // Add tracks only if not already added
        if (peerRef.value.getSenders().length === 0) {
            userStream.value.getTracks().forEach(track => {
                peerRef.value?.addTrack(track, userStream.value!);
            });
        }

        const answer = await peerRef.value.createAnswer();
        await peerRef.value.setLocalDescription(answer);
        console.log('sending answer', peerRef.value.localDescription);
        webSocketRef.value.send(JSON.stringify({ 
            answer: peerRef.value.localDescription 
        }));
    } catch (error) {
        console.error("Error handling offer:", error);
        cleanup();
    }
};

    const startCall = async () => {
        if (roomID && !roomID.value) {
            await createRoom()
        }
        else {
            await getMedia()
        }
    }

    const getCallStatus = () => {
        return {
            isActive: !!peerRef.value,
            videoEnabled: videoEnabled.value,
            audioEnabled: audioEnabled.value,
            error: callError.value
        }
    }

    watchEffect(()=>{
        console.log('status: ', getCallStatus())
    })

    // Media control functions
    const toggleAudio = () => {
        audioEnabled.value = !audioEnabled.value
        if (userStream.value) {
            userStream.value.getAudioTracks().forEach(track => {
                track.enabled = audioEnabled.value
            })
        }
    }
    
    const toggleVideo = () => {
        videoEnabled.value = !videoEnabled.value
        if (userStream.value) {
            userStream.value.getVideoTracks().forEach(track => track.enabled = videoEnabled.value)
        }
    }



    // Call control functions
    const endCall = () => {
        if(!webSocketRef) return
        console.log('close websocket')
        webSocketRef.value?.send(JSON.stringify({ close: true, reason: "user_close" }))
        cleanup()
    }

    const cleanup = () => {
    if (peerRef.value) {
        // Remove all event listeners first
        peerRef.value.onnegotiationneeded = null;
        peerRef.value.onicecandidate = null;
        peerRef.value.ontrack = null;
        
        // Close all connections
        peerRef.value.getSenders().forEach(sender => {
            if (sender.track) sender.track.stop();
        });
        peerRef.value.close();
        peerRef.value = null;
    }

    if (userStream.value) {
        userStream.value.getTracks().forEach(track => track.stop());
        userStream.value = null;
    }

    yourVideo.value = null;
    partnerVideo.value = null;
    stopSound();

    if (webSocketRef?.value) {
        webSocketRef.value.onopen = null;
        webSocketRef.value.onmessage = null;
        webSocketRef.value.onclose = null;
        webSocketRef.value.onerror = null;
        webSocketRef.value.close();
        webSocketRef.value = null;
    }
};



    // Sound control
    const playSound = () => {
        if (isPlaying.value) return

        const audio = new Audio(callSound)
        audio.loop = true
        audio.play()
        audioPlayer.value = audio
        isPlaying.value = true
    }

    const stopSound = () => {
        audioPlayer.value?.pause()
        audioPlayer.value = null
        isPlaying.value = false
    }

    watchEffect(()=>{
        if(isConnecting && isConnecting.value === true){
            playSound()
        }
        else if(isConnecting && isConnecting.value === false){
            stopSound()
        }
    })

    // Media initialization
    const getMedia = async () => {
        console.log('connecting media')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: videoEnabled.value
            })

            console.log('stream get', stream)

            userStream.value = stream
            yourVideo.value = stream

            if (refUserVideo && refUserVideo.value) {
                console.log('settting user stream')
                refUserVideo.value.srcObject = stream
            }
            else{
                console.log('refUserVideo is undef')
            }

           
            
            setupWebSocket()
            
        } catch (error) {
            console.error("Media access error:", error)
            callError.value = "Media access denied"
        }
    }

    const createSocket = () => {
        if(webSocketRef && !webSocketRef.value && roomID){
            webSocketRef.value = new WebSocket(API_ACESS_ROUTE_WS + `/join?roomID=${roomID.value}&token=${token?.value}`)
        }
        else{
            console.log('websocket is set up already')
        }
    }

    const callUser = async () => {
        try {
            if(webSocketRef && userStream.value && webSocketRef.value) {
                peerRef.value = createPeer();
                userStream.value.getTracks().forEach(track => peerRef.value?.addTrack(track, userStream.value!))

                const offer = await peerRef.value.createOffer();
                await peerRef.value.setLocalDescription(offer);

                webSocketRef.value.send(
                  JSON.stringify({
                    offer: peerRef.value.localDescription,
                  })
                );
                if (isConnecting) isConnecting.value = false;
            } else {
                console.log('call aborted', 'sw: ', webSocketRef?.value,'userStream: ', userStream.value ,'peerRef', peerRef.value)
                if (isConnecting) isConnecting.value = false;
            }
        } catch(error) {
            console.log(error)
        }
    }


    // const callUser = () => {
    //     try{
    //         if(webSocketRef && userStream.value && webSocketRef.value) {
    //             peerRef.value = createPeer();
    //             userStream.value.getTracks().forEach(track => peerRef.value?.addTrack(track, userStream.value!))
                
    //             webSocketRef.value.send(
    //               JSON.stringify({
    //                 offer: peerRef.value.localDescription,
    //               })
    //             );
    //             isConnecting ? isConnecting.value = false : null;
    //         }
    //         else{
    //             console.log('call aborted', 'sw: ', webSocketRef?.value,'userStream: ', userStream.value ,'peerRef', peerRef.value)
    //             isConnecting ? isConnecting.value = false : null;
    //         }
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    // }

    const setupWebSocket = () => {
        if(!roomID || !webSocketRef){
            console.error('room id not provided or no websocket, room: ', roomID, 'websocket: ', webSocketRef?.value)
            return
        }

       try{ 
            createSocket()
       }
       catch(err){
        console.error(err)
        return
       }

       if(webSocketRef && webSocketRef.value){
        webSocketRef.value.onopen = () => {
            webSocketRef.value?.send(JSON.stringify({ join: true }))
            console.log('ws open', webSocketRef.value)

        }

        // setInterval(() => {
        //     if (webSocketRef.value && webSocketRef.value.readyState === WebSocket.OPEN) {
        //       webSocketRef.value.send(JSON.stringify({ type: "ping" }));
        //     }
        // }, 5000);

        webSocketRef.value.onmessage = async (e) => {
            const message = JSON.parse(e.data)
            console.log('ws message', message)

            if(message.status === 1){
                console.log('message get')
                callUser()
            }

            if (message.offer) {
                await setRemoteDescription(message.offer)
                handleOffer(message.offer)
            } else if (message.answer) {
                await setRemoteDescription(message.answer)
                if (!peerRef.value) {
                    console.warn('Received answer but no peer connection exists');
                    return;
                }

                const signalingState = peerRef.value.signalingState;


                if (signalingState === 'have-local-offer') {
                    try {
                        await peerRef.value.setRemoteDescription(new RTCSessionDescription(message.answer));
                        console.log('Successfully set remote answer');
                    } catch (error) {
                        console.error('Failed to set remote answer:', error);
                        cleanup();
                    }
                } else {
                    console.warn(`Ignoring answer in wrong signaling state: ${signalingState}`);
                }
                // peerRef.value?.setRemoteDescription(new RTCSessionDescription(message.answer))
            } else if (message.iceCandidate) {
                const candidate = new RTCIceCandidate(message.iceCandidate);
                await addIceCandidate(candidate);
                // peerRef.value?.addIceCandidate(message.iceCandidate).catch(console.error)
            } else if (message.close) {
                callError.value = "Call ended"
                cleanup()
            } else if (message.join) (
                callUser()
            )
        }

        webSocketRef.value.onclose = () => {console.log('ws closed');cleanup()}
        webSocketRef.value.onerror = () => {
            callError.value = "Connection error"
            cleanup()
        }
       } 
    }



    // Room management
    const createRoom = async () => {
        try {
            const user = localStorage.getItem('user')
            const room = localStorage.getItem('room')
            if(room && roomID){
                roomID.value = room
                getMedia()
                return;
            }
            if(user){
                const {token} = JSON.parse(user)
            
            // http://api.xn--80aeaifasc8bfim.xn--p1ai/api/create
            const response = await axios.post(API_CREATE_ROOM + `/create`,
                { profile: 'test' },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            console.log('res', response.data)

            if (roomID && response.data.room_id) {
                roomID.value = response.data.room_id
                localStorage.setItem('room', roomID.value)
                isConnecting ? isConnecting.value = true : null;

                getMedia()
            }
            }
            else{
                console.error('failed to get token')
            }
        } catch (error) {
            console.error("Room creation error:", error)
            callError.value = "Failed to create room"
            if(enableCall){enableCall.value = false;}
            cleanup()
        }
    }

    // debug

    watchEffect(() => {
        if (refVideo && partnerVideo.value && refVideo.value) {
            console.log('Partner video updated - checking streams:');
            console.log('Tracks:', partnerVideo.value.getTracks());

            refVideo.value.srcObject = partnerVideo.value;
            refVideo.value.play().catch(e => console.error('Playback error:', e));
        }
    });

    // Add this to check WebRTC connection state
    const checkConnectionState = () => {
        if (peerRef.value) {
            console.log('Current connection state:', peerRef.value.connectionState);
            console.log('ICE gathering state:', peerRef.value.iceGatheringState);
            console.log('Signaling state:', peerRef.value.signalingState);
            console.log('Senders:', peerRef.value.getSenders());
            console.log('Receivers:', peerRef.value.getReceivers());
        }
    };

    // Call this periodically or after significant events
    setInterval(checkConnectionState, 5000);

    // Watch effects
    watchEffect(() => {
        if (enableCall && enableCall.value && roomID && !roomID.value) {
            createRoom()
        } else if (enableCall && enableCall.value && roomID && roomID.value) {
            getMedia()
        }
    })

    watchEffect(() => {
        if (partnerVideo.value && refVideo && refVideo.value ) {
            console.log('new partnerVideo', partnerVideo.value)
            refVideo.value.srcObject = partnerVideo.value
            refVideo.value.play();
        }
    })

    watchEffect(() => {
        if (refUserVideo && yourVideo.value && refUserVideo.value) {
            refUserVideo.value.srcObject = yourVideo.value
            refUserVideo.value.muted = true;
            refUserVideo.value.play();
        }
    })

    // Cleanup on unmount
    onUnmounted(() => {
        clearInterval(5000) 
        cleanup()
        localStorage.removeItem('room')
    })

    
    // exported functions
    return { 
        toggleAudio,
        toggleVideo,
        startCall,
        endCall,
        getCallStatus 
    }
}
