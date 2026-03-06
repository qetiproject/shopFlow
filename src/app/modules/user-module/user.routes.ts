import { Routes } from '@angular/router';
import type { LoginResponse } from '../auth-module/types/login/login.response';
import { UserProfileResolve } from './pages/user-profile/user-profile.resolver';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/users/users').then((m) => m.Users),
  },
  {
    path: 'profile/:email',
    loadComponent: () => import('./pages/user-profile/user-profile').then((m) => m.UserProfile),
    resolve: {
      user: UserProfileResolve,
    },
    data: {} as LoginResponse,
  },
];
