import { Routes } from '@angular/router';
import { authRoutes } from '@auth-module';
import { AuthGuard, GuestGuard, InitialRedirectGuard } from '@core';
import { productRoutes } from '@product-module';
import { userRoutes } from '@user-module';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    pathMatch: 'full',
    loadComponent: () => 
      import('@auth-module').then(c => c.Login),
  },
  { path: 'dashboard', 
    canActivate: [AuthGuard],
    loadComponent: () => 
          import('./pages/dashboard/dashboard').then(c => c.Dashboard), 
  },
  { path: 'users', 
    canActivate: [AuthGuard],
    children: userRoutes 
  },
  { path: 'products', 
    canActivate: [AuthGuard],
    children: productRoutes 
  },
  { 
    path: '', 
    canActivate: [GuestGuard], 
    children: authRoutes
  },
  { path: '**', redirectTo: '' }
];