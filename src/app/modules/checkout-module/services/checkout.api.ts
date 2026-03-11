import { computed, inject, Injectable } from '@angular/core';
import { ApiClient, Endpoints } from '@api';
import { CartStore } from '@cart-module/store/cart.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutApi {
  readonly #api = inject(ApiClient);
  readonly #cartStore = inject(CartStore);
  readonly #baseUrl = this.#api.baseUrls.api;

  readonly vm = computed(() => ({
    cart: this.#cartStore.cart(),
  }));

  checkout(): Observable<{ url: string }> {
    return this.#api.post<{ url: string }>(this.#baseUrl, Endpoints.checkout.create, {
      items: this.vm().cart,
    });
  }
}
