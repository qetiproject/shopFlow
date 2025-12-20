import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./index').then(c => c.FeaturesLogin)
    }
]