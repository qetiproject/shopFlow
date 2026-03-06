import { Routes } from '@angular/router';
import { AuthGuard, GuestGuard, InitialRedirectGuard } from '@core';
import { authRoutes } from './modules/auth-module/auth.routes';
import { cartRoutes } from './modules/cart-module/cart.routes';
import { checkoutRoutes } from './modules/checkout-module/checkout.routes';
import { productRoutes } from './modules/product-module/product.routes';
import { userRoutes } from './modules/user-module/user.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    pathMatch: 'full',
    loadComponent: () => import('./modules/auth-module/pages/login/login').then((m) => m.Login),
  },
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
  {
    path: '',
    canActivate: [GuestGuard],
    children: authRoutes,
  },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFoundComponent) },
];
