import { Routes } from "@angular/router";

export const productRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('@product-module').then(c => c.Products)
    }
]