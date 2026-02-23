import { Component } from '@angular/core';

@Component({
  selector: 'app-arrow-down-svg',
  standalone: true,
  template: `
    <svg
      class="h-4 w-4 text-slate-400 transition-transform duration-200 group-focus:-rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  `,
})
export class ArrowDownSVG {}
