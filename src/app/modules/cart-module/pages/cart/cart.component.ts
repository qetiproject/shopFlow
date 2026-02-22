import { Component, computed, inject } from '@angular/core';
import { CartProductItem } from '../../components/cart-product-item/cart-product-item';
import { CartSummary } from '../../components/cart-summary/cart-summary';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductItem, CartSummary],
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
