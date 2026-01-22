import { Component, inject, output } from '@angular/core';
import { SortFacade } from '../../services/sort.facade';
import { SortOrder } from '../../types/sort';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.html',
})
export class SortComponent {
  #sortFacade = inject(SortFacade);
  SORTORDER = SortOrder;
  sortedVale = output<SortOrder>();

  protected readonly sortOrder = this.#sortFacade.sortOrder;

  toggleSort(): void {
    let order = this.#sortFacade.toggleSort();
    this.sortedVale.emit(order);
  }
}
