import { Component } from '@angular/core';

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [],
  template: ` <section class="flex items-center gap-2 mb-6" aria-label="Stock status">
    <span class="w-2 h-2 rounded-full bg-green-500" aria-hidden="true"></span>
    <p class="text-green-600 font-medium">In stock & ready to ship</p>
  </section>`,
})
export class ProductStock {}
