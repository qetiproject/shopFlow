import { Component, output, signal } from '@angular/core';
import { SortOrder } from '../../types/sort';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.html',
})
export class SortComponent {
  sortBy: string = 'title';
  sortOrder = signal<SortOrder>(SortOrder.DESC);
  order = output<SortOrder>();

  SORTORDER = SortOrder;

  toggleSort() {
    this.sortOrder.set(this.sortOrder() === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    this.order.emit(this.sortOrder());
  }
}
