import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ProductFacade } from "../../services";
import { ProductsApiResponse, ProductViewModel } from "../../types";
import { ProductItem } from "../product-item/product-item";

@Component({
    selector: 'product-list',
    standalone: true,
    imports: [CommonModule, ProductItem],
    templateUrl: './product-list.html'
})
export class ProductList {
    #productFacade = inject(ProductFacade);

    @Input() search$ = Observable<string>;
    private readonly productSource$: Observable<ProductsApiResponse<ProductViewModel>> = this.#productFacade.getProducts();
    // products$: Observable<ProductsApiResponse<ProductViewModel>> = 
    //     this.search$.pipe(
    //     withLatestFrom(this.productSource$),
    //     map(([search, result]) => {
    //         return {
    //         ...result,
    //         products: !search
    //         ? result.products
    //         : result.products.filter(p => 
    //             p.title.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
    //         }
    //     })
    // )
    products$: Observable<ProductsApiResponse<ProductViewModel>> = this.productSource$
}