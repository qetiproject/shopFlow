import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductApiShape, ProductsApiResponse } from '@product-module';
import { environment } from 'environment/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  #http = inject(HttpClient);

  private readonly baseUrl = environment.product;

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

    return this.#http.get<ProductsApiResponse<ProductApiShape>>(`${this.baseUrl}/search`, {
      params,
    });
  }
}
