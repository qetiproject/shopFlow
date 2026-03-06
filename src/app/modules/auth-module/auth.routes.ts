
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
   {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'send-reset-otp',
    loadComponent: () => import('./pages/send-reset-otp/send-reset-otp').then((m) => m.SendResetOtp),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password').then((m) => m.ResetPassword),
  }
];