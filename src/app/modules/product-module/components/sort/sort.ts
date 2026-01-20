import { Component, inject } from '@angular/core';
import { SortFacade } from '../../services/sort.facade';
import { SortOrder } from '../../types/sort';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.html',
  providers: [SortFacade],
})
export class SortComponent {
  #sortFacade = inject(SortFacade);
  SORTORDER = SortOrder;

  protected readonly sortOrder = this.#sortFacade.sortOrder;

  toggleSort() {
    this.#sortFacade.toggleSort();
  }
}
