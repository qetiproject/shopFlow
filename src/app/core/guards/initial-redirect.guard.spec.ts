import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@utils/mock.store';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { InitialRedirectGuard } from './initial-redirect.guard';

describe('InitialRedirectGuard', () => {
  let router: { parseUrl: jest.Mock };
  const loginUrlTree = {} as UrlTree;
  const productListUrlTree = {} as UrlTree;

  beforeEach(() => {
    router = {
      parseUrl: jest.fn((path: string) =>
        path === '/login' ? loginUrlTree : productListUrlTree,
      ),
    };

    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });
  });

  it('should redirect to /product/list when user is logged in', async () => {
    const store = TestBed.inject(Store) as unknown as { select: jest.Mock };
    store.select.mockReturnValue(of(true));

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    let result: UrlTree | undefined;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = InitialRedirectGuard(route, state);
      const value = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
      result = value as UrlTree;
    });

    expect(router.parseUrl).toHaveBeenCalledWith('/product/list');
    expect(result).toBe(productListUrlTree);
  });

  it('should redirect to /login when user is not logged in', async () => {
    const store = TestBed.inject(Store) as unknown as { select: jest.Mock };
    store.select.mockReturnValue(of(false));

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    let result: UrlTree | undefined;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = InitialRedirectGuard(route, state);
      const value = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
      result = value as UrlTree;
    });

    expect(router.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(loginUrlTree);
  });
});
