import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product-price',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex items-center gap-4 mb-6" aria-label="Product price and discount">
      <div class="text-3xl font-extrabold text-gray-900">
        {{ price() | currency: 'USD' : 'symbol' : '1.0-0' }}

        @if (originalPrice() > price()) {
          <span class="text-sm text-gray-500 line-through ml-2">
            {{ originalPrice() | currency: 'USD' : 'symbol' : '1.0-0' }}
          </span>
        }
      </div>

      @if (discount() > 0) {
        <span class="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full">
          -{{ discount() | number: '1.0-0' }}%
        </span>
      }
    </section>
  `,
})
export class ProductPrice {
  readonly price = input.required<number>();
  readonly discount = input.required<number>();
  readonly originalPrice = input.required<number>();
}
