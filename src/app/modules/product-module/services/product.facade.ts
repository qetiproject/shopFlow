import { inject, Injectable } from "@angular/core";
import { ProductApi, ProductApiShape, ProductsApiResponse, ProductViewModel } from "@product-module";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade {
    #productApi = inject(ProductApi);

    getProducts(): Observable<ProductsApiResponse<ProductViewModel>> {
        return this.#productApi.products().pipe(
            map(result => ({
                ...result,
                products: result.products.map(product => this.mapProductsApiToView(product))
            }))
        )
    }

    private mapProductsApiToView(product: ProductApiShape):ProductViewModel  {
        return {
            id: product.id,
            title: product.title,
            category: product.category,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            thumbnail: product.thumbnail
        }
    }
}