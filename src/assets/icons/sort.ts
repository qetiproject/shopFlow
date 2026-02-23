import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sort-svg',
  standalone: true,
  imports: [],
  template: ` <svg
    class="w-4 h-4"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 14"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      [attr.d]="path"
    />
  </svg>`,
})
export class SortSVG {
  @Input() path!: string;
}
