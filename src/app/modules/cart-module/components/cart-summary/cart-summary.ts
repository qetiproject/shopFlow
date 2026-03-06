import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RemoveSVG } from 'assets/icons';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RemoveSVG],
  templateUrl: './cart-summary.html',
})
export class CartSummary {
  total = input.required<number>();
  order = output<void>();
  clearList = output<void>();
}
