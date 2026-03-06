import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <span class="inline-block text-xs uppercase tracking-wide text-pink-500 font-semibold mb-2">
        Beauty Product
      </span>
      <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-3">
        {{ title() }}
      </h1>
    </header>
  `,
})
export class ProductHeader {
  title = input.required<string>();
}
