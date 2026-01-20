import { Component, output } from '@angular/core';
import { Search } from '@features';
import { CategoryComponent } from '@product-module';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [CategoryComponent, Search],
  templateUrl: './product-header.html',
})
export class ProductHeader {
  placeholder: string = 'Search products...';
  categoryValue = output<string>();
  searchValue = output<string>();

  onSearch(value: string): void {
    this.searchValue.emit(value);
    this.categoryValue.emit('');
  }

  onCategorySelected(value: string): void {
    this.categoryValue.emit(value);
    this.searchValue.emit('');
  }
}
