
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product, Review } from '@product-module/types/product';
import { ProductActions } from '@product-module/components/product-details-helper/product-actions/product-actions';
import { ProductHeader } from '@product-module/components/product-details-helper/product-header/product-header';
import { ProductPrice } from '@product-module/components/product-details-helper/product-price/product-price';
import { ProductRating } from '@product-module/components/product-details-helper/product-rating/product-rating';
import { ProductShipping } from '@product-module/components/product-details-helper/product-shipping/product-shipping';
import { ProductStock } from '@product-module/components/product-details-helper/product-stock/product-stock';
import { ProductTags } from '@product-module/components/product-details-helper/product-tags/product-tags';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
