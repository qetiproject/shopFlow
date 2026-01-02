import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Search } from '@features';
import { Product, ProductApi, ProductsApiResponse } from '@product-module';
import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';

@Component({
  selector: 'products',
  standalone: true,
  imports: [AsyncPipe, CommonModule, Search],
  templateUrl: './products.html',
})
export class Products {

  #productApi = inject(ProductApi);

  private search$ = new BehaviorSubject<string>('');
  private readonly productSource$: Observable<ProductsApiResponse<Product>> = this.#productApi.products();
  products$: Observable<ProductsApiResponse<Product>> = 
    this.search$.pipe(
      withLatestFrom(this.productSource$),
      map(([search, result]) => {
        return {
          ...result,
          products: !search
          ? result.products
          : result.products.filter(p => 
            p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
        }
      })
  )
  ngAfterViewInit(): void { 
  }

  onSearch(value: string): void {
    this.search$.next(value);
  }
}