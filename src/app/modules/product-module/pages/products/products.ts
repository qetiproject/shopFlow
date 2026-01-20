import { Component, signal } from '@angular/core';
import { ProductList } from '@product-module';
import { ProductHeader } from '../../components/product-header/product-header';

@Component({
  selector: 'products',
  standalone: true,
  imports: [ProductList, ProductHeader],
  templateUrl: './products.html',
})
export class ProductsPage {
  categoryValue = signal<string>('');
  searchValue = signal<string>('');

  onSearch(value: string): void {
    this.searchValue.set(value);
  }
  onCategoryValue(value: string): void {
    this.categoryValue.set(value);
  }
}
