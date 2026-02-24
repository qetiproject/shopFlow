import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { INPUT_TYPES } from '@types';
import { firstValueFrom } from 'rxjs';
import { CheckoutApi } from '../../services';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, DynamicValidatorMessage],
  templateUrl: './shipping-info.html',
})
export class ShippingInfo {
  INPUT_TYPES = INPUT_TYPES;
  #checkoutApi = inject(CheckoutApi);

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    zip: new FormControl(0),
    address: new FormControl(''),
    city: new FormControl(''),
  });

  onCancel(): void {}
  onSubmit(): void {}

  cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
    ],
  };

  async onCheckout(): Promise<void> {
    try {
      const res = await firstValueFrom(this.#checkoutApi.checkout(this.cart.items));
      window.location.href = res.url;
    } catch (err) {
      console.error(err);
    }
  }
}
