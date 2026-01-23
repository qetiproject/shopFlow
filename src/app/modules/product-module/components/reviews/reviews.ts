import { Component, input } from '@angular/core';
import { Review } from '../../types';

@Component({
  selector: 'product-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.html',
})
export class Reviews {
  reviews = input.required<Review[]>();
}
