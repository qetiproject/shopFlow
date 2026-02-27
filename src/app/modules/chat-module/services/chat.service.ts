import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ChatSenderRoles, ChatStorage, IChatMessage } from '@chat-module';
import { environment } from '@env-dev';

@Injectable({ providedIn: 'root' })
export class ChatService {
  #chatStorage = inject(ChatStorage);
  messages = signal<IChatMessage[]>([]);
  #http = inject(HttpClient);
  welcomeMessage = 'Hello 👋 How can I help you?';
  fallbackMessage =
    'Unfortunately, I am unable to answer at this stage. Please leave your number and a manager will contact you.';

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
    this.#http
      .post<{ reply: string }>(`${environment.api}/api/ai-chat`, { message: text })
      .subscribe({
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
        error: () => {
          const fallback: IChatMessage = {
            id: crypto.randomUUID(),
            text: this.fallbackMessage,
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
