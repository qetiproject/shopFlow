import { inject, Injectable } from '@angular/core';
import { ProductApi } from '@product-module/services/product.api';
import {
  AddProductModel,
  Product,
  ProductApiShape,
  ProductsApiResponse,
  ProductViewModel,
  ResponseProductDelete,
} from '@product-module/types/product';
import { Category } from '@product-module/types/category';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductFacade {
  #productApi = inject(ProductApi);

  private productsSubject = new BehaviorSubject<ProductsApiResponse<ProductViewModel>>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  products$ = this.productsSubject.asObservable();

  loadProducts(limit: number, skip: number, search?: string): void {
    this.#productApi
      .products(limit, skip, search)
      .pipe(
        take(1),
        map((result) => ({
          ...result,
          products: result.products.map((p) => this.mapProductsApiToView(p)),
        })),
      )
      .subscribe((mapped) => this.productsSubject.next(mapped));
  }

  loadProductsByCategory(category: string, limit: number, skip: number): void {
    this.#productApi
      .productsByCategory(category, limit, skip)
      .pipe(
        take(1),
        map((result) => ({
          ...result,
          products: result.products.map((p) => this.mapProductsApiToView(p)),
        })),
      )
      .subscribe((mapped) => this.productsSubject.next(mapped));
  }

  loadProductsBySort(sortBy: string, orderBy: string, limit: number, skip: number): void {
    this.#productApi
      .productsBySort(sortBy, orderBy, limit, skip)
      .pipe(
        take(1),
        map((result) => ({
          ...result,
          products: result.products.map((p) => this.mapProductsApiToView(p)),
        })),
      )
      .subscribe((mapped) => this.productsSubject.next(mapped));
  }

  addProduct(product: AddProductModel): Observable<ProductViewModel> {
    const current = this.productsSubject.getValue();
    const newProduct: ProductViewModel = {
      ...product,
    } as ProductViewModel;
    this.productsSubject.next({
      ...current,
      products: [newProduct, ...current.products],
      total: current.total + 1,
    });
    return of(newProduct);
  }

  deleteProduct(id: number): Observable<ResponseProductDelete> {
    return this.#productApi.deleteProduct(id).pipe(
      take(1),
      tap((deleted) => {
        const current = this.productsSubject.getValue();
        this.productsSubject.next({
          ...current,
          products: current.products.filter((p) => p.id !== deleted.id),
          total: current.total - 1,
        });
      }),
    );
  }

  getProductDetails(id: number): Observable<Product | null> {
    return this.#productApi.getProductDetails(id);
  }

  getProductCategories(): Observable<Category[]> {
    return this.#productApi.productCategories();
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
}
