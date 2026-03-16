import { TestBed } from '@angular/core/testing';
import type { Cartable } from '@app-types/dto';
import { CartStore } from '@cart-module/store/cart.store';
import { CartFacade } from './cart.facade';

describe('CartFacade', () => {
  let facade: CartFacade;
  let addProductToCart: jest.Mock;

  beforeEach(() => {
    addProductToCart = jest.fn().mockReturnValue(true);

    TestBed.configureTestingModule({
      providers: [
        CartFacade,
        {
          provide: CartStore,
          useValue: { addProductToCart },
        },
      ],
    });

    facade = TestBed.inject(CartFacade);
  });

  it('is created', () => {
    expect(facade).toBeTruthy();
  });

  it('addProductInCart builds request and calls store', () => {
    const product: Cartable = {
      id: 1,
      title: 'Item',
      price: 15,
      thumbnail: 'thumb.png',
    };

    const result = facade.addProductInCart(product, 2);

    expect(addProductToCart).toHaveBeenCalledWith({
      id: 1,
      product: {
        id: 1,
        title: 'Item',
        price: 15,
        thumbnail: 'thumb.png',
        quantity: 2,
        total: 30,
      },
    });
    expect(result).toBe(true);
  });

  it('addProductInCart uses quantity 1 by default', () => {
    const product: Cartable = { id: 2, title: 'X', price: 10, thumbnail: '' };

    facade.addProductInCart(product);

    expect(addProductToCart).toHaveBeenCalledWith({
      id: 2,
      product: expect.objectContaining({ quantity: 1, total: 10 }),
    });
  });
});
