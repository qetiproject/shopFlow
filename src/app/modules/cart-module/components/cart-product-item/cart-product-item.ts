import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CartProduct } from '@app-types/dto';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-product-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductItem {
  product = input.required<CartProduct>();
  decreaseQuantity = output<void>();
  increaseQuantity = output<void>();
  removeItem = output<void>();
}
