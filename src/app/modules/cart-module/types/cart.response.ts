import { Cart } from '@cart-module';

export interface CartResponse {
  total: number;
  cart: Cart;
}
