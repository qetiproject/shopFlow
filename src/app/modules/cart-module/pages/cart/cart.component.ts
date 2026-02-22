import { Component, inject, OnInit } from '@angular/core';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  providers: [CartStore],
})
export class CartComponent implements OnInit {
  store = inject(CartStore);

  cartProducts = () => this.store.cart();
  total = () => this.store.cart().total;
  totalQuantity = () => this.store.cart().totalQuantity;

  ngOnInit(): void {
    console.log(this.cartProducts());
  }
}
