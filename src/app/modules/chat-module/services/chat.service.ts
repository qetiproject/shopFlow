import { Injectable, inject, signal } from '@angular/core';
import { ChatSenderRoles, ChatStorage, IChatMessage } from '@chat-module';
import { ChatApi } from './chat.api';

@Injectable({ providedIn: 'root' })
export class ChatService {
  #chatStorage = inject(ChatStorage);
  messages = signal<IChatMessage[]>([]);
  #chatApi = inject(ChatApi);
  welcomeMessage = 'Hello 👋 How can I help you?';
  fallbackMessage = '';

  constructor() {
    const saved = this.#chatStorage.getChatMessages();

    if (saved.length === 0) {
      const welcome: IChatMessage = {
        id: crypto.randomUUID(),
        text: this.welcomeMessage,
        role: ChatSenderRoles.ASSISTANT,
        createdAt: new Date(),
      };

      this.messages.set([welcome]);
      this.persist();
    } else {
      this.messages.set(saved);
    }
  }

  sendMessage(text: string) {
    const userMessage: IChatMessage = {
      id: crypto.randomUUID(),
      text: text,
      role: ChatSenderRoles.USER,
      createdAt: new Date(),
    };
    this.messages.update((m) => [...m, userMessage]);
    this.persist();
    this.askAI(text);
  }

  private askAI(text: string) {
    this.#chatApi.aiChat(text).subscribe({
      next: (res) => {
        const botMessage: IChatMessage = {
          id: crypto.randomUUID(),
          text: res.reply,
          role: ChatSenderRoles.ASSISTANT,
          createdAt: new Date(),
        };

        this.messages.update((m) => [...m, botMessage]);
        this.persist();
      },
      error: (res) => {
        console.log(res, 'res');
        const fallback: IChatMessage = {
          id: crypto.randomUUID(),
          text: res.error.message,
          role: ChatSenderRoles.ASSISTANT,
          createdAt: new Date(),
        };

        this.messages.update((m) => [...m, fallback]);
        this.persist();
      },
    });
  }

  private persist() {
    this.#chatStorage.saveChat(this.messages());
  }

  clearMessages() {
    this.messages.set([]);
    this.#chatStorage.clear();
  }
}
