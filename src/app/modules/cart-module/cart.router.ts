import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('@cart-module').then((c) => c.CartComponent),
  },
];
