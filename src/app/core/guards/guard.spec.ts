import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@test-utils';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { GuestGuard } from './guest.guard';

describe('GuestGuard', () => {
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['parseUrl']);

        TestBed.configureTestingModule({
        providers: [
            provideMockStore(),
            { provide: Router, useValue: router },
        ],
        });
    });

    it('should allow access when user is logged out', async () => {
        const store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        store.select.and.returnValue(of(false));

        const route = {} as any;
        const state = {} as any;

        let result: any;

        await TestBed.runInInjectionContext(async () => {
            const guardResult = GuestGuard(route, state);

            result = isObservable(guardResult)
            ? await firstValueFrom(guardResult)
            : guardResult;
        });

        expect(result).toBe(true);
    });

    it('should redirect to /dashboard when user is logged in', async() => {
        const urlTree = {} as UrlTree;
        const store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        store.select.and.returnValue(of(true));
        router.parseUrl.and.returnValue(urlTree);

        const route = {} as any;
        const state = {} as any;
        let result: any;

        await TestBed.runInInjectionContext(async () => {
            const guardResult = GuestGuard(route, state);

            result = isObservable(guardResult)
                ? await firstValueFrom(guardResult)
                : guardResult;
        });
        expect(router.parseUrl).toHaveBeenCalledWith('/dashboard');
        expect(result).toBe(urlTree);
    });
});
