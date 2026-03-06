import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { CartStore } from '@cart-module/store/cart.store';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckoutApi {
  #http = inject(HttpClient);
  #cartStore = inject(CartStore);

  readonly vm = computed(() => ({
    cart: this.#cartStore.cart(),
  }));

  checkout(): Observable<{ url: string }> {
    return this.#http.post<{ url: string }>(`${environment.api}/checkout`, {
      items: this.vm().cart,
    });
  }
}
