import { Injectable } from '@angular/core';
import { Cart } from '@cart-module/types/cart.model';
import { STORAGE_KEYS } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
  saveCart(cart: Cart): void {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }

  getCart(): Cart | null {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : null;
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.CART);
  }
}
