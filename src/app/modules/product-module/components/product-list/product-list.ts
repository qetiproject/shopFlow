import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal, untracked } from '@angular/core';
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

  constructor() {
    this.resetPageOnSearchChange();
  }

  private resetPageOnSearchChange(): void {
    effect(() => {
      this.search();
      untracked(() => this.pageNumber.set(1));
    });
  }
  readonly productsResponse = toSignal(
    combineLatest([
      toObservable(this.limit),
      toObservable(this.pageNumber),
      toObservable(this.search),
    ]).pipe(
      switchMap(([limit, page, search]) =>
        this.#productFacade.getProducts(limit, limit * (page - 1), search),
      ),
    ),
    { initialValue: { limit: 10, skip: 0, products: [], total: 0 } },
  );
}
