import { Routes } from "@angular/router";

export const productRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('@product-module').then(c => c.ProductsPage)
    }
]