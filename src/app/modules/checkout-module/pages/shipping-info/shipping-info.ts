import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CheckoutFacade, createBillingForm, createBillingModel } from '@checkout-module';
import { BackButtonComponent } from '@components';
import { FieldInput } from '@features';
import { INPUT_TYPES } from '@types';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [RouterLink, BackButtonComponent, FieldInput, FormField, NgClass],
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
