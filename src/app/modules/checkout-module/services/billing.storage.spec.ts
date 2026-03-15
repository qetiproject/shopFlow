import { TestBed } from '@angular/core/testing';
import type { BillingDetails } from '@app-types/dto';
import { STORAGE_KEYS } from '@core/constants';
import { BillingStorage } from './billing.storage';

describe('BillingStorage', () => {
  let storage: BillingStorage;
  let sessionGet: jest.SpyInstance;
  let sessionSet: jest.SpyInstance;
  let sessionRemove: jest.SpyInstance;

  const billing: BillingDetails = {
    id: 'id-1',
    firstName: 'John',
    lastName: 'Doe',
    address: 'Street',
    city: 'City',
    fullName: 'John Doe',
    fullAddress: 'Street City',
    zip: 1234,
  };

  beforeEach(() => {
    let stored: string | null = null;
    sessionGet = jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === STORAGE_KEYS.BILLING) return stored;
      return null;
    });
    sessionSet = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation((key: string, value: string) => {
        if (key === STORAGE_KEYS.BILLING) stored = value;
      });
    sessionRemove = jest
      .spyOn(Storage.prototype, 'removeItem')
      .mockImplementation((key: string) => {
        if (key === STORAGE_KEYS.BILLING) stored = null;
      });

    TestBed.configureTestingModule({ providers: [BillingStorage] });
    storage = TestBed.inject(BillingStorage);
  });

  afterEach(() => {
    sessionGet?.mockRestore();
    sessionSet?.mockRestore();
    sessionRemove?.mockRestore();
  });

  it('is created', () => {
    expect(storage).toBeTruthy();
  });

  it('saveBillingInfo stores JSON', () => {
    storage.saveBillingInfo(billing);
    expect(sessionSet).toHaveBeenCalledWith(STORAGE_KEYS.BILLING, JSON.stringify(billing));
  });

  it('getBillingInfo returns null when empty', () => {
    expect(storage.getBillingInfo()).toBeNull();
  });

  it('getBillingInfo returns parsed billing after save', () => {
    storage.saveBillingInfo(billing);
    const got = storage.getBillingInfo();
    expect(got).toEqual(billing);
  });

  it('getBillingInfo returns null on invalid JSON', () => {
    (sessionGet as jest.Mock).mockImplementation((key: string) => {
      if (key === STORAGE_KEYS.BILLING) return 'not json';
      return null;
    });
    expect(storage.getBillingInfo()).toBeNull();
  });

  it('clear removes key', () => {
    storage.clear();
    expect(sessionRemove).toHaveBeenCalledWith(STORAGE_KEYS.BILLING);
  });
});
