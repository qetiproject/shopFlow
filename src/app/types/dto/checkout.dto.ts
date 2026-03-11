/**
 * Checkout API request/response DTOs (shared contract with backend).
 */
import type { CartProduct } from '@cart-module/types/cart.model';

export type { Order, OrderList } from '@checkout-module/types/order';
export type { BillingDetails } from '@checkout-module/types/billingDetails';

/** Checkout session creation request (items sent to backend). */
export interface CheckoutRequestDto {
  items: readonly CartProduct[];
}

/** Checkout session creation response (Stripe URL). */
export interface CheckoutResponseDto {
  url: string;
}
