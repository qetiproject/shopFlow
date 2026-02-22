import { inject } from '@angular/core';
import { UserStorage } from '@auth-module';
import {
  addOrUpdateProduct,
  AddToCartRequest,
  calculateTotals,
  CartResponse,
  CartStorage,
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

    const addCProductToCart = (request: AddToCartRequest) => {
      patchState(store, (state) => {
        const updatedProducts = addOrUpdateProduct(state.cart.products, request.product);
        const { total, totalQuantity } = calculateTotals(updatedProducts);

        const newCart = { ...state.cart, products: updatedProducts, total, totalQuantity };
        persist(newCart);
        return { ...state, cart: newCart };
      });
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

    return {
      addCProductToCart,
      removeProductFromCart,
      changeQuantity,
      increase: (id: number) => changeQuantity(id, 1),
      decrease: (id: number) => changeQuantity(id, -1),
    };
  }),
);
