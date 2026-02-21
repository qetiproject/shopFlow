import { inject } from '@angular/core';
import { CartFacade, CartResponse } from '@cart-module';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export const CartStore = signalStore(
  withState<CartResponse>({
    total: 0,
    skip: 0,
    limit: 0,
    carts: [],
  }),

  withMethods((store, cartFacade = inject(CartFacade)) => ({
    loadCarts: rxMethod<void>(
      pipe(
        switchMap(() => {
          return cartFacade.getCartByUserId(33).pipe(
            tap((response) => {
              patchState(store, {
                total: response.total,
                skip: response.skip,
                limit: response.limit,
                carts: response.carts,
              });
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadCarts();
    },
  }),
);
