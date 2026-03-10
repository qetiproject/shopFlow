import { inject, Injectable } from '@angular/core';
import { UserStorage } from '@auth-module/services';
import { Cart, CartsByUserId } from '@cart-module/types/cart.model';
import { STORAGE_KEYS } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class CartStorage {
  #userStorage = inject(UserStorage);

  #readRaw(): CartsByUserId {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    if (!raw) return {};
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
      return parsed as CartsByUserId;
    } catch {
      return {};
    }
  }

  #write(data: CartsByUserId): void {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(data));
  }

  saveCart(cart: Cart): void {
    const user = this.#userStorage.getUser();
    if (user?.userId == null) return;

    const cartWithUser = { ...cart, userId: user.userId };
    const data = this.#readRaw();
    data[String(user.userId)] = cartWithUser;
    this.#write(data);
  }

  getCart(): Cart | null {
    const user = this.#userStorage.getUser();
    if (user?.userId == null) return null;

    const data = this.#readRaw();
    return data[String(user.userId)] ?? null;
  }

  clear(): void {
    const user = this.#userStorage.getUser();
    if (user?.userId == null) return;

    const data = this.#readRaw();
    delete data[String(user.userId)];
    this.#write(data);
  }
}
