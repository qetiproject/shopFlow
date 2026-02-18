import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Product, ProductFacade } from '@product-module';
import { catchError, of, tap } from 'rxjs';

export const ProductDetailResolve: ResolveFn<Product | null> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  const productFacade = inject(ProductFacade);
  const router = inject(Router);

  if (!id) {
    router.navigate(['/products/list']);
    return of(null);
  }

  return productFacade.getProductDetails(id).pipe(
    tap((product) => {
      if (!product) router.navigate(['/products/list']);
    }),
    catchError(() => {
      router.navigate(['/products/list']);
      return of(null);
    }),
  );
};
