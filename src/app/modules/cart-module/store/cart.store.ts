import { computed, inject } from '@angular/core';
import { UserStorage } from '@auth-module/services/user.storage';
import { CartStorage } from '@cart-module/services/cart.storage';
import {
  addOrUpdateProduct,
  calculateTotals,
  updateQuantity,
} from '@cart-module/store/store.utils';
import { AddToCartRequest, CartResponse } from '@app-types/dto';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<CartResponse>({
    total: 0,
    cart: {
      products: [],
      total: 0,
      userId: 0,
      totalQuantity: 0,
    },
  }),
  withComputed((store) => ({
    products: computed(() => store.cart().products),
    total: computed(() => store.cart().products.reduce((sum, p) => sum + p.price * p.quantity, 0)),
    totalItems: computed(() => store.cart().products.reduce((sum, p) => sum + p.quantity, 0)),
  })),

  withMethods((store) => {
    const userStorage = inject(UserStorage);
    const cartStorage = inject(CartStorage);

    const savedCart = cartStorage.getCart();
    const user = userStorage.getUser();

    patchState(store, (state) => ({
      ...state,
      cart: {
        ...state.cart,
        ...(user?.userId && { userId: user.userId }),
        ...(savedCart && { ...savedCart }),
      },
    }));

    const persist = (cart: CartResponse['cart']) => cartStorage.saveCart(cart);

    const changeQuantity = (id: number, delta: number) => {
      patchState(store, (state) => {
        const { updatedProducts, total, totalQuantity } = updateQuantity(
          state.cart.products,
          id,
          delta,
        );

        const newCart = { ...state.cart, products: updatedProducts, total, totalQuantity };
        persist(newCart);
        return { ...state, cart: newCart };
      });
    };

    const addProductToCart = (request: AddToCartRequest): boolean => {
      let success = false;

      patchState(store, (state) => {
        const updatedProducts = addOrUpdateProduct(state.cart.products, request.product);

        const { total, totalQuantity } = calculateTotals(updatedProducts);
        const newCart = { ...state.cart, products: updatedProducts, total, totalQuantity };

        persist(newCart);
        success = true;

        return { ...state, cart: newCart };
      });

      return success;
    };

    const removeProductFromCart = (id: number) => {
      patchState(store, (state) => {
        const updatedProducts = state.cart.products.filter((p) => p.id !== id);
        const { total, totalQuantity } = calculateTotals(updatedProducts);

        const newCart = { ...state.cart, products: updatedProducts, total, totalQuantity };
        persist(newCart);
        return { ...state, cart: newCart };
      });
    };

    const clearList = () => {
      patchState(store, (state) => {
        const emptyCart = {
          ...state.cart,
          products: [],
          total: 0,
          totalQuantity: 0,
        };

        cartStorage.clear();
        return { ...state, cart: emptyCart };
      });
    };

    return {
      addProductToCart,
      removeProductFromCart,
      changeQuantity,
      increase: (id: number) => changeQuantity(id, 1),
      decrease: (id: number) => changeQuantity(id, -1),
      clearList,
    };
  }),
);
