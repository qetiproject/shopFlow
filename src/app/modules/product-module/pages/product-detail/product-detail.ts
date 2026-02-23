import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '@cart-module';
import { MessagesService } from '@core';
import { Product } from '@product-module';
import { MessageSeverity } from '@types';
import { BackButtonComponent } from 'app/components/back-button/back-button.component';
import { map } from 'rxjs';
import { ProductImages } from '../../components/product-details-helper/product-images/product-images';
import { ProductReviews } from '../../components/product-details-helper/product-reviews/product-reviews';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, ProductImages, ProductReviews],
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
