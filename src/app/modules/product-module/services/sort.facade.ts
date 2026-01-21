import { Injectable, signal } from '@angular/core';
import { ProductMode } from '../components';
import { SortOrder } from '../types/sort';

@Injectable({
  providedIn: 'root',
})
export class SortFacade {
  sortBy: string = 'title';
  sortOrder = signal<SortOrder>(SortOrder.DESC);
  mode = signal<ProductMode>(ProductMode.SEARCH);

  setMode(mode: ProductMode) {
    this.mode.set(mode);
  }
  toggleSort() {
    this.sortOrder.set(this.sortOrder() === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    this.mode.set(ProductMode.ORDER);
  }
}
