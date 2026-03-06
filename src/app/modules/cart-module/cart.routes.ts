import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@cart-module/pages/cart/cart.component').then((m) => m.CartComponent),
  },
];
