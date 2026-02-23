import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '@cart-module';
import { MessagesService } from '@core';
import { Product, Review, Reviews } from '@product-module';
import { MessageSeverity } from '@types';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, Reviews],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  #route = inject(ActivatedRoute);
  #cartFacade = inject(CartFacade);
  #messages = inject(MessagesService);

  productDetails = toSignal<Product>(this.#route.data.pipe(map((d) => d['product'])), {
    initialValue: null,
  });

  get averageRating(): number {
    const reviews = this.productDetails()!.reviews;
    if (!reviews?.length) return 0;

    const sum = reviews.reduce((acc: number, curr: Review) => acc + curr.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  get startPrice(): number {
    return this.productDetails()!.price / (1 - this.productDetails()!.discountPercentage / 100);
  }

  addToCart(product: Product): void {
    const success = this.#cartFacade.addProductInCart(product, 1);

    if (success) {
      this.#messages.showMessage({
        text: 'Product added successfully into the cart',
        severity: MessageSeverity.Success,
      });
    }
  }
}
