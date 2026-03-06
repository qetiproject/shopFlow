import { Component, inject, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Search } from '@features/search/search';
import { CategoryComponent } from '@product-module/components/category/category';
import { ProductHeaderFacade } from '@product-module/services/facades/product-header.facade';
import { ProductMode } from '@product-module/types/product';
import { SortOrder } from '@product-module/types/sort';
import { PlusSVG } from 'assets/icons';
import { SortComponent } from '../sort/sort';

@Component({
  selector: 'app-products-page-header',
  standalone: true,
  imports: [CategoryComponent, Search, SortComponent, PlusSVG],
  templateUrl: './products-page-header.html',
})
export class ProducsPagetHeader {
  #productHeaderFacade = inject(ProductHeaderFacade);
  placeholder = 'Search products...';
  readonly searchComponent = viewChild.required(Search);
  readonly categoryComponent = viewChild.required(CategoryComponent);
  router = inject(Router);
  route = inject(ActivatedRoute);

  onCategorySelected(value: string) {
    this.#productHeaderFacade.categoryValue.set(value);
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.CATEGORY);
      this.#productHeaderFacade.searchValue.set('');
      this.searchComponent().search.setValue('', { emitEvent: false });
    }
  }

  onSearch(value: string) {
    this.#productHeaderFacade.searchValue.set(value);
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.SEARCH);
      this.#productHeaderFacade.categoryValue.set('');
      this.categoryComponent().control.setValue('', { emitEvent: false });
    }
  }

  onOrdered(value: SortOrder): void {
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.ORDER);
      this.resetFilters();
    }
  }

  private resetFilters(): void {
    this.#productHeaderFacade.categoryValue.set('');
    this.#productHeaderFacade.searchValue.set('');
    this.searchComponent().search.setValue('', { emitEvent: false });
    this.categoryComponent().control.setValue('', { emitEvent: false });
  }

  onAddProduct(): void {
    this.router.navigate([{ outlets: { modal: ['add-product'] } }], { relativeTo: this.route });
  }
}
