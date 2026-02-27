import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatSVG } from 'assets/icons';

@Component({
  selector: 'app-chat-button',
  standalone: true,
  imports: [ChatSVG],
  template: `<button
    class="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-xl hover:cursor z-50"
    aria-label="Open chat"
    (click)="openChat()"
  >
    <app-chat-svg></app-chat-svg>
  </button> `,
})
export class ChatButton {
  #router = inject(Router);

  openChat() {
    this.#router.navigate([{ outlets: { chat: ['chat'] } }]);
  }
}
