import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ChatSVG } from 'assets/icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [ChatSVG],
  template: `
    @if (!isChatOpen()) {
      <button
        class="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 
               rounded-full flex items-center justify-center shadow-xl 
               hover:cursor transition z-50"
        aria-label="Open chat"
        (click)="openChat()"
      >
        <app-chat-svg></app-chat-svg>
      </button>
    }
  `,
})
export class ChatButton {
  #router = inject(Router);

  isChatOpen = signal(false);

  constructor() {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const tree = this.#router.parseUrl(this.#router.url);
      this.isChatOpen.set(!!tree.root.children['chat']);
    });
  }

  openChat() {
    this.#router.navigate([{ outlets: { chat: ['chat'] } }]);
  }
}
