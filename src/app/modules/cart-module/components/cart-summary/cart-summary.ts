import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RemoveSVG } from 'assets/icons';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, RemoveSVG],
  templateUrl: './cart-summary.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummary {
  total = input.required<number>();
  clearList = output<void>();
}
