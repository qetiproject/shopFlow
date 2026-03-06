
import { Routes } from '@angular/router';

export const authRoutes: Routes = [
   {
    path: 'login',
    loadComponent: () => import('@auth-module/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('@auth-module/pages/register/register').then((m) => m.Register),
  },
  {
    path: 'send-reset-otp',
    loadComponent: () => import('@auth-module/pages/send-reset-otp/send-reset-otp').then((m) => m.SendResetOtp),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('@auth-module/pages/reset-password/reset-password').then((m) => m.ResetPassword),
  }
];