import { ref, type Ref, watchEffect, inject, watch } from 'vue'
import axios from "axios";
import callSound from '../../assets/skype-incoming.mp3'


export const useVideouChat = () => {
    // refs
    const refVideo = inject<Ref<HTMLVideoElement>>('refVideo')
    const refUserVideo = inject<Ref<HTMLVideoElement>>('refUserVideo')
    const enableCall = inject<Ref<boolean>>('enableCall')
    const webSocketRef = inject<Ref<WebSocket | null>>('webSocketRef')
    // const yourVideo = ref<MediaStream | null>(null)
    const partnerStream = ref<MediaStream | null>(null)
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
    const pingInterval = ref<any>();

    const ICE_SERVERS = [
        {
            urls: "stun:stun.relay.metered.ca:80",
        },
        {
            urls: "turn:standard.relay.metered.ca:80",
            username: "dd41ff40517c1c1a921b3a52",
            credential: "x+5Oogy2z2lno+ca",
        },
        {
            urls: "turn:standard.relay.metered.ca:80?transport=tcp",
            username: "dd41ff40517c1c1a921b3a52",
            credential: "x+5Oogy2z2lno+ca",
        },
        {
            urls: "turn:standard.relay.metered.ca:443",
            username: "dd41ff40517c1c1a921b3a52",
            credential: "x+5Oogy2z2lno+ca",
        },
        {
            urls: "turns:standard.relay.metered.ca:443?transport=tcp",
            username: "dd41ff40517c1c1a921b3a52",
            credential: "x+5Oogy2z2lno+ca",
        },
    ]

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

    const openCamera = async () => {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const cameras = allDevices.filter(
        (device) => device.kind === "videoinput"
        );
        if (cameras.length === 0) {
        console.error("No devices found");
        return null;
        }
        const constraints = {
        audio: true,
        video: videoEnabled ? { deviceId: cameras[0].deviceId } : false,
        };
        return navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            return stream;
        })
        .catch((error) => {
            console.error("media error" + ":", error);
            return null;
        });
    };

    const getMedia = async () => {
        try {
            openCamera().then((stream)=>{
                
            })
        } catch (error) {
            console.error("Media access error:", error)
            callError.value = "Media access denied"
        }
    }

    const handleNegotiationNeeded = () => {
        if(!peerRef || !peerRef.value || !webSocketRef || !webSocketRef.value) return
        peerRef.value
            .createOffer()
            .then((offer: any) => peerRef.value?.setLocalDescription(offer))
            .then(() => {
            setTimeout(() => {
                // console.log("Candidates processing not ended. Ending it...");
                webSocketRef.value?.send(
                JSON.stringify({ offer: peerRef.value?.localDescription })
                );
            }, 1000);
            })
            .catch((e: any) => console.log(e));
    };

    const handleIceCandidateEvent = (e: any) => {
    // console.log("Found Ice Candidate");
        if (e.candidate && webSocketRef) {
            webSocketRef.value?.send(JSON.stringify({ iceCandidate: e.candidate }));
        }
    };

    const handleTrackEvent = (e: any) => {
        partnerStream.value = e.streams[0];
    }

    const handleOffer = async (offer: RTCSessionDescription) =>{
        peerRef.value = createPeer()

        await peerRef.value.setRemoteDescription(
            new RTCSessionDescription(offer)
        )

        if (userStream.value) {
            const videoTrack = userStream.value.getVideoTracks()[0];
            const audioTrack = userStream.value.getAudioTracks()[0];

            if (videoTrack) {
                peerRef.value.addTransceiver(videoTrack, { direction: 'sendrecv' });
            }
            if (audioTrack) {
                peerRef.value.addTransceiver(audioTrack, { direction: 'sendrecv' });
            }
        }

        const answer = await peerRef.value.createAnswer();
        await peerRef.value.setLocalDescription(answer);
        
        webSocketRef && webSocketRef.value &&  webSocketRef.value.send(
            JSON.stringify({ answer: peerRef.value.localDescription })
        );
        stopSound()
    }

    const createPeer = (): RTCPeerConnection => {
        const peer = new RTCPeerConnection({
            iceServers: ICE_SERVERS
        })

        peer.ontrack = (e) => {
            handleTrackEvent(e)
        };

        peer.onnegotiationneeded = handleNegotiationNeeded;
        peer.onicecandidate = handleIceCandidateEvent;


        return peer;
    }

    const setupConnection = () => {
        if(webSocketRef && !webSocketRef.value && roomID){
            try{
                webSocketRef.value = new WebSocket(API_ACESS_ROUTE_WS + `/join?roomID=${roomID.value}&token=${token?.value}`)
            }catch(err){
                console.error('error setting websocket', err)
            }
        }
        else{
            console.log('websocket is set up already or check roomID:', roomID)
        }
    }

    const callUser = () => {
    // console.log("Calling Other User");
        peerRef.value = createPeer();

        if(userStream && userStream.value){
            if (userStream.value) {
                const videoTrack = userStream.value.getVideoTracks()[0];
                const audioTrack = userStream.value.getAudioTracks()[0];
                
                if (videoTrack) {
                    peerRef.value.addTransceiver(videoTrack, { direction: 'sendrecv' });
                }
                if (audioTrack) {
                    peerRef.value.addTransceiver(audioTrack, { direction: 'sendrecv' });
                }
            }

            // Обновленный поток отправляется после изменения состояния видео
            webSocketRef &&  webSocketRef.value && 
            webSocketRef.value.send(
                JSON.stringify({
                offer: peerRef.value.localDescription,
                })
            );
        }
    };

    const websocketHandler = async () => {
        if(webSocketRef && webSocketRef.value){
        webSocketRef.value.onopen = () => {
            webSocketRef.value?.send(JSON.stringify({ join: true }))
            console.log('ws open join send', webSocketRef.value)
            pingInterval.value = setInterval(() => {
              if (webSocketRef.value && webSocketRef.value.readyState === WebSocket.OPEN) {
                webSocketRef.value.send(JSON.stringify({ type: "ping" }));
              }
            }, 5000);
        }

        webSocketRef.value.onmessage = async (e) => {
            const message = JSON.parse(e.data)
            console.log('ws messege received', message)

            if (message.offer) {
                handleOffer(message.offer);    
            } else if (message.answer) {
                if(peerRef && peerRef.value)
                {
                    peerRef.value.setRemoteDescription(
                      new RTCSessionDescription(message.answer)
                    );
                    webSocketRef && webSocketRef.value && webSocketRef.value.send(
                        JSON.stringify({ type: "video_status", status: videoEnabled })
                    );
                }
                else(
                    console.error('error processing answer no peer connection')
                )
            } else if (message.iceCandidate) {
                try {
                    await peerRef && peerRef.value && peerRef.value.addIceCandidate(message.iceCandidate);
                } catch (err) {
                    console.error("Error Receiving ICE Candidate", err);
                }        
            } else if (message.join) {
                callUser()
            } else if (message.type === "call_end" || message.type === "call_error"){
                callError.value = message.message
            }
        }

        webSocketRef.value.onclose = () => { clearInterval(pingInterval.value) }
        webSocketRef.value.onerror = (e) => {callError.value = "Connection error"; console.error('ERROR WS: ', e); clearInterval(pingInterval.value)}
       } 
    }

    const initCall = () => {
        getMedia();
        setupConnection();
        websocketHandler();
    }

    const createRoom = async () => {
        try {
            const user = localStorage.getItem('user')
            const room = localStorage.getItem('room')
            if(room && roomID){
                roomID.value = room
                return;
            }
            if(user){
                const {token} = JSON.parse(user)
            
            // http://api.xn--80aeaifasc8bfim.xn--p1ai/api/create
            const response = await axios.post(API_CREATE_ROOM + `/create`,
                { profile: 'test' },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (roomID && response.data.room_id) {
                roomID.value = response.data.room_id
                localStorage.setItem('room', roomID.value)
                isConnecting ? isConnecting.value = true : null;

                initCall()
            }
            }
            else{
                console.error('failed to get token')
            }
        } catch (error) {
            console.error("Room creation error:", error)
            callError.value = "Failed to create room"
            if(enableCall){enableCall.value = false;}
        }
    }

    // обзервер для инициализации если вдруг элемент видео еще не существует
    const handleVideoStream = () => {
        if (userStream.value) {
            console.log('Setting srcObject for yourVideo');
            userStream.value.getTracks().forEach((track: any) => {
                console.log(`Track ${track.kind} enabled:`, track.enabled);
                track.enabled = true;
            });
            refUserVideo && refUserVideo.value 
            ? () => {
                    refUserVideo.value.srcObject = userStream.value; 
                    refUserVideo.value.muted = true; 
                    refUserVideo.value.play()
                } 
            : null;    
        }
    };

    watchEffect(() => {
    if (userStream.value && refUserVideo && !refUserVideo.value) {
        const observer = new MutationObserver(() => {
        if (refUserVideo.value) {
            handleVideoStream();
            observer.disconnect();
        }
        });

        observer.observe(document.body, {
        childList: true,
        subtree: true
        });

        return () => observer.disconnect();
    }
    })

    watchEffect(() => {
        if (callError.value !== null) {
            console.log('ERR: ', callError.value)
            stopSound()
        }
    })

    watch(partnerStream, (value, prevValue) => {
        if(refVideo){
            console.log('new partner stream =', value)
            refVideo.value.srcObject = value;
            refVideo.value.muted = true // just in case
            refVideo.value.play()
        }
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

    const endCall = (reason: string) => {
        webSocketRef && webSocketRef.value && webSocketRef.value.send(JSON.stringify({ close: true, reason }));
        partnerStream.value = null;
        peerRef.value = null;
    }

    const startCall = () => {
        playSound()
        createRoom()
    }

    return { 
        startCall,
        endCall,
        toggleAudio,
        toggleVideo
    }

    
}