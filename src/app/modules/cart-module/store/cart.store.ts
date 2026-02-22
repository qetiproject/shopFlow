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

  withMethods((store) => ({
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
        const updateProducts = state.cart.products.filter((p) => p.id !== id);
        const { total, totalQuantity } = calculateTotals(updateProducts);

        return {
          ...state,
          cart: { ...state.cart, products: updateProducts, total, totalQuantity },
        };
      });
    },
    increase: (id: number) => {
      patchState(store, (state) => {
        const { updatedProducts, total, totalQuantity } = updateQuantity(
          state.cart.products,
          id,
          1,
        );
        return {
          ...state,
          cart: { ...state.cart, products: updatedProducts, total, totalQuantity },
        };
      });
    },

    decrease: (id: number) => {
      patchState(store, (state) => {
        const { updatedProducts, total, totalQuantity } = updateQuantity(
          state.cart.products,
          id,
          -1,
        );
        return {
          ...state,
          cart: { ...state.cart, products: updatedProducts, total, totalQuantity },
        };
      });
    },
  })),
);
