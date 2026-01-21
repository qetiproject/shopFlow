import { Component, inject, output, ViewChild } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent, ProductMode } from '@product-module';
import { SortFacade } from '../../services/sort.facade';
import { SortComponent } from '../sort/sort';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [CategoryComponent, Search, SortComponent],
  templateUrl: './product-header.html',
})
export class ProductHeader {
  @ViewChild(Search) searchComponent!: Search;
  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;
  #sortFacade = inject(SortFacade);

  placeholder: string = 'Search products...';
  categoryValue = output<string>();
  searchValue = output<string>();
  get mode() {
    return this.#sortFacade.mode;
  }
  onSearch(value: string): void {
    this.searchValue.emit(value);
    this.#sortFacade.setMode(ProductMode.SEARCH);
    if (value) {
      this.categoryValue.emit('');
      this.categoryComponent.control.setValue('', { emitEvent: false });
    }
  }

  onCategorySelected(value: string): void {
    this.categoryValue.emit(value);
    this.#sortFacade.setMode(ProductMode.CATEGORY);
    if (value) {
      this.searchValue.emit('');
      this.searchComponent.search.setValue('', { emitEvent: false });
    }
  }
}
