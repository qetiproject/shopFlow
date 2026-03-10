import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartProductItem } from '@cart-module/components/cart-product-item/cart-product-item';
import { CartStore } from '@cart-module/store/cart.store';
import { CartSummary } from '@cart-module/components/cart-summary/cart-summary';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductItem, CartSummary, RouterLink],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
