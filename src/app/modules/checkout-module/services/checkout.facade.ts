import { inject, Injectable, InjectionToken } from '@angular/core';
import type { BillingDetails } from '@app-types/dto';
import { MessageSeverity } from '@app-types/message';
import { BillingStorage } from '@checkout-module/services/billing.storage';
import { CheckoutApi } from '@checkout-module/services/checkout.api';
import { BillingForm } from '@checkout-module/types/billing-form';
import { toErrorMessage } from '@core/http/http-utils';
import { MessagesService } from '@core/services/messages.service';
import { firstValueFrom } from 'rxjs';

export const CHECKOUT_REDIRECT = new InjectionToken<(url: string) => void>('CHECKOUT_REDIRECT');

@Injectable({ providedIn: 'root' })
export class CheckoutFacade {
  #checkoutApi = inject(CheckoutApi);
  #billingStorage = inject(BillingStorage);
  #messages = inject(MessagesService);
  #redirect = inject(CHECKOUT_REDIRECT, { optional: true });

  async checkout(form: BillingForm): Promise<void> {
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
      if (this.#redirect) this.#redirect(res.url);
      else window.location.href = res.url;
    } catch (err) {
      this.#messages.showMessage({
        text: toErrorMessage(err),
        severity: MessageSeverity.Error,
      });
    }
  }
}
