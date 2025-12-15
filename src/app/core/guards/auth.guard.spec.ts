import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@test-utils';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let store: jasmine.SpyObj<Store>;
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

    it('should allow access when user is logged in', async () => {
        const store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        store.select.and.returnValue(of(true));

        const route = {} as any;
        const state = {} as any;

        let result: any;

        await TestBed.runInInjectionContext(async () => {
            const guardResult = AuthGuard(route, state);

            result = isObservable(guardResult)
            ? await firstValueFrom(guardResult)
            : guardResult;
        });

        expect(result).toBe(true);
    });

    it('should redirect to /login when user is not logged in', async() => {
        const urlTree = {} as UrlTree;
        const store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
        store.select.and.returnValue(of(false));
        router.parseUrl.and.returnValue(urlTree);

        const route = {} as any;
        const state = {} as any;
        let result: any;

        await TestBed.runInInjectionContext(async () => {
            const guardResult = AuthGuard(route, state);

            result = isObservable(guardResult)
                ? await firstValueFrom(guardResult)
                : guardResult;
        });
        expect(router.parseUrl).toHaveBeenCalledWith('/login');
        expect(result).toBe(urlTree);
    });
});
