import { HttpClient } from '@angular/common/http';
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

  products(): Observable<ProductsApiResponse<ProductApiShape>> {
    return this.#http
      .get<ProductsApiResponse<ProductApiShape>>(
        `${this.baseUrl}`)
  }
}