import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '@cart-module';
import { BillingStorage, Order, OrderStorage } from '@checkout-module';
import { SuccessSVG } from 'assets/icons';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink, SuccessSVG],
  templateUrl: './checkout-success.html',
})
export class CheckoutSuccess implements OnInit {
  #cartStore = inject(CartStore);
  #orderStorage = inject(OrderStorage);
  #billingStorage = inject(BillingStorage);

  ngOnInit() {
    const billing = this.#billingStorage.getBillingInfo();
    const products = this.#cartStore.products();
    const total = this.#cartStore.total();
    const order: Order = {
      id: crypto.randomUUID(),
      billing: billing!,
      products,
      total,
      status: 'paid',
      createdAt: new Date(),
    };

    this.#orderStorage.saveOrder(order);
    this.#cartStore.clearList();
  }
}
