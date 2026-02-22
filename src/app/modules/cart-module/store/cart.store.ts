import { AddToCartRequest, CartProduct, CartResponse } from '@cart-module';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const CartStore = signalStore(
  withState<CartResponse>({
    total: 0,
    skip: 0,
    limit: 0,
    cart: {
      id: 0,
      products: [],
      total: 0,
      userId: 0,
      totalProducts: 0,
      totalQuantity: 0,
    },
  }),

  withMethods((store) => ({
    addCProductToCart: (request: AddToCartRequest) => {
      const state = store.cart();

      const incomingProduct = request.product;

      const existingIndex = state.products.findIndex((p) => p.id === incomingProduct.id);

      let updatedProducts: CartProduct[];

      if (existingIndex > -1) {
        // უკვე არსებობს → quantity გავზარდოთ
        updatedProducts = state.products.map((p, i) =>
          i === existingIndex
            ? {
                ...p,
                quantity: p.quantity + incomingProduct.quantity,
                total: (p.quantity + incomingProduct.quantity) * p.price,
                discountedTotal:
                  (p.quantity + incomingProduct.quantity) * (p.price - (p.price * 0) / 100), // თუ discount არ გაქვს
              }
            : p,
        );
      } else {
        // ახალი პროდუქტი
        updatedProducts = [
          ...state.products,
          {
            ...incomingProduct,
            total: incomingProduct.price * incomingProduct.quantity,
          },
        ];
      }

      // ჯამები თავიდან ვითვლით
      const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);

      console.log(updatedProducts, 'updated cart products');
      patchState(store, {
        cart: {
          ...state,
          products: updatedProducts,
          total,
          totalProducts: updatedProducts.length,
        },
      });
    },
  })),
);
