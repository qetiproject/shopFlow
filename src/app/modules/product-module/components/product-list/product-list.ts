import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Paging } from '@components';
import { ProductFacade, ProductItem, ProductlistFacade } from '@product-module';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItem, Paging],
  templateUrl: './product-list.html',
})
export class ProductList {
  #productListFacade = inject(ProductlistFacade);
  productFacade = inject(ProductFacade);

  limit = this.#productListFacade.limit;
  pageNumber = this.#productListFacade.pageNumber;

  readonly productsResponse = this.#productListFacade.productsResponse;
  products = toSignal(this.productFacade.products$);

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }
}
