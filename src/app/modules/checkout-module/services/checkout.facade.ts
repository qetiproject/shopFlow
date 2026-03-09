import { inject, Injectable } from '@angular/core';
import { BillingDetails } from '@checkout-module/types/billingDetails';
import { BillingForm } from '@checkout-module/types/billing-form';
import { BillingStorage } from '@checkout-module/services/billing.storage';
import { CheckoutApi } from '@checkout-module/services/checkout.api';
import { toErrorMessage } from '@core/http/http-utils';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutFacade {
  #checkoutApi = inject(CheckoutApi);
  #billingStorage = inject(BillingStorage);

  async checkout(form: BillingForm): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await firstValueFrom(this.#checkoutApi.checkout());
      const billingDetails: BillingDetails = {
        id: crypto.randomUUID(),
        firstName: form.firstName!,
        lastName: form.lastName!,
        address: form.address!,
        city: form.city!,
        zip: +form.zip,
        fullName: `${form.firstName} ${form.lastName}`,
        fullAddress: `${form.address} ${form.city}`,
      };
      this.#billingStorage.saveBillingInfo(billingDetails);
      window.location.href = res.url;
      return { success: true };
    } catch (err) {
      const error = toErrorMessage(err);
      return { success: false, error };
    }
  }
}
