import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  BillingDetails,
  BillingStorage,
  CheckoutApi,
  createBillingForm,
  createBillingModel,
} from '@checkout-module';
import { BackButtonComponent } from '@components';
import { FieldInput } from '@custom-form/custom-signal-form/field-input';
import { INPUT_TYPES } from '@types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, RouterLink, BackButtonComponent, FieldInput, FormField],
  templateUrl: './shipping-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingInfo {
  INPUT_TYPES = INPUT_TYPES;
  #checkoutApi = inject(CheckoutApi);
  #billingStorage = inject(BillingStorage);

  readonly billingModel = createBillingModel;
  readonly billingForm = createBillingForm(this.billingModel());

  async onCheckout(event: Event): Promise<void> {
    event.preventDefault();
    try {
      const res = await firstValueFrom(this.#checkoutApi.checkout());
      const formValue = this.billingForm().value();
      const billingDetails: BillingDetails = {
        id: crypto.randomUUID(),
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        address: formValue.address!,
        city: formValue.city!,
        zip: +formValue.zip,
        fullName: `${formValue.firstName} ${formValue.lastName}`,
        fullAddress: `${formValue.address} ${formValue.city}`,
      };
      this.#billingStorage.savebillingInfo(billingDetails);
      window.location.href = res.url;
    } catch (err) {
      console.error(err);
    }
  }
}
