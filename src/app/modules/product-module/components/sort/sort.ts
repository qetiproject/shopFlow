import { Component, inject, ViewChild } from '@angular/core';
import { SortFacade } from '../../services/sort.facade';
import { SortOrder } from '../../types/sort';
import { ProductHeader } from '../product-header/product-header';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [],
  templateUrl: './sort.html',
})
export class SortComponent {
  #sortFacade = inject(SortFacade);
  SORTORDER = SortOrder;
  @ViewChild(ProductHeader) productHeader!: ProductHeader;

  protected readonly sortOrder = this.#sortFacade.sortOrder;

  toggleSort() {
    this.#sortFacade.toggleSort();
  }
}
