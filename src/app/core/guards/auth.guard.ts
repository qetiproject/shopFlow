import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { selectCheckAuth } from '@auth-module/store/auth.selector';
import { Store } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';

export const AuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCheckAuth).pipe(
    filter((v) => v !== null && v !== undefined),
    take(1),
    map((isLoggedIn) => (isLoggedIn ? true : router.parseUrl('/login'))),
  );
};
