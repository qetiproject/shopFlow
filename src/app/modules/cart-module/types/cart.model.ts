export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: Product[];
}

export interface CartResponse {
  total: number;
  skip: number;
  limit: number;
  carts: Cart[];
}

export interface AddToCartRequest {
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

// export interface ICart {
//   products: Product[];
//   isLoading: boolean;
//   error: string | null;
//   total: number;
//   userId: number;
// }
