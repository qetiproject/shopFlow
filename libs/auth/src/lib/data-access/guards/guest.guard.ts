import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectCheckAuth } from "../../../../../auth/src/lib/data-access/store/index";

export const GuestGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);
  
  return store.select(selectCheckAuth).pipe(
    take(1), 
    map(isLoggedIn => {
      return isLoggedIn ? router.parseUrl('/dashboard') : true;
    })
  );
};
