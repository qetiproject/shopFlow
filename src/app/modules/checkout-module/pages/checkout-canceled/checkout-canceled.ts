import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RemoveSVG } from 'assets/icons';

@Component({
  selector: 'app-checkout-canceled',
  standalone: true,
  imports: [RouterLink, RemoveSVG],
  templateUrl: './checkout-canceled.html',
})
export class CheckoutCanceled {
  customClasses = signal<string>('mx-auto h-16 w-16 text-red-500 mb-4');
}
