/**
 * Checkout API request/response DTOs (shared contract with backend).
 */
import type { CartProduct } from '@cart-module/types/cart.model';

export type { Order, OrderList } from '@checkout-module/types/order';
export type { BillingDetails } from '@checkout-module/types/billingDetails';

/** Request body for creating a checkout session (items sent to backend). */
export interface CheckoutRequest {
  items: readonly CartProduct[];
}

/** Response from checkout session creation (Stripe URL). */
export interface CheckoutResponse {
  url: string;
}
