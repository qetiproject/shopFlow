import { TestBed } from '@angular/core/testing';
import { STORAGE_KEYS } from '@core/constants';
import { mockBillingDetails } from '@test-utils/mock-data';
import { BillingStorage } from './billing.storage';

describe('BillingStorage', () => {
  let storage: BillingStorage;
  let sessionGet: jest.SpyInstance;
  let sessionSet: jest.SpyInstance;
  let sessionRemove: jest.SpyInstance;

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
    storage.saveBillingInfo(mockBillingDetails);
    expect(sessionSet).toHaveBeenCalledWith(
      STORAGE_KEYS.BILLING,
      JSON.stringify(mockBillingDetails),
    );
  });

  it('getBillingInfo returns null when empty', () => {
    expect(storage.getBillingInfo()).toBeNull();
  });

  it('getBillingInfo returns parsed billing after save', () => {
    storage.saveBillingInfo(mockBillingDetails);
    const got = storage.getBillingInfo();
    expect(got).toEqual(mockBillingDetails);
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
