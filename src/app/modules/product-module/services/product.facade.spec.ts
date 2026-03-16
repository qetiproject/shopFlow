import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import type { Product } from '@app-types/dto';
import { ProductApi } from '@product-module/services/product.api';
import { mockAddProductRequest } from '@test-utils/mock-data';
import { ProductFacade } from './product.facade';

describe('ProductFacade', () => {
  let facade: ProductFacade;
  let productApi: jest.Mocked<Pick<ProductApi, 'products' | 'deleteProduct' | 'getProductDetails'>>;

  beforeEach(() => {
    productApi = {
      products: jest.fn().mockReturnValue(of({ products: [], total: 0, skip: 0, limit: 10 })),
      deleteProduct: jest.fn(),
      getProductDetails: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductFacade,
        { provide: ProductApi, useValue: productApi },
      ],
    });

    facade = TestBed.inject(ProductFacade);
  });

  it('is created', () => {
    expect(facade).toBeTruthy();
  });

  it('addProduct prepends product and increments total', async () => {
    const result = await firstValueFrom(facade.addProduct(mockAddProductRequest));

    expect(result).toMatchObject({
      title: mockAddProductRequest.title,
      description: mockAddProductRequest.description,
      category: mockAddProductRequest.category,
      price: mockAddProductRequest.price,
    });

    const state = await firstValueFrom(facade.products$);
    expect(state.products.length).toBe(1);
    expect(state.products[0]).toMatchObject({ title: mockAddProductRequest.title });
    expect(state.total).toBe(1);
  });

  it('getProductDetails returns product from API', async () => {
    const product = { id: 1, title: 'P', description: 'D', category: 'c', price: 99 } as Product;
    (productApi.getProductDetails as jest.Mock).mockReturnValue(of(product));

    const result = await firstValueFrom(facade.getProductDetails(1));

    expect(result).toEqual(product);
    expect(productApi.getProductDetails).toHaveBeenCalledWith(1);
  });

  it('getProductDetails returns null on API error', async () => {
    (productApi.getProductDetails as jest.Mock).mockReturnValue(
      throwError(() => new Error('fail')),
    );

    const result = await firstValueFrom(facade.getProductDetails(1));

    expect(result).toBeNull();
  });
});
