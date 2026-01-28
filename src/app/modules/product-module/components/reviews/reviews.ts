import { Component, input } from '@angular/core';
import { Review } from '../../types';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.html',
})
export class Reviews {
  reviews = input.required<Review[]>();
}
