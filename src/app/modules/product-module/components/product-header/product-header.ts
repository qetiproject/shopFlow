import { Component, inject } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent, ProductMode } from '@product-module';
import { SortFacade } from '../../services/sort.facade';
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

  get categoryValue() {
    return this.#productHeaderFacade.categoryValue;
  }

  get searchValue() {
    return this.#productHeaderFacade.searchValue;
  }

  get mode() {
    return this.#sortFacade.mode;
  }

  onCategorySelected(value: string) {
    this.#productHeaderFacade.categoryValue.set(value);
    this.#productHeaderFacade.mode.set(ProductMode.CATEGORY);
    this.#productHeaderFacade.searchValue.set('');
  }

  onSearch(value: string) {
    this.#productHeaderFacade.searchValue.set(value);
    this.#productHeaderFacade.mode.set(ProductMode.SEARCH);
    this.#productHeaderFacade.categoryValue.set('');
  }
}
