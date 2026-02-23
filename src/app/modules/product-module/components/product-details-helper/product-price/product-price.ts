import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-price',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class ProductPrice {
  price = input.required<number>();
  discount = input.required<number>();
  originalPrice = input.required<number>();
}

// <section class="flex items-center gap-4 mb-6" aria-label="Product price and discount">
//       <div class="text-3xl font-extrabold text-gray-900">
//         ${{ price }}
//         <span class="text-sm text-gray-400 line-through">{{
//           originalPrice | currency: 'USD' : 'symbol' : '1.0-0'
//         }}</span>
//       </div>
//       <span class="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full">
//         -{{ discount | number: '1.0-0' }}%
//       </span>
//     </section>
