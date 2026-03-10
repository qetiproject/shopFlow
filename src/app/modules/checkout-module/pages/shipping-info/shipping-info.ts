import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { INPUT_TYPES } from '@app-types/input';
import { CheckoutFacade } from '@checkout-module/services/checkout.facade';
import { createBillingForm, createBillingModel } from '@checkout-module/utils/billing-form';
import { BackButtonComponent } from '@components/back-button/back-button.component';
import { FieldInput } from '@features/custom-form/custom-signal-form/field-input';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [RouterLink, BackButtonComponent, FieldInput, FormField],
  templateUrl: './shipping-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingInfo {
  INPUT_TYPES = INPUT_TYPES;
  #checkoutFacade = inject(CheckoutFacade);

  readonly billingModel = createBillingModel;
  readonly billingForm = createBillingForm(this.billingModel());

  async onCheckout(event: Event): Promise<void> {
    event.preventDefault();

    if (this.billingForm().invalid()) {
      return;
    }

    await this.#checkoutFacade.checkout(this.billingForm().value());
  }
}
