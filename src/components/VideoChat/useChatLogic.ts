
import { ref, type Ref, onMounted, onBeforeUnmount, inject, watchEffect } from 'vue'
import type { Message } from '../../types';
import axios from 'axios';

export const useConnectChatWebSocket =  () => {
//refs    
const ws = inject<Ref<WebSocket | null>>('webSocketRef');
const messages = inject<Ref<Message[]>>('messages');
const reconnectTokens = ref<number>(3);
const localStory = localStorage.getItem('messages');
const stored = localStory ? JSON.parse(localStory) : [];
const roomID = inject<Ref<string>>('roomID');
const user = inject<any>('user')
const API_ACESS_ROUTE = inject<string>('API_ACESS_ROUTE')

const fetchStory = () => {
    // fetch

    if(messages !== undefined && (!messages?.value || messages?.value.length < 0)){
        messages.value = stored;
    }
}


// logic
const connectWebSocket = () => {
    if(ws && ws.value){
        ws.value.onopen = () => {
            console.log('chat connected');
        };

        ws.value.onmessage = (event) => {
        if (!messages) {
            console.error('messages is undef')
            return
        }
        try{
            const receive = JSON.parse(event.data)
            const incoming_message: Message = {
                text: receive,
                from: receive.sender.id,
                seen:  undefined,
                timestamp:  undefined,
                id:  undefined,
            }
            messages.value.unshift(incoming_message);
        }catch(err){
            console.error('failed to parse message data')
        }
        };

        ws.value.onclose = () => {
        console.warn('Соединение закрыто, пытаемся переподключиться...');
        reconnect();
        };

        ws.value.onerror = (error) => {
        console.error('Ошибка WebSocket', error);
        };
    }
    else(
        console.log('no websocket connection')
    )
};

const sendMessage = async (message: Message) => {
    if (ws && ws.value && ws.value.readyState === WebSocket.OPEN && message) {
        ws.value.send(JSON.stringify(message));
    }
    console.log('new message: ', message)
    console.log('stored', stored)
    stored.push(message);
    localStorage.setItem('messages', JSON.stringify(stored))

    if(user){
        console.log(user.value)
        try{
            const response: any = await axios.post(API_ACESS_ROUTE + `/api/message`,
        {
            body: {
                sender_id: JSON.parse(user.value)?.id,
                message_text: message.text,
                room_id: roomID
            }
        })
        if(!response){
            console.error('no responce')
        }
        }catch(error){
            console.error(error)
        }
    }
    
};

const reconnect = () => {
    if(reconnectTokens.value > 0){
        setTimeout(() => {
            if (ws && (!ws.value || ws.value.readyState === WebSocket.CLOSED)) {
              connectWebSocket();
            }
        }, 3000);
    reconnectTokens.value--
    }
    else{
        console.warn('reconnect tries are expired, try reload the page')
    }
};

watchEffect(()=>{
    if(messages){
        if(messages.value.length > stored.length){
            messages.value.forEach((message: Message) => {
                stored.forEach((stored_message : Message)=> {
                    if(message.id !== stored_message.id){
                        stored.push(message)
                    }
                });
            })
        }
        else if(stored.length > messages.value.length){
            stored.forEach((stored_message: Message) => {
                messages.value.forEach((message : Message)=> {
                    if(message.id !== stored_message.id){
                        stored.push(message)
                    }
                });
            })
        }
        messages.value = stored
    }
})

//lifesycle
onMounted(()=>{
    if(roomID?.value !== '' && roomID?.value){
         fetchStory();
         connectWebSocket();
    }
});
onBeforeUnmount(() => {if(ws){ws.value?.close();}});



//export 
return {sendMessage}
}


