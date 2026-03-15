import { TestBed } from '@angular/core/testing';
import { STORAGE_KEYS } from '@core/constants';
import { UserStorage } from '@auth-module/services/user.storage';
import { CartStorage } from './cart.storage';

describe('CartStorage', () => {
  let storage: CartStorage;
  let userStorage: jest.Mocked<Pick<UserStorage, 'getUser'>>;
  let localStorageGet: jest.SpyInstance;
  let localStorageSet: jest.SpyInstance;

  const user = { userId: 42 } as { userId: number };

  beforeEach(() => {
    userStorage = { getUser: jest.fn().mockReturnValue(user) };

    const raw: Record<string, unknown> = {};
    localStorageGet = jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === STORAGE_KEYS.CART) return JSON.stringify(raw);
      return null;
    });
    localStorageSet = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

    TestBed.configureTestingModule({
      providers: [
        CartStorage,
        { provide: UserStorage, useValue: userStorage },
      ],
    });

    storage = TestBed.inject(CartStorage);
  });

  afterEach(() => {
    localStorageGet?.mockRestore();
    localStorageSet?.mockRestore();
  });

  it('is created', () => {
    expect(storage).toBeTruthy();
  });

  it('getCart returns null when no user', () => {
    userStorage.getUser.mockReturnValue(null);
    const data: Record<string, unknown> = {};
    localStorageGet.mockImplementation((key: string) =>
      key === STORAGE_KEYS.CART ? JSON.stringify(data) : null,
    );

    expect(storage.getCart()).toBeNull();
  });

  it('getCart returns cart for user when stored', () => {
    const data = { '42': { products: [], total: 0, userId: 42, totalQuantity: 0 } };
    localStorageGet.mockImplementation((key: string) =>
      key === STORAGE_KEYS.CART ? JSON.stringify(data) : null,
    );

    const cart = storage.getCart();
    expect(cart).toEqual(data['42']);
  });

  it('saveCart does nothing when no user', () => {
    userStorage.getUser.mockReturnValue(null);

    storage.saveCart({ products: [], total: 0, userId: 0, totalQuantity: 0 });

    expect(localStorageSet).not.toHaveBeenCalled();
  });

  it('saveCart writes cart keyed by userId', () => {
    const cart = { products: [], total: 0, userId: 42, totalQuantity: 0 };
    storage.saveCart(cart);

    expect(localStorageSet).toHaveBeenCalledWith(
      STORAGE_KEYS.CART,
      JSON.stringify({ '42': { ...cart, userId: 42 } }),
    );
  });

  it('clear deletes user key from stored data and writes back', () => {
    let stored = JSON.stringify({ '42': { products: [], total: 0, userId: 42, totalQuantity: 0 } });
    localStorageGet.mockImplementation((key: string) =>
      key === STORAGE_KEYS.CART ? stored : null,
    );
    localStorageSet.mockImplementation((_key: string, value: string) => {
      stored = value;
    });

    storage.clear();

    expect(localStorageSet).toHaveBeenCalledWith(STORAGE_KEYS.CART, '{}');
  });
});
