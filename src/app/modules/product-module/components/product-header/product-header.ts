import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Search } from '@features';
import { CategoryComponent, ProductHeaderFacade, ProductMode, SortOrder } from '@product-module';
import { SortComponent } from '../sort/sort';

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [CategoryComponent, Search, SortComponent],
  templateUrl: './product-header.html',
})
export class ProductHeader {
  #productHeaderFacade = inject(ProductHeaderFacade);
  placeholder = 'Search products...';
  @ViewChild(Search) searchComponent!: Search;
  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;
  router = inject(Router);
  route = inject(ActivatedRoute);

  onCategorySelected(value: string) {
    this.#productHeaderFacade.categoryValue.set(value);
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.CATEGORY);
      this.#productHeaderFacade.searchValue.set('');
      this.searchComponent.search.setValue('', { emitEvent: false });
    }
  }

  onSearch(value: string) {
    this.#productHeaderFacade.searchValue.set(value);
    if (value) {
      this.#productHeaderFacade.mode.set(ProductMode.SEARCH);
      this.#productHeaderFacade.categoryValue.set('');
      this.categoryComponent.control.setValue('', { emitEvent: false });
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
    this.searchComponent.search.setValue('', { emitEvent: false });
    this.categoryComponent.control.setValue('', { emitEvent: false });
  }

  onAddProduct(): void {
    // this.router.navigate(
    //   [
    //     {
    //       outlets: {
    //         popup: ['add-product'],
    //       },
    //     },
    //   ],
    //   {
    //     relativeTo: this.route.parent,
    //   },
    // );
    this.router.navigate(['product/add-product']);
  }
}
