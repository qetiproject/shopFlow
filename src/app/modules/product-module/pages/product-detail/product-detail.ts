import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  #route = inject(ActivatedRoute);
  productDetails = toSignal(this.#route.data.pipe(map((d) => d['product'])), {
    initialValue: null,
  });
}
