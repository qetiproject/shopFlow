import { Routes } from '@angular/router';
import { authRoutes, GuestGuard, InitialRedirectGuard } from '@auth';

export const routes: Routes = [
  {
    path: '',
    canActivate: [InitialRedirectGuard],
    pathMatch: 'full',
    loadComponent: () => 
      import('@auth').then(c => c.FeaturesLogin),
  },
  // { path: 'dashboard', 
  //   canActivate: [AuthGuard],
  //   loadComponent: () => 
  //         import('./pages/dashboard/dashboard').then(c => c.Dashboard), 
  // },
  { 
    path: '', 
    canActivate: [GuestGuard], 
    children: authRoutes
  },
  { path: '**', redirectTo: '' }
];