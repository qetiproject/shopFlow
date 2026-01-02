import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Search } from '@features';
import { ProductApi, ProductApiShape, ProductsApiResponse, ProductViewModel } from '@product-module';
import { TableColumn } from '@types';
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

  columns: TableColumn<ProductViewModel>[] = [];
  trackByProduct = (_: number, product: ProductViewModel) => product.id;
  
  ngAfterViewInit(): void { 
    this.columns = [
      { key: 'title', label: 'Title', cell: c => c.title },
      { key: 'description', label: 'description', cell: c => c.description },
      { key: 'category', label: 'category', cell: c => c.category },
      // { key: 'price', label: 'Price', cell: c => c.price },
      // { key: 'discountPercentage', label: 'DiscountPercentage', cell: c => c.discountPercentage },
      { key: 'thumbnail', label: 'thumbnail', cell: c => c.thumbnail }
    ]
  }

  onSearch(value: string): void {
    this.search$.next(value);
  }
}