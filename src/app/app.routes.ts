import { Routes } from '@angular/router';
import { authRoutes } from '@auth-module';
import { cartRoutes } from '@cart-module';
import { checkoutRoutes } from '@checkout-module';
import { AuthGuard, GuestGuard, InitialRedirectGuard } from '@core';
import { productRoutes } from '@product-module';
import { userRoutes } from '@user-module';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    pathMatch: 'full',
    loadComponent: () => import('@auth-module').then((c) => c.Login),
  },
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
  // },
  { path: 'users', canActivate: [AuthGuard], children: userRoutes },
  { path: 'product', canActivate: [AuthGuard], children: productRoutes },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    children: cartRoutes,
  },

  {
    path: 'checkout',
    canActivate: [AuthGuard],
    children: checkoutRoutes,
  },
  // {
  //   path: 'canceled',
  //   loadComponent: () => import('@checkout-module').then((c) => c.CheckoutCanceled),
  // },
  // {
  //   path: 'success',
  //   loadComponent: () => import('@checkout-module').then((c) => c.CheckoutSuccess),
  // },
  // {
  //   path: 'checkout/orders',
  //   loadComponent: () => import('@checkout-module').then((c) => c.Orders),
  // },

  {
    path: '',
    canActivate: [GuestGuard],
    children: authRoutes,
  },
  { path: '**', redirectTo: '' },
];
