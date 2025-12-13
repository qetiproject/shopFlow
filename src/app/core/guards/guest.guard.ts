import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { selectCheckAuth } from '@auth-module';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';

export const GuestGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCheckAuth).pipe(
    take(1), 
    map(isLoggedIn => {
      return isLoggedIn ? router.parseUrl('/dashboard') : true;
    })
  );
};
