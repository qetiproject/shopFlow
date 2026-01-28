import { TestBed } from '@angular/core/testing';
import {
    ActivatedRouteSnapshot,
    GuardResult,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@test-utils';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { GuestGuard } from './guest.guard';

describe('GuestGuard', () => {
  let router: jasmine.SpyObj<Router>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [provideMockStore(), { provide: Router, useValue: router }],
    });
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should allow access when user is logged out', async () => {
    store.select.and.returnValue(of(false));

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    let result: GuardResult | Promise<GuardResult> | unknown;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = GuestGuard(route, state);

      result = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
    });

    expect(result).toBe(true);
  });

  it('should redirect to /dashboard when user is logged in', async () => {
    const urlTree = {} as UrlTree;
    store.select.and.returnValue(of(true));
    router.parseUrl.and.returnValue(urlTree);

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    let result: GuardResult | Promise<GuardResult> | unknown;

    await TestBed.runInInjectionContext(async () => {
      const guardResult = GuestGuard(route, state);

      result = isObservable(guardResult) ? await firstValueFrom(guardResult) : guardResult;
    });
    expect(router.parseUrl).toHaveBeenCalledWith('/dashboard');
    expect(result).toBe(urlTree);
  });
});
