
import { Component, input, output } from '@angular/core';
import {
  Product,
  ProductActions,
  ProductHeader,
  ProductPrice,
  ProductRating,
  ProductShipping,
  ProductStock,
  ProductTags,
  Review,
} from '@product-module';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    ProductRating,
    ProductPrice,
    ProductStock,
    ProductShipping,
    ProductActions,
    ProductTags,
    ProductHeader
],
  templateUrl: './product-info.html',
})
export class ProductInfo {
  product = input.required<Product>();
  addToCart = output<void>();

  get averageRating(): number {
    const reviews = this.product()?.reviews;
    if (!reviews?.length) return 0;

    const sum = reviews.reduce((acc: number, curr: Review) => acc + curr.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  get startPrice(): number {
    const discount = this.product()?.discountPercentage ?? 0;
    return discount ? this.product()!.price / (1 - discount / 100) : this.product()!.price;
  }
}
