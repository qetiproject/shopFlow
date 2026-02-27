import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-svg',
  standalone: true,
  imports: [],
  template: `
    <div
      class="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-transform duration-200 cursor-pointer"
      title="Chat with us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M2 3.993C2 2.893 2.897 2 3.993 2H20.007C21.107 2 22 2.897 22 3.993v16.014c0 1.1-.897 1.993-1.993 1.993H6l-4 4V3.993z"
        />
        <circle cx="8" cy="12" r="1.5" fill="white" />
        <circle cx="12" cy="12" r="1.5" fill="white" />
        <circle cx="16" cy="12" r="1.5" fill="white" />
      </svg>
    </div>
  `,
})
export class ChatSVG {}
