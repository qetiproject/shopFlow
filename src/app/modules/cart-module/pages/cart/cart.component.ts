import { Component, computed, inject } from '@angular/core';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [],
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
}
