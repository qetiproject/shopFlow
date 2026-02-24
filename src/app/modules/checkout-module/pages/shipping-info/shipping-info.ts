import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@env-dev';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { INPUT_TYPES } from '@types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-shipping-info',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, DynamicValidatorMessage],
  templateUrl: './shipping-info.html',
})
export class ShippingInfo {
  INPUT_TYPES = INPUT_TYPES;
  http = inject(HttpClient);

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
      const res: any = await firstValueFrom(
        this.http.post(environment.checkout, { items: this.cart.items }),
      );

      window.location.href = res.url;
    } catch (err) {
      console.error(err);
    }
  }
}
