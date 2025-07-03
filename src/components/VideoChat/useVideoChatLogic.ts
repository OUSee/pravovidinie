import { ref, type Ref, watchEffect, inject, onUnmounted } from 'vue'
import axios from "axios";
import callSound from '../../assets/skype-incoming.mp3'

export const useVideChatLogic = () => {
    // Refs
    const refVideo = inject<Ref<HTMLVideoElement>>('refVideo')
    const refUserVideo = inject<Ref<HTMLVideoElement>>('refUserVideo')
    const enableCall = inject<Ref<boolean>>('enableCall')
    const webSocketRef = ref<WebSocket | null>(null)
    const yourVideo = ref<MediaStream | null>(null)
    const partnerVideo = ref<MediaStream | null>(null)
    const roomID = inject<Ref<string>>('')
    const userStream = ref<MediaStream | null>(null)
    const peerRef = ref<RTCPeerConnection | null>(null)
    const videoEnabled = ref(true)
    const audioEnabled = ref(true)
    // const callStatus = ref('')
    const callError = ref<string | null>(null)
    const audioPlayer = ref<HTMLAudioElement | null>(null)
    const isPlaying = ref(false)
    const token = inject<Ref<string>>('token')



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

        peer.onnegotiationneeded = () => handleNegotiationNeeded()
        peer.onicecandidate = (e) => e.candidate && webSocketRef.value?.send(JSON.stringify({ iceCandidate: e.candidate }))
        peer.ontrack = (e) => partnerVideo.value = e.streams[0]

        return peer
    }

    const handleNegotiationNeeded = async () => {
        if (!peerRef.value) return

        try {
            const offer = await peerRef.value.createOffer()
            await peerRef.value.setLocalDescription(offer)
            webSocketRef.value?.send(JSON.stringify({ offer: peerRef.value.localDescription }))
        } catch (e) {
            console.error("Offer creation error:", e)
        }
    }

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        peerRef.value = createPeer()

        if (!peerRef.value || !userStream.value) return

        await peerRef.value.setRemoteDescription(new RTCSessionDescription(offer))
        userStream.value.getTracks().forEach(track => peerRef.value?.addTrack(track, userStream.value!))

        const answer = await peerRef.value.createAnswer()
        await peerRef.value.setLocalDescription(answer)
        webSocketRef.value?.send(JSON.stringify({ answer: peerRef.value.localDescription }))
    }

    const startCall = async () => {
        if (roomID && !roomID.value) {
            await createRoom()
        }
        else {
            await getMedia()
        }
        playSound()
    }

    const getCallStatus = () => {
        return {
            isActive: !!peerRef.value,
            videoEnabled: videoEnabled.value,
            audioEnabled: audioEnabled.value,
            error: callError.value
        }
    }



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
        webSocketRef.value?.close()
        webSocketRef.value = null
        stopSound()
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

    // Media initialization
    const getMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: videoEnabled.value
            })

            userStream.value = stream
            yourVideo.value = stream

            if (refUserVideo) {
                refUserVideo.value.srcObject = stream
            }

            setupWebSocket()
        } catch (error) {
            console.error("Media access error:", error)
            callError.value = "Media access denied"
        }
    }

    const setupWebSocket = () => {
        if(!roomID){
            console.error('room id not provided')
            return
        }
        webSocketRef.value = new WebSocket(`ws://localhost:8000/api/join?roomID=${roomID.value}&token=${token}`)

        webSocketRef.value.onopen = () => {
            webSocketRef.value?.send(JSON.stringify({ join: true }))
            stopSound();
        }

        webSocketRef.value.onmessage = (e) => {
            const message = JSON.parse(e.data)

            if (message.offer) {
                handleOffer(message.offer)
            } else if (message.answer) {
                peerRef.value?.setRemoteDescription(new RTCSessionDescription(message.answer))
            } else if (message.iceCandidate) {
                peerRef.value?.addIceCandidate(message.iceCandidate).catch(console.error)
            } else if (message.close) {
                callError.value = "Call ended"
                cleanup()
            }
        }

        webSocketRef.value.onclose = cleanup
        webSocketRef.value.onerror = () => {
            callError.value = "Connection error"
            cleanup()
        }
    }



    // Room management
    const createRoom = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/create`,
                { profile: 'test' },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (roomID && response.data.room_id) {
                roomID.value = response.data.room_id
                localStorage.setItem('room', roomID.value)
                getMedia()
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
            refVideo.value.srcObject = partnerVideo.value
        }
    })

    watchEffect(() => {
        if (refUserVideo && yourVideo.value && refUserVideo.value) {
            refUserVideo.value.srcObject = yourVideo.value
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
