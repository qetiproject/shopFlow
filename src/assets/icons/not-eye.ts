import { Component } from '@angular/core';

@Component({
  selector: 'app-not-eye-svg',
  standalone: true,
  imports: [],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.965 9.965 0 012.592-4.264m3.65-2.282A9.959 9.959 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.961 9.961 0 01-4.121 5.066M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
    </svg>
  `,
})
export class NotEyeSVG {}
