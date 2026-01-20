import { Component, output, ViewChild } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent } from '@product-module';
import { SortOrder } from '../../types/sort';
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
  @ViewChild(SortComponent) sortComponent!: SortComponent;

  placeholder: string = 'Search products...';
  categoryValue = output<string>();
  searchValue = output<string>();
  orderValue = output<SortOrder>();

  onSearch(value: string): void {
    this.searchValue.emit(value);
    if (value) {
      this.categoryValue.emit('');
      this.categoryComponent.control.setValue('', { emitEvent: false });
    }
  }

  onCategorySelected(value: string): void {
    this.categoryValue.emit(value);
    if (value) {
      this.searchValue.emit('');
      this.searchComponent.search.setValue('', { emitEvent: false });
    }
  }

  onOrder(value: SortOrder): void {
    this.orderValue.emit(value);
  }
}
