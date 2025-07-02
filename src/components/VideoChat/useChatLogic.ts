
import { ref, type Ref, onMounted, onBeforeUnmount, inject, watchEffect } from 'vue'
import type { Message } from '../../types';

export const useConnectChatWebSocket =  () => {
//refs    
const ws = ref<WebSocket | null>(null);
const messages = inject<Ref<Message[]>>('messages');
const reconnectTokens = ref<number>(3);
const localStory = localStorage.getItem('messages');
const stored = localStory ? JSON.parse(localStory) : [];

const fetchStory = () => {
    // fetch

    if(messages !== undefined && (!messages?.value || messages?.value.length < 0)){
        messages.value = stored;
    }
}


// logic
const connectWebSocket = () => {
    try{
        ws.value = new WebSocket('ws://localhost:3000');
    }catch(err){
        console.error('Ошибка WebSocket', err)
        reconnect();
        return
    }

    ws.value.onopen = () => {
        console.log('chat connected');
    };

    ws.value.onmessage = (event) => {
        if (!messages) {
            console.error('messages is undef')
            return
        }
        try{
             messages.value.unshift(JSON.parse(event.data));
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

    
};

const sendMessage = (message: Message) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN && message) {
        ws.value.send(JSON.stringify(message));
    }
    console.log('new message: ', message)
    stored.push(message);
    localStorage.setItem('messages', JSON.stringify(stored))
};

const reconnect = () => {
    if(reconnectTokens.value > 0){
        setTimeout(() => {
            if (!ws.value || ws.value.readyState === WebSocket.CLOSED) {
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
onMounted(()=>{fetchStory();connectWebSocket()});
onBeforeUnmount(() => {ws.value?.close();});



//export 
return {sendMessage}
}


