import { Component, inject } from '@angular/core';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  providers: [CartStore],
})
export class CartComponent {
  store = inject(CartStore);
  carts = this.store.carts;
}
