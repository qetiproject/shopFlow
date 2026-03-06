import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { GuestGuard } from '@core/guards/guest.guard';
import { InitialRedirectGuard } from '@core/guards/initial-redirect.guard';
import { authRoutes } from '@auth-module/auth.routes';
import { cartRoutes } from '@cart-module/cart.routes';
import { productRoutes } from '@product-module/product.routes';
import { userRoutes } from '@user-module/user.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    pathMatch: 'full',
    loadComponent: () => import('@auth-module/pages/login/login').then((m) => m.Login),
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
    loadChildren: () =>
      import('@checkout-module/checkout.routes').then((m) => m.checkoutRoutesWithProviders),
  },
  {
    path: '',
    canActivate: [GuestGuard],
    children: authRoutes,
  },
  { path: '**', loadComponent: () => import('@pages/not-found').then((m) => m.NotFoundComponent) },
];
