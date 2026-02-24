import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env-dev';

@Injectable({ providedIn: 'root' })
export class CheckoutApi {
  #http = inject(HttpClient);

  checkout(items: any[]) {
    return this.#http.post<{ url: string }>(environment.checkout, { items });
  }
}
