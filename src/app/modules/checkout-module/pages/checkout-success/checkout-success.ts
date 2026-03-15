import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserStorage } from '@auth-module/services';
import { CartStore } from '@cart-module/store/cart.store';
import { BillingStorage } from '@checkout-module/services/billing.storage';
import { OrderStorage } from '@checkout-module/services/orders.storage';
import type { Order } from '@app-types/dto';
import { SuccessSVG } from 'assets/icons/success';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink, SuccessSVG],
  templateUrl: './checkout-success.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutSuccess implements OnInit {
  #cartStore = inject(CartStore);
  #orderStorage = inject(OrderStorage);
  #billingStorage = inject(BillingStorage);
  #userStorage = inject(UserStorage);
  #router = inject(Router);

  ngOnInit(): void {
    const billing = this.#billingStorage.getBillingInfo();

    if (!billing) {
      this.#router.navigate(['/cart']);
      return;
    }

    const user = this.#userStorage.getUser();
    const products = this.#cartStore.products();
    const total = this.#cartStore.total();

    const order: Order = {
      id: crypto.randomUUID(),
      billing,
      products,
      total,
      status: 'paid',
      createdAt: new Date(),
      userId: user!.userId,
    };

    this.#orderStorage.saveOrder(order);
    this.#cartStore.clearList();
  }
}
