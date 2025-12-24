import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./index').then(c => c.FeaturesLogin)
    },
    {
        path: 'register',
        loadComponent: () => import('./index').then(c => c.FeaturesRegister)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./index').then(c => c.FeaturesResetPassword)
    },
    {
        path: 'send-reset-otp',
        loadComponent: () => import('./index').then(c => c.FeaturesSendResetOtp)
    }
]