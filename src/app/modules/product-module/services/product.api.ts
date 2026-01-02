import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env-dev';
import { ProductApiShape, ProductsApiResponse, ProductViewModel } from '@product-module';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  #http = inject(HttpClient);
  
  private readonly baseUrl = environment.product;

  products(): Observable<ProductViewModel[]> {
    return this.#http
      .get<ProductsApiResponse<ProductApiShape>>(
        `${this.baseUrl}/products`)
        .pipe(
          map(result => result.products
            .map(product => this.mapProductsApiToView(product))
          )
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