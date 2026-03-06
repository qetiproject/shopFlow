import { Routes } from '@angular/router';
import type { Product } from '@product-module/types/product';
import { ProductDetailResolve } from '@product-module/pages/product-detail/product-detail.resolver';

export const productRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('@product-module/pages/products/products').then((m) => m.ProductsPage),
    children: [
      {
        path: 'add-product',
        outlet: 'modal',
        loadComponent: () =>
          import('@product-module/components/add-product-modal/add-product-modal').then((m) => m.AddProductModal),
      },
    ],
  },
  {
    path: 'details/:id',
    loadComponent: () => import('@product-module/pages/product-detail/product-detail').then((m) => m.ProductDetail),
    resolve: {
      product: ProductDetailResolve,
    },
    data: {} as Product,
  },
];
