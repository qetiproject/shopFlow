import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductItem } from '@product-module';
import { Paging } from 'app/components/paging/paging';
import { combineLatest, switchMap } from 'rxjs';
import { ProductFacade } from '../../services/product.facade';
import { SortOrder } from '../../types/sort';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ProductItem, Paging],
  templateUrl: './product-list.html',
})
export class ProductList {
  #productFacade = inject(ProductFacade);

  search = input<string>('');
  category = input<string>();

  limit = signal<number>(10);
  pageNumber = signal<number>(1);
  windowSize = signal<number>(5);
  order = input<SortOrder>();
  sort = signal<string>('title');

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }

  constructor() {
    this.resetPageOnSearchChange();
  }

  private resetPageOnSearchChange(): void {
    effect(() => {
      this.search();
      this.category();
      untracked(() => this.pageNumber.set(1));
    });
  }
  readonly productsResponse = toSignal(
    combineLatest([
      toObservable(this.limit),
      toObservable(this.pageNumber),
      toObservable(this.search),
      toObservable(this.category),
      toObservable(this.sort),
      toObservable(this.order),
    ]).pipe(
      switchMap(([limit, page, search, category, sort, order]) => {
        const skip = limit * (page - 1);

        if (sort && order) {
          return this.#productFacade.getProductsBySort(sort, order, limit, skip);
        }

        if (category) {
          return this.#productFacade.getProductsByCategory(category, limit, skip);
        }

        return this.#productFacade.getProducts(limit, skip, search);
      }),
    ),
    {
      initialValue: {
        limit: 10,
        skip: 0,
        products: [],
        total: 0,
      },
    },
  );

  // readonly productsResponse = toSignal(
  //   combineLatest([
  //     toObservable(this.limit),
  //     toObservable(this.pageNumber),
  //     toObservable(this.search),
  //     toObservable(this.category),
  //     toObservable(this.sortBy),
  //     toObservable(this.sortOrder),
  //   ]).pipe(
  //     switchMap(([limit, page, search, category, sortBy, sortOrder]) => {
  //       let skip = limit * (page - 1);

  //       if (sortBy) {
  //         return this.#productFacade.getProductsBySort(sortBy, sortOrder, limit, skip);
  //       }

  //       if (category) {
  //         return this.#productFacade.getProductsByCategory(category, limit, skip);
  //       }

  //       return this.#productFacade.getProducts(limit, skip, search);
  //     }),
  //   ),
  //   { initialValue: { limit: 10, skip: 0, products: [], total: 0 } },
  // );
}
