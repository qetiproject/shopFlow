import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { GuestGuard } from '@core/guards/guest.guard';
import { InitialRedirectGuard } from '@core/guards/initial-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    pathMatch: 'full',
    loadComponent: () => import('./modules/auth-module/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/user-module/user.routes').then((m) => m.userRoutes),
  },
  {
    path: 'product',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/product-module/product.routes').then((m) => m.productRoutes),
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/cart-module/cart.routes').then((m) => m.cartRoutes),
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/checkout-module/checkout.routes').then((m) => m.checkoutRoutesWithProviders),
  },
  {
    path: '',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./modules/auth-module/auth.routes').then((m) => m.authRoutes),
  },
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFoundComponent) },
];
