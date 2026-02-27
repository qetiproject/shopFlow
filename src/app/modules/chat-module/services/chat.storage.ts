import { Injectable } from '@angular/core';
import { IChatMessage } from '@chat-module';
import { STORAGE_KEYS } from '@core';

@Injectable({
  providedIn: 'root',
})
export class ChatStorage {
  saveChat(messages: IChatMessage[]): void {
    sessionStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
  }

  getChatMessages(): IChatMessage[] {
    const chat = sessionStorage.getItem(STORAGE_KEYS.CHAT);
    return chat ? JSON.parse(chat) : [];
  }

  clear(): void {
    sessionStorage.removeItem(STORAGE_KEYS.CHAT);
  }
}
