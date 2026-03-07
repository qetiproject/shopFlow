
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Paging } from '@components/paging/paging';
import { ProductFacade } from '@product-module/services/product.facade';
import { ProductItem } from '@product-module/components/product-item/product-item';
import { ProductlistFacade } from '@product-module/services/facades/product-list.facade';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItem, Paging],
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
