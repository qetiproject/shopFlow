import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CartProduct } from '@cart-module';

@Component({
  selector: 'app-cart-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-product-item.html',
})
export class CartProductItem {
  product = input.required<CartProduct>();
  decreaseQuantity = output<void>();
  increaseQuantity = output<void>();
  removeItem = output<void>();
}
