
import { ref, type Ref, onMounted, onBeforeUnmount, inject } from 'vue'
import type { Message } from '../../types';

export const useConnectChatWebSocket =  () => {
//refs    
const ws = ref<WebSocket | null>(null);
const messages = inject<Ref<Message[]>>('messages');
const reconnectTokens = ref<number>(5)


// logic
const connectWebSocket = () => {
    ws.value = new WebSocket('ws://localhost:3000');

    ws.value.onopen = () => {
        console.log('Соединение установлено');
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
        console.log('Соединение закрыто, пытаемся переподключиться...');
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
        console.log('reconnect tries are expired, try reload the page')
    }
};



//lifesycle
onMounted(connectWebSocket);
onBeforeUnmount(() => {ws.value?.close();});



//export 
return {sendMessage}
}


