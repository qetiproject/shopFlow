
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '@cart-module/services/cart.facade';
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { MessagesService } from '@core/services/messages.service';
import { Product } from '@product-module/types/product';
import { ProductImages } from '@product-module/components/product-details-helper/product-images/product-images';
import { ProductInfo } from '@product-module/components/product-details-helper/product-info/product-info';
import { ProductReviews } from '@product-module/components/product-details-helper/product-reviews/product-reviews';
import { MessageSeverity } from '@types';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [BackButtonComponent, ProductImages, ProductReviews, ProductInfo],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  #route = inject(ActivatedRoute);
  #cartFacade = inject(CartFacade);
  #messages = inject(MessagesService);

  productDetails = toSignal<Product>(this.#route.data.pipe(map((d) => d['product'])), {
    initialValue: null,
  });

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
