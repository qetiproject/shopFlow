import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ProductFacade } from '../../services/product.facade';

export const ProductDetailResolve: ResolveFn<any | null> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  const productFacade = inject(ProductFacade);
  const router = inject(Router);

  if (!id) {
    router.navigate(['/products/list']);
    return of(null);
  }

  return productFacade.getProductDetails(id).pipe(
    tap((product) => {
      if (!product) router.navigate(['/products']);
    }),
    catchError(() => {
      router.navigate(['/products/list']);
      return of(null);
    }),
  );
};
