<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue'
// import { CallStatus } from '../../types'
import axios from "axios";
const refVideo = inject<any>('refVideo')
const refUserVideo = inject<any>('refUserVideo')
const enableCall = inject<any>('enableCall')
const webSocketRef = ref()
const yourVideo = ref()
const partnerVideo = ref()
const roomID = ref()
const userStream = ref();
const peerRef = ref();
const pingInterval = ref();
const startVideochat = ref()
const videoEnabled = ref()
const callStatus = ref('')
const notAnswered = ref<Boolean>(false)
const callError = ref<string>('')
const stopwatchSecondOffset = ref<Date>(new Date)
const guestBarEnabled = ref(false)
const callEnd = ref(false)
const isPlaying = ref(false)
const audioPlayer = ref<HTMLAudioElement | null>(null)
const callingSound = ref<any>(null)
const callCloseError = ref();
const startCall = ref();
const startRef = ref();
const guestVideoEnabled = ref();
const modalStatus = ref();
const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 10);
}

const token = generateRandomId()


const handleNegotiationNeeded = () => {
  // console.log("Creating Offer");
  peerRef.value
    .createOffer()
    .then((offer: any) => peerRef.value.setLocalDescription(offer))
    .then(() => {
      setTimeout(() => {
        // console.log("Candidates processing not ended. Ending it...");
        webSocketRef.value.send(
          JSON.stringify({ offer: peerRef.value.localDescription })
        );
      }, 1000);
    })
    .catch((e: any) => console.log(e));
};

const handleIceCandidateEvent = (e: any) => {
  // console.log("Found Ice Candidate");
  if (e.candidate) {
    webSocketRef.value.send(JSON.stringify({ iceCandidate: e.candidate }));
  }
};

const handleTrackEvent = (e: any) => {
  partnerVideo.value = e.streams[0];
};

const createPeer = () => {
  // console.log("Creating Peer Connection");
  const peer = new RTCPeerConnection({
    iceServers: [
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
    ],
  });

  peer.onnegotiationneeded = handleNegotiationNeeded;
  peer.onicecandidate = handleIceCandidateEvent;
  peer.ontrack = (e) => {
    handleTrackEvent(e);
  };
  return peer;
};

const handleOffer = async (offer: any) => {
  // console.log("Received Offer, Creating Answer");
  peerRef.value = createPeer();

  await peerRef.value.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  userStream.value.getTracks().forEach((track: any) => {
    peerRef.value.addTrack(track, userStream.value);
  });

  const answer = await peerRef.value.createAnswer();
  await peerRef.value.setLocalDescription(answer);

  webSocketRef.value.send(
    JSON.stringify({ answer: peerRef.value.localDescription })
  );
};

// const closeCamera = async () => {
//   if (userStream.value) {
//     userStream.value.getTracks().forEach((track: any) => {
//       if (track.readyState === "live") {
//         track.stop();
//       }
//     });
//   }
// };

const callUser = () => {
  // console.log("Calling Other User");
  peerRef.value = createPeer();

  userStream.value.getTracks().forEach((track: any) => {
    peerRef.value.addTrack(track, userStream.value);
  });

  // Обновленный поток отправляется после изменения состояния видео
  webSocketRef.value.send(
    JSON.stringify({
      offer: peerRef.value.localDescription,
    })
  );
};


const onClickClose = async (closeModal = false, reason: string = '') => {
  if (webSocketRef.value) {
    if (callError.value) {
      reason = callError.value;
    }
    webSocketRef.value.send(JSON.stringify({ close: true, reason }));
  }
  partnerVideo.value = null;
  peerRef.value = null;
  startVideochat.value = false;

  if (closeModal) {
    videoEnabled.value = true;
    // await dispatch(cancelVideoCall()); set all properties to null
    if (!guestBarEnabled.value) {
      // close videochat
    }
  }
  callEnd.value = true;
}

watchEffect(() => {
  if (callStatus.value === 'canceled') {
    notAnswered.value = true;
    callError.value = 'noAnswer';
    stopwatchSecondOffset.value = new Date;
    onClickClose(false, 'wait_end')
  }
})

// const disableCamera = async () => {
//   if (userStream.value) {
//     await userStream.value.getVideoTracks().forEach((track: any) => {
//       track.enabled = !videoEnabled.value
//     });
//   }
// }

const stopSound = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
    audioPlayer.value = null;
    isPlaying.value = false
  }
}

const playSound = () => {
  if (isPlaying.value === true) return;
  if (audioPlayer.value) {
    audioPlayer.value.play();
  } else {
    const audio = new Audio(callingSound.value)
    audio.loop = true;
    audio.play();
    audioPlayer.value = audio;
  }
}

watchEffect(() => {
  if (guestBarEnabled.value === true && notAnswered.value !== true) {
    playSound();
  }
})

watchEffect(() => {
  if (startVideochat.value === true) {
    stopSound()
  }
})

