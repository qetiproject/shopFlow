import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ChatStorage, IChatMessage } from '@chat-module';
import { environment } from '@env-dev';

@Injectable({ providedIn: 'root' })
export class ChatService {
  #chatStorage = inject(ChatStorage);
  messages = signal<IChatMessage[]>([]);
  #http = inject(HttpClient);

  constructor() {
    const saved = this.#chatStorage.getChatMessages();

    if (saved.length === 0) {
      const welcome: IChatMessage = {
        text: 'მოგესალმებით 👋 რით შემიძლია დაგეხმაროთ?',
        mine: false,
      };

      this.messages.set([welcome]);
      this.#chatStorage.saveChat([welcome]);
    } else {
      this.messages.set(saved);
    }
  }

  sendMessage(text: string) {
    const userMessage: IChatMessage = { text, mine: true };
    this.messages.update((m) => [...m, userMessage]);
    this.#chatStorage.saveChat(this.messages());
    this.askAI(text);
  }

  private askAI(text: string) {
    this.#http
      .post<{ reply: string }>(`${environment.api}/api/ai-chat`, { message: text })
      .subscribe({
        next: (res) => {
          const botMessage: IChatMessage = {
            text: res.reply,
            mine: false,
          };

          this.messages.update((m) => [...m, botMessage]);
          this.#chatStorage.saveChat(this.messages());
        },
        error: () => {
          const fallback: IChatMessage = {
            text: 'სამწუხაროდ ამ ეტაპზე პასუხი ვერ გავეცი. გთხოვთ დატოვოთ თქვენი ნომერი და მენეჯერი დაგიკავშირდებათ.',
            mine: false,
          };

          this.messages.update((m) => [...m, fallback]);
          this.#chatStorage.saveChat(this.messages());
        },
      });
  }

  clearMessages() {
    this.messages.set([]);
    this.#chatStorage.clear();
  }
}
