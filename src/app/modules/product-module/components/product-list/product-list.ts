import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductItem } from '@product-module';
import { Paging } from 'app/components/paging/paging';
import { ProductlistFacade } from './product-list.facade';

export enum ProductMode {
  SEARCH = 'search',
  CATEGORY = 'category',
  ORDER = 'order',
}

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ProductItem, Paging],
  templateUrl: './product-list.html',
})
export class ProductList {
  #productListFacade = inject(ProductlistFacade);

  limit = this.#productListFacade.limit;
  pageNumber = this.#productListFacade.pageNumber;

  readonly productsResponse = this.#productListFacade.productsResponse;

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }
}
