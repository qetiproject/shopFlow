import { Component, inject } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent, ProductMode } from '@product-module';
import { SortFacade } from '../../services/sort.facade';
import { SortOrder } from '../../types/sort';
import { SortComponent } from '../sort/sort';
import { ProductHeaderFacade } from './product-header.facade';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [CategoryComponent, Search, SortComponent],
  templateUrl: './product-header.html',
})
export class ProductHeader {
  #sortFacade = inject(SortFacade);
  #productHeaderFacade = inject(ProductHeaderFacade);
  placeholder: string = 'Search products...';

  onCategorySelected(value: string) {
    this.#productHeaderFacade.categoryValue.set(value);
    console.log(this.#productHeaderFacade.categoryValue(), 'value');
    this.#productHeaderFacade.mode.set(ProductMode.CATEGORY);
    this.#productHeaderFacade.searchValue.set('');
    this.#sortFacade.sortOrder.set(SortOrder.DESC);
  }

  onSearch(value: string) {
    this.#productHeaderFacade.searchValue.set(value);
    this.#productHeaderFacade.mode.set(ProductMode.SEARCH);
    this.#productHeaderFacade.categoryValue.set('');
    this.#sortFacade.sortOrder.set(SortOrder.DESC);
  }
}
