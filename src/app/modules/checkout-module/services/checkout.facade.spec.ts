import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { BillingStorage } from '@checkout-module/services/billing.storage';
import { CheckoutApi } from '@checkout-module/services/checkout.api';
import { MessagesService } from '@core/services/messages.service';
import { mockBillingForm } from '@utils/mock-data';
import { CHECKOUT_REDIRECT, CheckoutFacade } from './checkout.facade';

describe('CheckoutFacade', () => {
  let facade: CheckoutFacade;
  let checkoutApi: jest.Mocked<Pick<CheckoutApi, 'checkout'>>;
  let billingStorage: jest.Mocked<Pick<BillingStorage, 'saveBillingInfo'>>;
  let messages: jest.Mocked<Pick<MessagesService, 'showMessage'>>;

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
        { provide: CHECKOUT_REDIRECT, useValue: jest.fn() },
      ],
    });

    facade = TestBed.inject(CheckoutFacade);
  });

  it('is created', () => {
    expect(facade).toBeTruthy();
  });

  it('checkout on success saves billing and redirects', async () => {
    (checkoutApi.checkout as jest.Mock).mockReturnValue(of({ url: 'https://stripe.com/pay' }));

    await facade.checkout(mockBillingForm);

    expect(billingStorage.saveBillingInfo).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        firstName: mockBillingForm.firstName,
        lastName: mockBillingForm.lastName,
        address: mockBillingForm.address,
        city: mockBillingForm.city,
        zip: 12345,
        fullName: 'John Doe',
        fullAddress: 'Street 1 City',
      }),
    );
  });

  it('checkout on error shows message and does not redirect', async () => {
    (checkoutApi.checkout as jest.Mock).mockReturnValue(
      throwError(() => new Error('Network error')),
    );

    await facade.checkout(mockBillingForm);

    expect(messages.showMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.any(String),
        severity: 'error',
      }),
    );
    expect(billingStorage.saveBillingInfo).not.toHaveBeenCalled();
  });
});
