import { inject, Injectable } from '@angular/core';
import { AddToCartRequest } from '@cart-module/types/cart.request';
import { Cartable } from '@cart-module/types/cart.model';
import { CartStore } from '@cart-module/store/cart.store';

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
