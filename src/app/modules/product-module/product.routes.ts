import { Routes } from '@angular/router';
import type { Product } from './types/product';
import { ProductDetailResolve } from './pages/product-detail/product-detail.resolver';

export const productRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./pages/products/products').then((m) => m.ProductsPage),
    children: [
      {
        path: 'add-product',
        outlet: 'modal',
        loadComponent: () =>
          import('./components/add-product-modal/add-product-modal').then((m) => m.AddProductModal),
      },
    ],
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
    resolve: {
      product: ProductDetailResolve,
    },
    data: {} as Product,
  },
];
