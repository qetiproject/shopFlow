import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [NgClass],
  template: `
    <svg
      [ngClass]="size()"
      class="shrink-0"
      fill="none"
      stroke="black"
      [attr.stroke-width]="strokeWidth()"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4
           M7 13l-2 7
           M17 13l2 7
           M9 21a1 1 0 100-2
           M17 21a1 1 0 100-2"
      />
    </svg>
  `,
})
export class CartIcon {
  strokeWidth = input(1.5);
  size = input('w-5 h-5');
}
