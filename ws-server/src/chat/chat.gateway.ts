import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Socket } from 'socket.io';
import { ChatCommand, ChatMessage } from './chat-command.type';
import { ChatResult } from './chat-result.type';

export let chats: ChatMessage[] = [];

export interface Session {
  socket: Socket;
  username: string;
}

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements NestGateway {
  sessions = new Map<string, Session>();

  @SubscribeMessage('message')
  handleMessage(socket: Socket, payload: ChatCommand): string {
    const result = this.handler(socket, payload);
    socket.emit('message', result);
    if (typeof result === 'string') {
      return result;
    } else {
      return JSON.stringify(result);
    }
  }

  handler(socket: Socket, payload: ChatCommand): ChatResult {
    switch (payload.type) {
      case 'login':
        this.sessions.set(socket.id, {
          socket,
          username: payload.username,
        });
        return { type: 'login_result', success: true };
      case 'send':
        chats.push({
          author: this.sessions.get(socket.id).username,
          message: payload.message,
        });
        return { type: 'new_message_result', id: String(chats.length - 1) };
      case 'get':
        return chats[payload.id];
      case 'all':
        return { type: 'all_message_result', chats };
      default:
        console.log('unknown message:', payload);
        return { type: 'unknown_message', payload };
    }

  }

  afterInit(server: Socket): void {
    // console.log('afterInit');
  }

  handleConnection(socket: Socket): void {
    console.log('connection:', {
      id: socket.id,
      address: socket.handshake.address,
    });
  }

  handleDisconnect(socket: Socket): void {
    console.log('disconnect:', {
      id: socket.id,
      address: socket.handshake.address,
    });
  }
}
