import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ProductFacade } from '../../services/product.facade';
import { SortFacade } from '../../services/sort.facade';
import { ProductHeaderFacade } from '../product-header/product-header.facade';
import { ProductMode } from './product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductlistFacade {
  #productFacade = inject(ProductFacade);
  #sortFacade = inject(SortFacade);
  #productHeaderFacade = inject(ProductHeaderFacade);

  search = this.#productHeaderFacade.searchValue;
  category = this.#productHeaderFacade.categoryValue;

  limit = signal<number>(10);
  pageNumber = signal<number>(1);
  windowSize = signal<number>(5);
  order = this.#sortFacade.sortOrder;
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
      this.sort();
      this.order();
      untracked(() => this.pageNumber.set(1));
    });
  }

  private params = computed(() => {
    return {
      mode: this.#productHeaderFacade.mode(),
      search: this.search(),
      category: this.category(),
      limit: this.limit(),
      page: this.pageNumber(),
      sort: this.sort(),
      order: this.order(),
      skip: this.limit() * (this.pageNumber() - 1),
    };
  });

  private resolveRequest(
    params: ReturnType<typeof this.params>,
  ): ReturnType<ProductFacade['getProducts']> {
    const { mode, category, sort, order, limit, skip, search } = params;

    switch (mode) {
      case ProductMode.CATEGORY:
        if (!category) {
          return this.#productFacade.getProducts(limit, skip, search);
        }
        return this.#productFacade.getProductsByCategory(category!, limit, skip);
      case ProductMode.ORDER:
        return this.#productFacade.getProductsBySort(sort, order, limit, skip);
      default:
        return this.#productFacade.getProducts(limit, skip, search);
    }
  }

  productsResponse = toSignal(
    toObservable(this.params).pipe(switchMap((params) => this.resolveRequest(params))),
    {
      initialValue: {
        products: [],
        total: 0,
        limit: 10,
        skip: 0,
      },
    },
  );
}
