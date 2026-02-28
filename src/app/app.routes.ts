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
    path: 'chat',
    outlet: 'chat',
    canActivate: [AuthGuard],
    loadComponent: () => import('@chat-module').then((c) => c.ChatComponent),
  },
  {
    path: 'signal-form',
    loadComponent: () =>
      import('../app/signal-form/signal-form.component').then((c) => c.SignalFormComponent),
  },
  {
    path: '',
    canActivate: [GuestGuard],
    children: authRoutes,
  },
  { path: '**', loadComponent: () => import('@pages').then((c) => c.NotFoundComponent) },
];
