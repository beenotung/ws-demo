export interface LoginChat {
  type: 'login';
  username: string;
}

export interface SendMessage {
  type: 'send';
  message: string;
}

export interface GetMessage {
  type: 'get';
  id: string;
}

export interface GetAllMessages {
  type: 'all';
}

export type ChatDTO =
  LoginChat
  | SendMessage
  | GetMessage
  | GetAllMessages
  ;

export interface ChatMessage {
  author: string;
  message: string;
}
