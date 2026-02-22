import { inject } from '@angular/core';
import { UserStorage } from '@auth-module';
import {
  addOrUpdateProduct,
  AddToCartRequest,
  calculateTotals,
  CartResponse,
  updateQuantity,
} from '@cart-module';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<CartResponse>({
    total: 0,
    skip: 0,
    limit: 0,
    cart: {
      id: 0,
      products: [],
      total: 0,
      userId: 0,
      totalQuantity: 0,
    },
  }),

  withMethods((store) => {
    const userStorage = inject(UserStorage);

    const user = userStorage.getUser();
    if (user!.userId) {
      patchState(store, (state) => ({
        ...state,
        cart: { ...state.cart, userId: user!.userId },
      }));
    }

    const changeQuantity = (id: number, delta: number) => {
      patchState(store, (state) => {
        const { updatedProducts, total, totalQuantity } = updateQuantity(
          state.cart.products,
          id,
          delta,
        );

        return {
          ...state,
          cart: { ...state.cart, products: updatedProducts, total, totalQuantity },
        };
      });
    };

    return {
      addCProductToCart: (request: AddToCartRequest) => {
        const updatedProducts = addOrUpdateProduct(store.cart().products, request.product);
        const { total, totalQuantity } = calculateTotals(updatedProducts);

        patchState(store, (state) => ({
          ...state,
          cart: { ...state.cart, products: updatedProducts, total, totalQuantity },
        }));
      },

      removeProductFromCart: (id: number) => {
        patchState(store, (state) => {
          const updatedProducts = state.cart.products.filter((p) => p.id !== id);
          const { total, totalQuantity } = calculateTotals(updatedProducts);

          return {
            ...state,
            cart: { ...state.cart, products: updatedProducts, total, totalQuantity },
          };
        });
      },

      changeQuantity,
      increase: (id: number) => changeQuantity(id, 1),
      decrease: (id: number) => changeQuantity(id, -1),
    };
  }),
);
