import { Routes } from '@angular/router';
import { environment } from '@env';
import { provideNgxStripe } from 'ngx-stripe';

const checkoutChildRoutes: Routes = [
  {
    path: 'shipping-info',
    loadComponent: () => import('@checkout-module/pages/shipping-info/shipping-info').then((m) => m.ShippingInfo),
  },
  {
    path: 'canceled',
    loadComponent: () =>
      import('@checkout-module/pages/checkout-canceled/checkout-canceled').then((m) => m.CheckoutCanceled),
  },
  {
    path: 'success',
    loadComponent: () =>
      import('@checkout-module/pages/checkout-success/checkout-success').then((m) => m.CheckoutSuccess),
  },
  {
    path: 'orders',
    loadComponent: () => import('@checkout-module/pages/orders/orders').then((m) => m.Orders),
  },
];

export const checkoutRoutes: Routes = checkoutChildRoutes;

export const checkoutRoutesWithProviders: Routes = [
  {
    path: '',
    providers: [provideNgxStripe(environment.stripe.publicKey)],
    children: checkoutChildRoutes,
  },
];
