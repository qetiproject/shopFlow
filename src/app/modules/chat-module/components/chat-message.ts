import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IChatMessage } from '@chat-module';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex" [class.justify-end]="message()!.mine">
      <div
        class="px-4 py-2.5 text-sm max-w-[75%]"
        [ngClass]="
          message()!.mine
            ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-br-sm shadow-md'
            : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100'
        "
      >
        {{ message()!.text }}
      </div>
    </div>
  `,
})
export class ChatMessage {
  message = input<IChatMessage>();
}
