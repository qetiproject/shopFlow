import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Paging } from '@components';
import { ProductItem } from '@product-module';
import { ProductlistFacade } from './product-list.facade';

@Component({
  selector: 'app-product-list',
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
