import { inject, Injectable } from '@angular/core';
import {
  Category,
  Product,
  ProductApi,
  ProductApiShape,
  ProductsApiResponse,
  ProductViewModel,
} from '@product-module';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  #productApi = inject(ProductApi);

  getProducts(
    limit: number,
    skip: number,
    search?: string,
  ): Observable<ProductsApiResponse<ProductViewModel>> {
    return this.#productApi.products(limit, skip, search).pipe(
      map((result) => ({
        ...result,
        products: result.products.map((product) => this.mapProductsApiToView(product)),
      })),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private mapProductsApiToView(product: ProductApiShape): ProductViewModel {
    return {
      id: product.id,
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    };
  }

  getProductDetails(id: number): Observable<Product | null> {
    return this.#productApi.getProductDetails(id);
  }

  getProductCategories(): Observable<Category[]> {
    return this.#productApi.productCategories();
  }

  getProductsByCategory(category: string, limit: number, skip: number) {
    return this.#productApi.productsByCategory(category, limit, skip);
  }
}
