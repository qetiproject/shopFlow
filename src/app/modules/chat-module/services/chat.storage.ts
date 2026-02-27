import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '@core';

export interface ChatMessage {
  text: string;
  mine: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatStorage {
  saveChat(messages: ChatMessage[]): void {
    sessionStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
  }

  getChatMessages(): ChatMessage[] {
    const chat = sessionStorage.getItem(STORAGE_KEYS.CHAT);
    return chat ? JSON.parse(chat) : [];
  }

  clear(): void {
    sessionStorage.removeItem(STORAGE_KEYS.CHAT);
  }
}
