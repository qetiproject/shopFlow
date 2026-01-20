import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Search } from '@features';
import { ProductList } from '@product-module';
import { BehaviorSubject } from 'rxjs';
import { CategoryComponent } from '../../components/category/category';

@Component({
  selector: 'products',
  standalone: true,
  imports: [Search, ProductList, CategoryComponent],
  templateUrl: './products.html',
})
export class ProductsPage {
  search$ = new BehaviorSubject<string>('');
  placeholder: string = 'Search product with title or description';

  searchToSignal = toSignal(this.search$, { initialValue: '' });
  categoryValue = signal<string | null>(null);

  onSearch(value: string): void {
    this.search$.next(value);
  }

  onCategorySelected(value: string | null): void {
    this.categoryValue.set(value);
  }
}
