import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import type { Product } from '@app-types/dto';
import { ProductFacade } from '@product-module/services/product.facade';
import type { Observable } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';
import { ProductDetailResolve } from './product-detail.resolver';

describe('ProductDetailResolve', () => {
  let productFacade: jest.Mocked<Pick<ProductFacade, 'getProductDetails'>>;
  let router: jest.Mocked<Pick<Router, 'navigate'>>;

  const mockProduct = {
    id: 1,
    title: 'Product',
    description: 'Desc',
    category: 'Accessories',
    price: 10,
  } as Product;

  beforeEach(() => {
    productFacade = { getProductDetails: jest.fn() };
    router = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductFacade, useValue: productFacade },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('returns product when id is valid', async () => {
    (productFacade.getProductDetails as jest.Mock).mockReturnValue(of(mockProduct));

    const route = {
      paramMap: { get: (key: string) => (key === 'id' ? '1' : null) },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(ProductDetailResolve(route, state) as Observable<Product | null>),
    );

    expect(productFacade.getProductDetails).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('navigates to /product/list and returns null when id is missing', async () => {
    const route = {
      paramMap: { get: () => null },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(ProductDetailResolve(route, state) as import('rxjs').Observable<null>),
    );

    expect(router.navigate).toHaveBeenCalledWith(['/product/list']);
    expect(result).toBeNull();
    expect(productFacade.getProductDetails).not.toHaveBeenCalled();
  });

  it('navigates to /product/list when getProductDetails returns null', async () => {
    (productFacade.getProductDetails as jest.Mock).mockReturnValue(of(null));

    const route = {
      paramMap: { get: (key: string) => (key === 'id' ? '1' : null) },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(ProductDetailResolve(route, state) as import('rxjs').Observable<null>),
    );

    expect(router.navigate).toHaveBeenCalledWith(['/product/list']);
    expect(result).toBeNull();
  });

  it('navigates to /product/list on error', async () => {
    (productFacade.getProductDetails as jest.Mock).mockReturnValue(
      throwError(() => new Error('fail')),
    );

    const route = {
      paramMap: { get: (key: string) => (key === 'id' ? '1' : null) },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(ProductDetailResolve(route, state) as import('rxjs').Observable<null>),
    );

    expect(router.navigate).toHaveBeenCalledWith(['/product/list']);
    expect(result).toBeNull();
  });
});
