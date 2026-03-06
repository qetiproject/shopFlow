import { Component, input } from '@angular/core';
import { Review } from '@product-module/types/product';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [],
  templateUrl: './product-reviews.html',
})
export class ProductReviews {
  reviews = input.required<Review[]>();
}
