import { Routes } from '@angular/router';
import { Product } from '@product-module';
import { ProductDetailResolve } from './pages/product-detail/product-detail.resolver';

export const productRoutes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('@product-module').then((c) => c.ProductsPage),
  },
  {
    path: 'details/:id',
    loadComponent: () => import('@product-module').then((c) => c.ProductDetail),
    resolve: {
      product: ProductDetailResolve,
    },
    data: {} as Product,
  },
  {
    path: 'add-product',
    loadComponent: () => import('@product-module').then((c) => c.AddProductModal),
    // outlet: 'popup',
  },
];
