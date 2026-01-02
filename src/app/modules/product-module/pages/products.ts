import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Search } from '@features';
import { ProductApi, ProductApiShape, ProductsApiResponse, ProductViewModel } from '@product-module';
import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';
import { ProductItem } from "../components/product-item/product-item";

@Component({
  selector: 'products',
  standalone: true,
  imports: [AsyncPipe, CommonModule, Search, ProductItem],
  templateUrl: './products.html',
})
export class Products {

  #productApi = inject(ProductApi);

  private search$ = new BehaviorSubject<string>('');
  private readonly productSource$: Observable<ProductsApiResponse<ProductApiShape>> = this.#productApi.products();
  products$: Observable<ProductsApiResponse<ProductViewModel>> = 
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

 columns = 3;

setColumns(count: number) {
  this.columns = count;
}
  onSearch(value: string): void {
    this.search$.next(value);
  }
}