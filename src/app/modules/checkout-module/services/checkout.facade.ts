import { inject, Injectable } from '@angular/core';
import { MessageSeverity } from '@app-types/message';
import type { BillingDetails } from '@app-types/dto';
import { BillingForm } from '@checkout-module/types/billing-form';
import { BillingStorage } from '@checkout-module/services/billing.storage';
import { CheckoutApi } from '@checkout-module/services/checkout.api';
import { MessagesService } from '@core/services/messages.service';
import { toErrorMessage } from '@core/http/http-utils';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutFacade {
  #checkoutApi = inject(CheckoutApi);
  #billingStorage = inject(BillingStorage);
  #messages = inject(MessagesService);

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
      window.location.href = res.url;
    } catch (err) {
      this.#messages.showMessage({
        text: toErrorMessage(err),
        severity: MessageSeverity.Error,
      });
    }
  }
}
