import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { ProductFacade, ProductItem } from "@product-module";
import { combineLatest, defer, map, Observable, of } from "rxjs";

@Component({
    selector: 'product-list',
    standalone: true,
    imports: [CommonModule, ProductItem],
    templateUrl: './product-list.html'
})
export class ProductList {
  #productFacade = inject(ProductFacade);

  @Input() search$?: Observable<string>;

  private readonly productSource$ = this.#productFacade.getProducts()

  private readonly safeSearch$ = defer(() =>
    (this.search$ ?? of(''))
  );

  products$ = combineLatest([
    this.productSource$,
    this.safeSearch$
  ]).pipe(
    map(([response, search]) => ({
      ...response,
      products: !search
        ? response.products
        : response.products.filter(p =>
            p.title.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search)
          )
    }))
  );
}