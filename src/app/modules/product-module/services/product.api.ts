import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsApiResponse } from '@product-module';
import { environment } from 'environment/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  #http = inject(HttpClient);
  
  private readonly baseUrl = environment.product;

  products(): Observable<ProductsApiResponse<Product>> {
    return this.#http
      .get<ProductsApiResponse<Product>>(
        `${this.baseUrl}`)
  }
}