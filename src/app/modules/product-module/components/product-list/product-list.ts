import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '@product-module';
import { Paging } from 'app/components/paging/paging';
import { combineLatest, switchMap } from 'rxjs';
import { ProductFacade } from '../../services/product.facade';

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

  skip = computed(() => this.limit() * (this.pageNumber() - 1));

  readonly productsResponse = toSignal(
    combineLatest([
      toObservable(this.limit),
      toObservable(this.skip),
      toObservable(this.search),
    ]).pipe(
      switchMap(([limit, skip, search]) => this.#productFacade.getProducts(limit, skip, search)),
    ),
    { initialValue: null },
  );
}
