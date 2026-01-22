import { Component, inject } from '@angular/core';
import { SortFacade } from '../../services/sort.facade';
import { SortOrder } from '../../types/sort';
import { ProductHeaderFacade } from '../product-header/product-header.facade';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.html',
})
export class SortComponent {
  #sortFacade = inject(SortFacade);
  SORTORDER = SortOrder;
  #productHeaderFacade = inject(ProductHeaderFacade);

  protected readonly sortOrder = this.#sortFacade.sortOrder;

  toggleSort() {
    this.#sortFacade.toggleSort();
    this.#productHeaderFacade.resetFilters();
  }
}
