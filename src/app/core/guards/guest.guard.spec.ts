import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { type MockStore, provideMockStore } from '@utils/mock.store';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { GuestGuard } from './guest.guard';

describe('GuestGuard', () => {
  let router: { parseUrl: jest.Mock };
  let store: MockStore;

  beforeEach(() => {
    router = { parseUrl: jest.fn() };

    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });
    store = TestBed.inject(Store) as unknown as MockStore;
  });

  it('allows access when user is logged out', async () => {
    store.select.mockReturnValue(of(false));

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    let result: boolean | UrlTree | undefined;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = GuestGuard(route, state);
      const value = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
      result = value as boolean | UrlTree;
    });

    expect(result).toBe(true);
  });

  it('redirects to /product/list when user is logged in', async () => {
    const urlTree = {} as UrlTree;
    store.select.mockReturnValue(of(true));
    router.parseUrl.mockReturnValue(urlTree);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    let result: boolean | UrlTree | undefined;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = GuestGuard(route, state);
      const value = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
      result = value as boolean | UrlTree;
    });

    expect(router.parseUrl).toHaveBeenCalledWith('/product/list');
    expect(result).toBe(urlTree);
  });
});
