import { Injectable } from '@angular/core';
import { Cart } from '@cart-module';
import { STORAGE_KEYS } from '@core';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
  saveCart(cart: Cart): void {
    sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }

  getCart(): Cart | null {
    const cart = sessionStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : null;
  }

  clear(): void {
    sessionStorage.removeItem(STORAGE_KEYS.CART);
  }
}
