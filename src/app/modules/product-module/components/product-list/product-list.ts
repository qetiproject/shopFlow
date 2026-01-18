import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductFacade, ProductItem } from '@product-module';
import { Paging } from 'app/components/paging/paging';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ProductItem, Paging],
  templateUrl: './product-list.html',
  providers: [ProductFacade],
})
export class ProductList {
  #productFacade = inject(ProductFacade);

  search = input<string>('');

  limit = signal<number>(10);
  pageNumber = signal<number>(1);
  windowSize = signal<number>(5);

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }

  // skip = computed(() => this.limit() * (this.pageNumber() - 1));
  skip = signal<number>(0);
  readonly productsResponse = toSignal(this.#productFacade.getProducts(this.limit(), this.skip()), {
    initialValue: null,
  });

  // readonly products = computed(() => {
  //   const search = this.search().toLowerCase();
  //   const products = this.productsResponse()?.products;

  //   if (!search) return products;

  //   return products?.filter(
  //     (p) => p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search),
  //   );
  // });
}
