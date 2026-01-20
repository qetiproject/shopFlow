import { Component, output, ViewChild } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent } from '@product-module';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [CategoryComponent, Search],
  templateUrl: './product-header.html',
})
export class ProductHeader {
  @ViewChild(Search) searchComponent!: Search;
  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;

  placeholder: string = 'Search products...';
  categoryValue = output<string>();
  searchValue = output<string>();

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
}
