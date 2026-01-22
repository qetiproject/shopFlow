import { Component, inject, ViewChild } from '@angular/core';
import { Search } from '@features';
import { ProductMode } from '@product-module';
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

  @ViewChild(Search) searchComponent!: Search;

  toggleSort() {
    this.#sortFacade.toggleSort();
    this.#productHeaderFacade.categoryValue.set('');
    this.#productHeaderFacade.searchValue.set('');
    this.#productHeaderFacade.mode.set(ProductMode.ORDER);
    this.searchComponent.search.setValue('');
  }
}
