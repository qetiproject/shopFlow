import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [],
  template: ` <section aria-label="Product rating" class="flex items-center gap-3 mb-6">
    <div class="flex text-yellow-400 text-lg" aria-hidden="true">
      {{ '★'.repeat(rating()) }}{{ '☆'.repeat(5 - rating()) }}
    </div>
    <span class="sr-only">{{ rating() }} out of 5 stars</span>
  </section>`,
})
export class ProductRating {
  rating = input.required<number>();
}
