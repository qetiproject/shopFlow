import { inject, Injectable } from "@angular/core";
import { ProductApi } from "@product-module";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade {
    #productApi = inject(ProductApi);

    // getProducts(): Observable<ProductViewModel[]> {
    //     return this.#productApi.products().pipe(
    //         map(result => result.products.map(product => this.mapProductsApiToView(product))
    //         )
    //     )
    // }

    // private mapProductsApiToView(product: ProductApiShape):ProductViewModel  {
    //     return {
    //         id: product.id,
    //         title: product.title,
    //         category: product.category,
    //         description: product.description,
    //         price: product.price,
    //         discountPercentage: product.discountPercentage,
    //         thumbnail: product.thumbnail
    //     }
    // }
}