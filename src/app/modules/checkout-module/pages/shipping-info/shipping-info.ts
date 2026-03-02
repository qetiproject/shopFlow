import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { apply, form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { BillingDetails, BillingForm, BillingStorage, CheckoutApi } from '@checkout-module';
import { BackButtonComponent } from '@components';
import { createNameSchema } from '@custom-form/custom-signal-form/custom-error-message';
import { FieldInput } from '@custom-form/custom-signal-form/field-input';
import { INPUT_TYPES } from '@types';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, RouterLink, BackButtonComponent, FieldInput, FormField],
  templateUrl: './shipping-info.html',
})
export class ShippingInfo {
  INPUT_TYPES = INPUT_TYPES;
  #checkoutApi = inject(CheckoutApi);
  #billingStorage = inject(BillingStorage);
  // form = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   zip: new FormControl(0),
  //   address: new FormControl(''),
  //   city: new FormControl(''),
  // });

  protected readonly billingModel = signal<BillingForm>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  });

  protected readonly billingForm = form(this.billingModel, (path) => {
    apply(path.firstName, createNameSchema('First Name'));
    apply(path.lastName, createNameSchema('Last Name'));
    apply(path.city, createNameSchema('City'));
    apply(path.address, createNameSchema('Address'));
  });

  async onCheckout(event: Event): Promise<void> {
    event.preventDefault();
    try {
      // const res = await firstValueFrom(this.#checkoutApi.checkout());
      const formValue = this.billingForm().value();
      const billingDetails: BillingDetails = {
        id: crypto.randomUUID(),
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        address: formValue.address!,
        city: formValue.city!,
        // zip: formValue.zip!,
        fullName: `${formValue.firstName} ${formValue.lastName}`,
        fullAddress: `${formValue.address} ${formValue.city}`,
      };

      console.log(billingDetails, 'billingDetails');
      // this.#billingStorage.savebillingInfo(billingDetails);
      // window.location.href = res.url;
    } catch (err) {
      console.error(err);
    }
  }
}
