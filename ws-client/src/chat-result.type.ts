import { ChatMessage } from './chat.type';

export interface LoginResult {
  type: 'login_result';
  success: boolean;
}

export interface NewMessageResult {
  type: 'new_message_result';
  id?: string;
}

export interface GetMessageResult {
  type: 'get_message_result';
  chat: ChatMessage;
}

export interface AllMessageResult {
  type: 'all_message_result';
  chats: ChatMessage[];
}

export interface UnknownMessageResult {
  type: 'unknown_message'
  payload: any
}

export type ChatResult =
  LoginResult
  | NewMessageResult
  | GetMessageResult
  | AllMessageResult
  | UnknownMessageResult
  ;
