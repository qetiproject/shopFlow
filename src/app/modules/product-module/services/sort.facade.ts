import { Injectable, signal } from '@angular/core';
import { SortOrder } from '../types/sort';

@Injectable({
  providedIn: 'root',
})
export class SortFacade {
  sortBy: string = 'title';
  sortOrder = signal<SortOrder>(SortOrder.DESC);

  toggleSort() {
    this.sortOrder.set(this.sortOrder() === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
  }
}
