import { Component, inject, ViewChild } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent, ProductMode, SortOrder } from '@product-module';
import { SortComponent } from '../index';
import { ProductHeaderFacade } from './product-header.facade';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [CategoryComponent, Search, SortComponent],
  templateUrl: './product-header.html',
})
export class ProductHeader {
  #productHeaderFacade = inject(ProductHeaderFacade);
  placeholder: string = 'Search products...';
  @ViewChild(Search) searchComponent!: Search;
  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;

  onCategorySelected(value: string) {
    this.#productHeaderFacade.categoryValue.set(value);
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.CATEGORY);
      this.#productHeaderFacade.searchValue.set('');
      this.searchComponent.search.setValue('', { emitEvent: false });
    }
  }

  onSearch(value: string) {
    this.#productHeaderFacade.searchValue.set(value);
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.SEARCH);
      this.#productHeaderFacade.categoryValue.set('');
      this.categoryComponent.control.setValue('', { emitEvent: false });
    }
  }

  onOrdered(value: SortOrder): void {
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.ORDER);
      this.resetFilters();
    }
  }

  private resetFilters(): void {
    this.#productHeaderFacade.categoryValue.set('');
    this.#productHeaderFacade.searchValue.set('');
    this.searchComponent.search.setValue('', { emitEvent: false });
    this.categoryComponent.control.setValue('', { emitEvent: false });
  }
}
