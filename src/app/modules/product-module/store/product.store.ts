import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ProductFacade, ProductsApiResponse, ProductViewModel } from "@product-module";

const initialProductState: ProductsApiResponse<ProductViewModel> = {
  skip: 0,
  limit: 0,
  total: 0,
  products: [],
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialProductState),
  withMethods((store: any) => {
    const productFacade = inject(ProductFacade);

    return {
      loadProducts: () => {
        const data = toSignal(productFacade.getProducts(), {
          initialValue: { skip:0, limit:0, total:0, products:[] }
        });

        store.patchState({
          skip: data().skip,
          limit: data().limit,
          total: data().total,
          products: data().products
        });
      }
    };
  })
)
