import { CommonModule } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProductItem } from "@product-module";
import { ProductFacade } from "../../services/product.facade";

@Component({
    selector: 'product-list',
    standalone: true,
    imports: [CommonModule, ProductItem],
    templateUrl: './product-list.html',
    providers: [ProductFacade]
})
export class ProductList {
  #productFacade = inject(ProductFacade);

  search = input<string>('');

   private readonly productsResponse = toSignal(
    this.#productFacade.getProducts(),
    {
      initialValue: null
    }
  );

  readonly products = computed(() => {
    const search = this.search().toLowerCase();
    const products = this.productsResponse()?.products;

    if (!search) return products;

    return products?.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  });
}