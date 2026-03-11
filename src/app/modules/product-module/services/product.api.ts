import { inject, Injectable } from '@angular/core';
import { ApiClient, Endpoints } from '@api';
import type {
  AddProductRequest,
  Category,
  Product,
  ProductApiShape,
  ProductsApiResponse,
  ProductDeleteResponse,
} from '@app-types/dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  readonly #api = inject(ApiClient);
  readonly #baseUrl = this.#api.baseUrls.product;

  products(
    limit: number,
    skip: number,
    search?: string,
  ): Observable<ProductsApiResponse<ProductApiShape>> {
    const params: Record<string, string | number> = { limit, skip };
    if (search) params['q'] = search;
    return this.#api.get<ProductsApiResponse<ProductApiShape>>(
      this.#baseUrl,
      Endpoints.product.search,
      { params },
    );
  }

  getProductDetails(id: number): Observable<Product | null> {
    return this.#api.get<Product>(this.#baseUrl, Endpoints.product.byId(id));
  }

  productCategories(): Observable<Category[]> {
    return this.#api.get<Category[]>(this.#baseUrl, Endpoints.product.categories);
  }

  productsByCategory(
    category: string,
    limit: number,
    skip: number,
  ): Observable<ProductsApiResponse<ProductApiShape>> {
    return this.#api.get<ProductsApiResponse<ProductApiShape>>(
      this.#baseUrl,
      Endpoints.product.category(category),
      { params: { limit, skip } },
    );
  }

  productsBySort(
    sortBy: string,
    orderBy: string,
    limit: number,
    skip: number,
  ): Observable<ProductsApiResponse<Product>> {
    return this.#api.get<ProductsApiResponse<Product>>(this.#baseUrl, Endpoints.product.root, {
      params: { sortBy, order: orderBy, limit, skip },
    });
  }

  addProduct(product: AddProductRequest): Observable<AddProductRequest> {
    return this.#api.post<AddProductRequest>(this.#baseUrl, Endpoints.product.add, product);
  }

  deleteProduct(id: number): Observable<ProductDeleteResponse> {
    return this.#api.delete<ProductDeleteResponse>(this.#baseUrl, Endpoints.product.byId(id));
  }
}
