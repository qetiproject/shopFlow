import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { apply, form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { BillingForm } from '@checkout-module';
import { BackButtonComponent } from '@components';
import { createNameSchema } from '@custom-form/custom-signal-form/custom-error-message';
import { StatefulInput } from '@custom-form/custom-signal-form/stateful-input';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, RouterLink, BackButtonComponent, StatefulInput, FormField],
  templateUrl: './shipping-info.html',
})
export class ShippingInfo {
  // INPUT_TYPES = INPUT_TYPES;
  // #checkoutApi = inject(CheckoutApi);
  // #billingStorage = inject(BillingStorage);
  // form = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   zip: new FormControl(0),
  //   address: new FormControl(''),
  //   city: new FormControl(''),
  // });
  // async onCheckout(): Promise<void> {
  //   try {
  //     const res = await firstValueFrom(this.#checkoutApi.checkout());
  //     const formValue = this.form.getRawValue();
  //     const billingDetails: BillingDetails = {
  //       id: crypto.randomUUID(),
  //       firstName: formValue.firstName!,
  //       lastName: formValue.lastName!,
  //       address: formValue.address!,
  //       city: formValue.city!,
  //       zip: formValue.zip!,
  //       fullName: `${formValue.firstName} ${formValue.lastName}`,
  //       fullAddress: `${formValue.address} ${formValue.city}`,
  //     };
  //     this.#billingStorage.savebillingInfo(billingDetails);
  //     window.location.href = res.url;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

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

  onCheckout(event: Event): void {
    event.preventDefault();
    console.log(this.billingForm().value(), 'value');
  }
}
