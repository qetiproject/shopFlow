import { Component, Input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="p-4 border-t border-gray-100 bg-white/80">
      <div
        class="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition"
      >
        <input
          [formControl]="control"
          (keyup.enter)="send.emit()"
          class="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-400"
          placeholder="Write a message..."
        />
        <button
          (click)="send.emit()"
          [disabled]="control.invalid"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 text-white shadow-md hover:scale-105 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ➤
        </button>
      </div>
    </div>
  `,
})
export class ChatInput {
  @Input() control!: FormControl;
  send = output<void>();
}
