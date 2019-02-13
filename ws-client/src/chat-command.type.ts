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

export type ChatCommand =
  LoginChat
  | SendMessage
  | GetMessage
  | GetAllMessages
  ;

