import { Routes } from '@angular/router';
import { authRoutes } from '../../../libs/auth/src/auth.routes';

export const appRoutes: Routes = [
//   {
//     path: '',
//     canActivate: [InitialRedirectGuard],
//     pathMatch: 'full',
//     loadComponent: () => 
//       import('@auth-module').then(c => c.Login),
//   },
//   { path: 'dashboard', 
//     canActivate: [AuthGuard],
//     loadComponent: () => 
//           import('./pages/dashboard/dashboard').then(c => c.Dashboard), 
//   },
//   { 
//     path: '', 
//     canActivate: [GuestGuard], 
//     children: authRoutes
//   },
//   { path: '**', redirectTo: '' }
    {
        path: '',
        children: authRoutes
    }
];