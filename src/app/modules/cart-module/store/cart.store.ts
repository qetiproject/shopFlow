import { AddToCartRequest, CartProduct, CartResponse } from '@cart-module';
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
      const cart = store.cart();
      const incomingProduct = request.product;

      const existingIndex = cart.products.findIndex((p) => p.id === incomingProduct.id);

      let updatedProducts: CartProduct[];

      if (existingIndex > -1) {
        updatedProducts = cart.products.map((p, i) =>
          i === existingIndex
            ? {
                ...p,
                quantity: p.quantity + incomingProduct.quantity,
                total: (p.quantity + incomingProduct.quantity) * p.price,
              }
            : p,
        );
      } else {
        updatedProducts = [
          ...cart.products,
          {
            ...incomingProduct,
            total: incomingProduct.quantity * incomingProduct.price,
          },
        ];
      }

      const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
      const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);

      patchState(store, (state) => ({
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts,
          total,
          totalQuantity,
        },
      }));
    },
    removeProductFromCart: (id: number) => {
      patchState(store, (state) => {
        const updateProducts = state.cart.products.filter((p) => p.id !== id);

        return {
          ...state,
          cart: {
            ...state.cart,
            products: updateProducts,
            total: updateProducts.reduce((sum, p) => sum + p.total, 0),
            totalQuantity: updateProducts.reduce((q, p) => q + p.quantity, 0),
          },
        };
      });
    },
    decrease: (id: number) => {
      patchState(store, (state) => {
        const updatedProducts = state.cart.products.map((p) => {
          if (p.id === id) {
            const newQuantity = p.quantity - 1 > 0 ? p.quantity - 1 : 1;
            return {
              ...p,
              quantity: newQuantity,
              total: newQuantity * p.price,
            };
          }
          return p;
        });

        const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
        const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);

        return {
          ...state,
          cart: {
            ...state.cart,
            products: updatedProducts,
            total,
            totalQuantity,
          },
        };
      });
    },
    increase: (id: number) => {
      patchState(store, (state) => {
        const updatedProducts = state.cart.products.map((p) => {
          if (p.id === id) {
            const newQuantity = p.quantity + 1;
            return {
              ...p,
              quantity: newQuantity,
              total: newQuantity * p.price,
            };
          }
          return p;
        });

        const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
        const totalQuantity = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);

        return {
          ...state,
          cart: {
            ...state.cart,
            products: updatedProducts,
            total,
            totalQuantity,
          },
        };
      });
    },
  })),
);
