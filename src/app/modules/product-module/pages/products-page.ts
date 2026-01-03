import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Search } from '@features';
import { ProductList } from "@product-module";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'products',
  standalone: true,
  imports: [CommonModule, Search, ProductList],
  templateUrl: './products-page.html',
})
export class ProductsPage {

  search$ = new BehaviorSubject<string>('');
  placeholder: string = "Search product with title or description";
  
  onSearch(value: string): void {
    this.search$.next(value);
  }
}