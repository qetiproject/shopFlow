import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductFacade, ProductHeaderFacade, ProductMode, SortFacade } from '@product-module';

@Injectable({
  providedIn: 'root',
})
export class ProductlistFacade {
  #productFacade = inject(ProductFacade);
  #sortFacade = inject(SortFacade);
  #productHeaderFacade = inject(ProductHeaderFacade);

  search = this.#productHeaderFacade.searchValue;
  category = this.#productHeaderFacade.categoryValue;
  order = this.#sortFacade.sortOrder;

  limit = signal<number>(10);
  pageNumber = signal<number>(1);
  sort = signal<string>('title');

  constructor() {
    this.resetPageOnFiltersChange();
    this.loadProductsEffect();
  }

  private resetPageOnFiltersChange(): void {
    effect(() => {
      this.search();
      this.category();
      this.sort();
      this.order();

      untracked(() => this.pageNumber.set(1));
    });
  }

  private params = computed(() => ({
    mode: this.#productHeaderFacade.mode(),
    search: this.search(),
    category: this.category(),
    limit: this.limit(),
    page: this.pageNumber(),
    sort: this.sort(),
    order: this.order(),
    skip: this.limit() * (this.pageNumber() - 1),
  }));

  private loadProductsEffect(): void {
    effect(() => {
      const params = this.params();

      switch (params.mode) {
        case ProductMode.CATEGORY:
          if (!params.category) {
            this.#productFacade.loadProducts(params.limit, params.skip, params.search);
          } else {
            this.#productFacade.loadProductsByCategory(params.category, params.limit, params.skip);
          }
          break;

        case ProductMode.ORDER:
          this.#productFacade.loadProductsBySort(
            params.sort,
            params.order,
            params.limit,
            params.skip,
          );
          break;

        default:
          this.#productFacade.loadProducts(params.limit, params.skip, params.search);
      }
    });
  }

  productsResponse = toSignal(this.#productFacade.products$, {
    initialValue: {
      products: [],
      total: 0,
      limit: 10,
      skip: 0,
    },
  });
}
