import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import {
  AddProductModel,
  Product,
  ProductApiShape,
  ProductsApiResponse,
  ResponseProductDelete,
} from '@product-module/types/product';
import { Category } from '@product-module/types/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  #http = inject(HttpClient);

  products(
    limit: number,
    skip: number,
    search?: string,
  ): Observable<ProductsApiResponse<ProductApiShape>> {
    let params = new HttpParams();
    if (search) {
      params = params.set('q', search);
    }
    params = params.set('limit', limit.toString());
    params = params.set('skip', skip.toString());

    return this.#http.get<ProductsApiResponse<ProductApiShape>>(`${environment.product}/search`, {
      params,
    });
  }

  getProductDetails(id: number): Observable<Product | null> {
    return this.#http.get<Product>(`${environment.product}/${id}`);
  }

  productCategories(): Observable<Category[]> {
    return this.#http.get<Category[]>(`${environment.product}/categories`);
  }

  productsByCategory(category: string, limit: number, skip: number) {
    return this.#http.get<ProductsApiResponse<ProductApiShape>>(
      `${environment.product}/category/${category}?limit=${limit}&skip=${skip}`,
    );
  }

  productsBySort(
    sortBy: string,
    orderBy: string,
    limit: number,
    skip: number,
  ): Observable<ProductsApiResponse<Product>> {
    return this.#http.get<ProductsApiResponse<Product>>(
      `${environment.product}?sortBy=${sortBy}&order=${orderBy}&limit=${limit}&skip=${skip}`,
    );
  }

  addProduct(product: AddProductModel): Observable<AddProductModel> {
    return this.#http.post<AddProductModel>(`${environment.product}/add`, product);
  }

  deleteProduct(id: number): Observable<ResponseProductDelete> {
    return this.#http.delete<ResponseProductDelete>(`${environment.product}/${id}`);
  }
}
