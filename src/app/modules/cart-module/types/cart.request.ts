import { CartProduct } from '@cart-module/types/cart.model';

export interface AddToCartRequest {
  id: number;
  product: CartProduct;
}
