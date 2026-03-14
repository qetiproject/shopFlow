import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Product } from '@app-types/dto';
import { ProductFacade } from '@product-module/services/product.facade';
import { catchError, of, tap } from 'rxjs';

export const ProductDetailResolve: ResolveFn<Product | null> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  const productFacade = inject(ProductFacade);
  const router = inject(Router);

  if (!id) {
    router.navigate(['/product/list']);
    return of(null);
  }

  return productFacade.getProductDetails(id).pipe(
    tap((product) => {
      if (!product) router.navigate(['/product/list']);
    }),
    catchError(() => {
      router.navigate(['/product/list']);
      return of(null);
    }),
  );
};
