import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  store = inject(CartStore);

  cartProducts = this.store.cart;
  total = computed(() => this.store.cart().total);
  totalQuantity = computed(() => this.store.cart().totalQuantity);

  removeProductFromCart(id: number): void {
    this.store.removeProductFromCart(id);
  }

  decrease(id: number): void {
    this.store.decrease(id);
  }

  increase(id: number): void {
    this.store.increase(id);
  }
}
