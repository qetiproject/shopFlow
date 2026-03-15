import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import type { BillingForm } from '@checkout-module/types/billing-form';
import { BillingStorage } from '@checkout-module/services/billing.storage';
import { CheckoutApi } from '@checkout-module/services/checkout.api';
import { MessagesService } from '@core/services/messages.service';
import { CheckoutFacade } from './checkout.facade';

describe('CheckoutFacade', () => {
  let facade: CheckoutFacade;
  let checkoutApi: jest.Mocked<Pick<CheckoutApi, 'checkout'>>;
  let billingStorage: jest.Mocked<Pick<BillingStorage, 'saveBillingInfo'>>;
  let messages: jest.Mocked<Pick<MessagesService, 'showMessage'>>;

  const form: BillingForm = {
    firstName: 'John',
    lastName: 'Doe',
    address: 'Street 1',
    city: 'City',
    zip: '12345',
  };

  beforeEach(() => {
    checkoutApi = { checkout: jest.fn() };
    billingStorage = { saveBillingInfo: jest.fn() };
    messages = { showMessage: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        CheckoutFacade,
        { provide: CheckoutApi, useValue: checkoutApi },
        { provide: BillingStorage, useValue: billingStorage },
        { provide: MessagesService, useValue: messages },
      ],
    });

    facade = TestBed.inject(CheckoutFacade);
  });

  it('is created', () => {
    expect(facade).toBeTruthy();
  });

  it('checkout on success saves billing and redirects', async () => {
    (checkoutApi.checkout as jest.Mock).mockReturnValue(of({ url: 'https://stripe.com/pay' }));

    await facade.checkout(form);

    expect(billingStorage.saveBillingInfo).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        address: 'Street 1',
        city: 'City',
        zip: 12345,
        fullName: 'John Doe',
        fullAddress: 'Street 1 City',
      }),
    );
    expect(billingStorage.saveBillingInfo).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it('checkout on error shows message and does not redirect', async () => {
    (checkoutApi.checkout as jest.Mock).mockReturnValue(
      throwError(() => new Error('Network error')),
    );

    await facade.checkout(form);

    expect(messages.showMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.any(String),
        severity: 'error',
      }),
    );
    expect(billingStorage.saveBillingInfo).not.toHaveBeenCalled();
  });
});
