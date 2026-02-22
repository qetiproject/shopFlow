import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartProductItem, CartStore, CartSummary } from '@cart-module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductItem, CartSummary, RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly store = inject(CartStore);

  private readonly actions = {
    decrease: (id: number) => this.store.decrease(id),
    increase: (id: number) => this.store.increase(id),
    remove: (id: number) => this.store.removeProductFromCart(id),
    clearList: () => this.store.clearList(),
  };

  readonly vm = computed(() => ({
    products: this.store.products(),
    total: this.store.total(),
    ...this.actions,
  }));
}
