export interface Cart {
  products: CartProduct[];
  total: number;
  userId: number;
  totalQuantity: number;
}

export interface Cartable {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export type CartProduct = Cartable & {
  quantity: number;
  total: number;
};

export type CartsByUserId = Record<string, Cart>;
