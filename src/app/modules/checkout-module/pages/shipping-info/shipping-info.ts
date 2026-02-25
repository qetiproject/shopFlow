import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BillingDetails, BillingStorage, CheckoutApi } from '@checkout-module';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { INPUT_TYPES } from '@types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, DynamicValidatorMessage, RouterLink],
  templateUrl: './shipping-info.html',
})
export class ShippingInfo {
  INPUT_TYPES = INPUT_TYPES;
  #checkoutApi = inject(CheckoutApi);
  #billingStorage = inject(BillingStorage);

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    zip: new FormControl(0),
    address: new FormControl(''),
    city: new FormControl(''),
  });

  async onCheckout(): Promise<void> {
    try {
      const res = await firstValueFrom(this.#checkoutApi.checkout());
      const formValue = this.form.getRawValue();
      const billingDetails: BillingDetails = {
        id: crypto.randomUUID(),
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        address: formValue.address!,
        city: formValue.city!,
        zip: formValue.zip!,
      };
      this.#billingStorage.savebillingInfo(billingDetails);
      window.location.href = res.url;
    } catch (err) {
      console.error(err);
    }
  }
}
