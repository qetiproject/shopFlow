import { Routes } from '@angular/router';

export const checkoutRoutes: Routes = [
  {
    path: 'shipping-info',
    loadComponent: () => import('@checkout-module').then((c) => c.ShippingInfo),
  },
  {
    path: 'canceled',
    loadComponent: () => import('@checkout-module').then((c) => c.CheckoutCanceled),
  },
  {
    path: 'success',
    loadComponent: () => import('@checkout-module').then((c) => c.CheckoutSuccess),
  },
];
