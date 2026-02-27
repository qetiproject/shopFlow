import { Component, input, output, signal } from '@angular/core';
import { RemoveSVG } from 'assets/icons';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [RemoveSVG],
  template: `
    <div class="px-5 py-4 flex items-center justify-between border-b border-gray-100 bg-white/70">
      <h3 class="text-sm font-semibold text-gray-800">{{ title() }}</h3>
      <button
        (click)="closeIcon.emit()"
        class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
      >
        <app-remove-svg customClasses="h-6 w-6" />
      </button>
    </div>
  `,
})
export class ChatHeader {
  title = input<string>('');
  customClasses = signal<string>('h-6 w-6');
  closeIcon = output<void>();
}
