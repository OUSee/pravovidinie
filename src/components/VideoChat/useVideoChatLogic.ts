import { ref, type Ref, watchEffect, inject, onUnmounted } from 'vue'
import axios from "axios";
import callSound from '../../assets/skype-incoming.mp3'

export const useVideChatLogic = () => {
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
    const API_ACESS_ROUTE = inject<string>('API_ACESS_ROUTE')
    const API_ACESS_ROUTE_WS = inject<string>('API_ACESS_ROUTE_WS')
    const API_CREATE_ROOM = inject<string>('API_CREATE_ROOM')
    const isConnecting = inject<Ref<boolean>>('isConnecting')

    // WebRTC functions
    const createPeer = (): RTCPeerConnection => {
        const peer = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.relay.metered.ca:80" },
                {
                    urls: "turn:standard.relay.metered.ca:80",
                    username: "dd41ff40517c1c1a921b3a52",
                    credential: "x+5Oogy2z2lno+ca"
                }
            ]
        })

        if(!webSocketRef || !webSocketRef.value){
            console.error('no websocket connection')
            return peer
        }

        peer.onnegotiationneeded = () => handleNegotiationNeeded()
        peer.onicecandidate = (e) => {console.log('sending ice');e.candidate && webSocketRef.value?.send(JSON.stringify({ iceCandidate: e.candidate }))}
        peer.ontrack = (e) => {console.log('track event e.streams', e.streams);partnerVideo.value = e.streams[0]}

        return peer
    }

    const handleNegotiationNeeded = async () => {
        if (!peerRef.value || !webSocketRef) return

        try {
            const offer = await peerRef.value.createOffer()
            await peerRef.value.setLocalDescription(offer)
            console.log('sending offer ', peerRef.value.localDescription)
            webSocketRef.value?.send(JSON.stringify({ offer: peerRef.value.localDescription }))
        } catch (e) {
            console.error("Offer creation error:", e)
        }
    }

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        peerRef.value = createPeer()

        if (!peerRef.value || !userStream.value || !webSocketRef) return

        await peerRef.value.setRemoteDescription(new RTCSessionDescription(offer))
        userStream.value.getTracks().forEach(track => peerRef.value?.addTrack(track, userStream.value!))

        peerRef.value.ontrack = (e) => {
         partnerVideo.value = e.streams[0];
         console.log('Remote stream received', e.streams[0]);
        }

        const answer = await peerRef.value.createAnswer()
        await peerRef.value.setLocalDescription(answer)
        console.log('sending answer', peerRef.value.localDescription)
        webSocketRef.value?.send(JSON.stringify({ answer: peerRef.value.localDescription }))
    }

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
        peerRef.value?.close()
        peerRef.value = null
        userStream.value?.getTracks().forEach(track => track.stop())
        userStream.value = null
        yourVideo.value = null
        partnerVideo.value = null
        stopSound()

        if(!webSocketRef) return
        webSocketRef.value?.close()
        webSocketRef.value = null
    }



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
            webSocketRef.value = new WebSocket(API_ACESS_ROUTE_WS + `/join?roomID=${roomID.value}&token=${token}`)
        }
        else{
            console.log('websocket is set up already')
        }
    }

    const callUser = () => {
        try{
            if(webSocketRef && userStream.value && webSocketRef.value) {
                peerRef.value = createPeer();
                userStream.value.getTracks().forEach(track => peerRef.value?.addTrack(track, userStream.value!))
                
                webSocketRef.value.send(
                  JSON.stringify({
                    offer: peerRef.value.localDescription,
                  })
                );
                isConnecting ? isConnecting.value = false : null;
            }
            else{
                console.log('call aborted', 'sw: ', webSocketRef?.value,'userStream: ', userStream.value ,'peerRef', peerRef.value)
                isConnecting ? isConnecting.value = false : null;
            }
        }
        catch(error){
            console.log(error)
        }
    }

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

            webSocketRef.value?.send(JSON.stringify({ join: true }))     
        }

        // setInterval(() => {
        //     if (webSocketRef.value && webSocketRef.value.readyState === WebSocket.OPEN) {
        //       webSocketRef.value.send(JSON.stringify({ type: "ping" }));
        //     }
        // }, 5000);

        webSocketRef.value.onmessage = (e) => {
            const message = JSON.parse(e.data)

            console.log('ws message', message)

            if(message.status === 1){
                console.log('message get')
                callUser()
            }

            if (message.offer) {
                handleOffer(message.offer)
            } else if (message.answer) {
                peerRef.value?.setRemoteDescription(new RTCSessionDescription(message.answer))
            } else if (message.iceCandidate) {
                peerRef.value?.addIceCandidate(message.iceCandidate).catch(console.error)
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
