export enum ChatSenderRoles {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface IChatMessage {
  id: string;
  role: ChatSenderRoles;
  text: string;
  createdAt: Date;
}
