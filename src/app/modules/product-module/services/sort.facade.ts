import { Injectable, signal } from '@angular/core';
import { SortOrder } from '@product-module';

@Injectable({
  providedIn: 'root',
})
export class SortFacade {
  #sortOrder = signal<SortOrder>(SortOrder.DESC);

  readonly sortOrder = this.#sortOrder.asReadonly();

  set(order: SortOrder): void {
    this.#sortOrder.set(order);
  }

  toggleSort(): SortOrder {
    const next = this.#sortOrder() === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    this.#sortOrder.set(next);
    return next;
  }
}
