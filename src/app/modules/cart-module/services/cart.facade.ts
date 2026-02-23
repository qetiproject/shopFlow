import { Injectable, inject } from '@angular/core';
import { AddToCartRequest, CartStore } from '@cart-module';
import { Product, ProductViewModel } from '@product-module';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  readonly #cartStore = inject(CartStore);

  addProductInCart(product: Product | ProductViewModel, quantity = 1): boolean {
    const newProduct: AddToCartRequest = {
      id: product.id,
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity,
        total: product.price * quantity,
      },
    };

    return this.#cartStore.addCProductToCart(newProduct);
  }
}
