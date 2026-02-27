import { Injectable, inject, signal } from '@angular/core';
import { ChatStorage, IChatMessage } from '@chat-module';

@Injectable({ providedIn: 'root' })
export class ChatService {
  #chatStorage = inject(ChatStorage);
  messages = signal<IChatMessage[]>(this.#chatStorage.getChatMessages());

  sendMessage(text: string) {
    this.messages.update((m) => [...m, { text, mine: true }]);
    this.#chatStorage.saveChat(this.messages());
    this.fakeReply();
  }

  private fakeReply() {
    setTimeout(() => {
      this.messages.update((m) => [...m, { text: 'Thanks for your message 👋', mine: false }]);
      this.#chatStorage.saveChat(this.messages());
    }, 600);
  }

  clearMessages() {
    this.messages.set([]);
    this.#chatStorage.clear();
  }
}
