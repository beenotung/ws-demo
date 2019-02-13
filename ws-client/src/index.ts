import io from 'socket.io-client';
import { ChatResult } from './chat-result.type';
import { ChatDTO } from './chat.type';
import Socket = SocketIOClient.Socket;

const socket = io('ws://localhost:3000/chat');

export function sendMessage(dto: ChatDTO) {
  socket.emit('message', dto);
}

export function handler(socket: Socket, payload: ChatResult): void {
  switch (payload.type) {
    case 'login_result':
      console.log('login result:', payload.success);
      sendMessage({ type: 'send', message: 'Hi everyone' });
      sendMessage({ type: 'all' });
      return;
    case 'get_message_result':
      console.log('got message:', payload.chat);
      return;
    case 'all_message_result':
      console.log('all message:', payload.chats);
      return;
    case 'new_message_result':
      console.log('saved message:', payload.id);
      sendMessage({ type: 'get', id: payload.id });
      return;
    case 'unknown_message':
      console.log('sent unknown message:', payload.payload);
      return;
    default:
      console.log('unknown msg from server:', payload);
  }
}

socket.on('message', payload => {
  handler(socket, payload);
});
sendMessage({ type: 'login', username: 'beeno' });

