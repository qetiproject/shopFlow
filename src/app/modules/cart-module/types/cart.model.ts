export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  total: number;
  skip: number;
  limit: number;
  cart: Cart;
}

export interface AddToCartRequest {
  id: number;
  product: CartProduct;
  total: number;
  totalProducts: number;
}
