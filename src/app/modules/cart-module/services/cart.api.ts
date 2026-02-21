import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env-dev';
import { Observable } from 'rxjs';
import { AddToCartRequest, CartResponse } from '../types/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartApi {
  #http = inject(HttpClient);

  private readonly baseUrl = environment.cart;

  getCartByUserId(userId: number): Observable<CartResponse> {
    return this.#http.get<CartResponse>(`${this.baseUrl}/user/${userId}`);
  }

  addProductToCart(product: AddToCartRequest): Observable<CartResponse> {
    return this.#http.post<CartResponse>(`${this.baseUrl}/add`, product);
  }
}
