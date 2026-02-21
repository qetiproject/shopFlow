import { inject, Injectable } from '@angular/core';
import { AddToCartRequest, CartApi, CartResponse } from '@cart-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  #cartApi = inject(CartApi);

  getCartByUserId(userId: number): Observable<CartResponse> {
    return this.#cartApi.getCartByUserId(userId);
  }

  addProductToCart(product: AddToCartRequest): Observable<CartResponse> {
    return this.#cartApi.addProductToCart(product);
  }
}
