import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RemoveSVG } from 'assets/icons';

@Component({
  selector: 'app-checkout-canceled',
  standalone: true,
  imports: [RouterLink, RemoveSVG],
  templateUrl: './checkout-canceled.html',
})
export class CheckoutCanceled {}
