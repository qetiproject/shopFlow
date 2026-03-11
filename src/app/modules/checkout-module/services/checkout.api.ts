import { computed, inject, Injectable } from '@angular/core';
import { ApiClient, Endpoints } from '@api';
import type { CheckoutResponseDto } from '@app-types/dto';
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

  checkout(): Observable<CheckoutResponseDto> {
    return this.#api.post<CheckoutResponseDto>(this.#baseUrl, Endpoints.checkout.create, {
      items: this.vm().cart,
    });
  }
}
