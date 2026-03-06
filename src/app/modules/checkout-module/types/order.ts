import { CartProduct } from '@cart-module/types/cart.model';
import { BillingDetails } from './billingDetails';

export interface Order {
  id: string;
  billing: BillingDetails;
  products: CartProduct[];
  total: number;
  status: string;
  createdAt: Date;
}

export interface OrderList {
  order: Order[];
  totalRecords: number;
}
