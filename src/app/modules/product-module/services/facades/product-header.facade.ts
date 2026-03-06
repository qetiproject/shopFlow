import { Injectable, signal } from '@angular/core';
import { ProductMode } from '@product-module/types/product';

@Injectable({ providedIn: 'root' })
export class ProductHeaderFacade {
  categoryValue = signal<string>('');
  searchValue = signal<string>('');
  mode = signal<ProductMode>(ProductMode.SEARCH);
}
