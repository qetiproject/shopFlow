import { inject, Injectable } from '@angular/core';
import {
  AddProductModel,
  Category,
  Product,
  ProductApi,
  ProductApiShape,
  ProductsApiResponse,
  ProductViewModel,
  ResponseProductDelete,
} from '@product-module';
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

  getProducts(limit: number, skip: number, search?: string): void {
    this.#productApi
      .products(limit, skip, search)
      .pipe(
        take(1),
        map((result) => ({
          ...result,
          products: result.products.map((p) => this.mapProductsApiToView(p)),
        })),
      )
      .subscribe((mapped) => {
        this.productsSubject.next(mapped);
      });
  }

  addProduct(product: AddProductModel) {
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

  getProductsBySort(
    sortBy: string,
    orderBy: string,
    limit: number,
    skip: number,
  ): Observable<ProductsApiResponse<Product>> {
    return this.#productApi.productsBySort(sortBy, orderBy, limit, skip);
  }

  deleteProduct(id: number): Observable<ResponseProductDelete> {
    return this.#productApi.deleteProduct(id).pipe(
      tap((deletedProduct: ResponseProductDelete) => {
        const current = this.productsSubject.getValue();
        this.productsSubject.next({
          ...current,
          products: current.products.filter((p) => p.id !== deletedProduct.id),
          total: current.total - 1,
        });
      }),
    );
  }
}
