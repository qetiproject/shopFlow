import { Cart } from '@cart-module/types/cart.model';

export interface CartResponse {
  total: number;
  cart: Cart;
}
