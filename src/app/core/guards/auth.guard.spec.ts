import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { type MockStore, provideMockStore } from '@test-utils/mock.store';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let router: { parseUrl: jest.Mock };

  beforeEach(() => {
    router = { parseUrl: jest.fn() };

    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });
  });

  it('allows access when user is logged in', async () => {
    const store = TestBed.inject(Store) as unknown as MockStore;
    store.select.mockReturnValue(of(true));

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    let result: boolean | UrlTree | undefined;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = AuthGuard(route, state);
      const value = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
      result = value as boolean | UrlTree;
    });

    expect(result).toBe(true);
  });

  it('redirects to /login when user is not logged in', async () => {
    const urlTree = {} as UrlTree;
    const store = TestBed.inject(Store) as unknown as MockStore;
    store.select.mockReturnValue(of(false));
    router.parseUrl.mockReturnValue(urlTree);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    let result: boolean | UrlTree | undefined;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = AuthGuard(route, state);
      const value = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
      result = value as boolean | UrlTree;
    });

    expect(router.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(urlTree);
  });
});
