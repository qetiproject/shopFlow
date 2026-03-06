import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-actions',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="flex gap-4 mb-10" aria-label="Product actions">
      <button
        (click)="addToCart.emit()"
        class="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-2xl shadow-lg transition active:scale-95"
      >
        Add to Cart
      </button>

      <button
        [routerLink]="['/checkout/shipping-info']"
        class="flex-1 border border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold py-4 rounded-2xl transition active:scale-95"
      >
        Buy Now
      </button>
    </section>
  `,
})
export class ProductActions {
  addToCart = output<void>();
}
