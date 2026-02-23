import { inject, Injectable } from '@angular/core';
import { AddToCartRequest, Cartable, CartStore } from '@cart-module';

@Injectable({ providedIn: 'root' })
export class CartFacade {
  readonly #cartStore = inject(CartStore);

  addProductInCart<T extends Cartable>(product: T, quantity = 1): boolean {
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