const getCallError = (message: string): string => {
  switch (message) {
    case "user_close":
      if (guestBarEnabled.value === true) {
        return ('no answer')
      }
      else {
        return ('end call')
      }
    case "camera_access":
      stopwatchSecondOffset.value = new Date();
      return "no answer";
    case "wait_end":
      stopwatchSecondOffset.value = new Date();
      return "no answer";
    case "dont_access":
      return "call not alive";
    default:
      return 'unhadeled exeption'
  }
}

const getMedia = async () => {
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

  openCamera().then((stream) => {
    if (webSocketRef.value !== undefined) {
      // console.log(webSocketRef.current);
      return;
    }
    webSocketRef.value = new WebSocket(
      `ws://localhost:8000/join?roomID=${roomID.value}&token=${token}`
    );
    webSocketRef.value.onopen = () => {
      if (stream === null) {
        callError.value = "decline camera";
        callCloseError.value = "camera_access";
        notAnswered.value = true
        return;
      }
      startCall.value = new Date()
      webSocketRef.value.send(JSON.stringify({ join: true }));
      userStream.value = stream;
      yourVideo.value = stream;
      pingInterval.value = setInterval(() => {
        if (webSocketRef.value && webSocketRef.value.readyState === WebSocket.OPEN) {
          webSocketRef.value.send(JSON.stringify({ type: "ping" }));
        }
      }, 5000);
      webSocketRef.value.addEventListener("message", async (e: any) => {
        const message = JSON.parse(e.data);

        //console.log("message", message);

        if (message.join) {
          callUser();
        }

        if (message.offer) {
          // console.log("Receiving offer");
          startVideochat.value = true
          stopwatchSecondOffset.value = new Date()
          handleOffer(message.offer);
          startRef.value = true;
        }

        if (message.answer) {
          startVideochat.value = true;
          startRef.value = true;
          stopwatchSecondOffset.value = new Date();
          peerRef.value.setRemoteDescription(
            new RTCSessionDescription(message.answer)
          );
          webSocketRef.value.send(
            JSON.stringify({ type: "video_status", status: videoEnabled })
          );
        }

        if (message.iceCandidate) {
          // console.log("Receiving and Adding ICE Candidate");
          try {
            await peerRef.value.addIceCandidate(message.iceCandidate);
          } catch (err) {
            // console.log("Error Receiving ICE Candidate", err);
          }
        }

        if (message.type === "call_end" || message.type === "call_error") {
          if (message.type === "call_error") {
            callError.value = message.message;
          } else {
            callError.value = getCallError(message.reason);
          }
          onClickClose();
        }

        if (message.type === "video_status") {
          guestVideoEnabled.value = message.status
        }

        if (message.is_guest) {
          guestVideoEnabled.value = message.is_guest
        }
      });
    };
    webSocketRef.value.onclose = () => {
      clearInterval(pingInterval.value)
    }
    webSocketRef.value.onerror = () => {
      clearInterval(pingInterval.value)
    }
  });
};

watchEffect(() => {
  if (modalStatus.value === true || enableCall.value === true) {
    callEnd.value = false;
    notAnswered.value = false;
    stopwatchSecondOffset.value = new Date();
    callError.value = '';
    startVideochat.value = (false);
    getMedia();
  }
})

watchEffect(() => {
  if (webSocketRef.value !== undefined) {
    webSocketRef.value.addEventListener("message", async (e: any) => {
      const message = JSON.parse(e.data);
      // console.log("message", message);
      if (message.answer) {
        // console.log("video_status", videoEnabled);
        webSocketRef.value.send(
          JSON.stringify({ type: "video_status", status: videoEnabled })
        );
      }
    });
  }
});

watchEffect(() => {
  if (partnerVideo !== null && partnerVideo !== undefined) {
    refVideo.srcObject = partnerVideo;
  }
});

const handleVideoStream = () => {
  if (yourVideo && refUserVideo.value) {
    console.log('Setting srcObject for yourVideo');
    yourVideo.value.getTracks().forEach((track: any) => {
      console.log(`Track ${track.kind} enabled:`, track.enabled);
      track.enabled = true;
    });
    refUserVideo.value.muted = true
    refUserVideo.value.srcObject = yourVideo;
  }
};

watchEffect(() => {
  if (yourVideo.value && !refUserVideo.value) {
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



const createVideoCallRoom = () => {
  const BASE_API_URL = `http://localhost:8000`;
  return axios.post(
    `${BASE_API_URL}/create`,
    { profile: 'test' },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const createRoom = () => {
  createVideoCallRoom()
    .then((response: any) => {
      if (!response.data.status) {
        console.warn('buisy')
        return;
      }
      if (response.data.room_id) {
        roomID.value = response.data.room_id;
        callStatus.value = response.data.status;
        localStorage.setItem('room', roomID.value);
        if (enableCall.value === true) {
          getMedia()
        }
      }
    })
    .catch((error: any) => {
      console.log('error: ', error);
    });
};

watchEffect(() => {
  const room = localStorage.getItem('room')
  if (enableCall.value === true && !room) {
    createRoom()
  }
  else {
    roomID.value = room
    callStatus.value = 'connected'
  }
})
</script>