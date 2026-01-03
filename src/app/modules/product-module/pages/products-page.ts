import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Search } from '@features';
import { BehaviorSubject } from 'rxjs';
import { ProductList } from "../components/product-list/product-list";

@Component({
  selector: 'products',
  standalone: true,
  imports: [CommonModule, Search, ProductList],
  templateUrl: './products-page.html',
})
export class ProductsPage {

  search$ = new BehaviorSubject<string>('');

  onSearch(value: string): void {
    this.search$.next(value);
  }
}