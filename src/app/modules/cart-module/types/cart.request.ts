import { CartProduct } from '@cart-module';

export interface AddToCartRequest {
  id: number;
  product: CartProduct;
}
