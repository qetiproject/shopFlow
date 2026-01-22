import { Injectable, signal } from '@angular/core';
import { ProductMode } from '@product-module';

@Injectable({ providedIn: 'root' })
export class ProductHeaderFacade {
  categoryValue = signal<string>('');
  searchValue = signal<string>('');
  mode = signal<ProductMode>(ProductMode.SEARCH);

  // // resetFilters() {
  // //   this.categoryValue.set('');
  // //   this.searchValue.set('');
  // //   this.mode.set(ProductMode.SEARCH);
  // // }
}
