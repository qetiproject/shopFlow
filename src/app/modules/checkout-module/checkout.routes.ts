import { Routes } from '@angular/router';
import { environment } from '@env';
import { provideNgxStripe } from 'ngx-stripe';

export const checkoutRoutesWithProviders: Routes = [
  {
    path: '',
    providers: [provideNgxStripe(environment.stripe.publicKey)],
    children: [
      {
        path: 'shipping-info',
        loadComponent: () => import('./pages/shipping-info/shipping-info').then((m) => m.ShippingInfo),
      },
      {
        path: 'canceled',
        loadComponent: () =>
          import('./pages/checkout-canceled/checkout-canceled').then((m) => m.CheckoutCanceled),
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./pages/checkout-success/checkout-success').then((m) => m.CheckoutSuccess),
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders/orders').then((m) => m.Orders),
      },
    ],
  },
];
