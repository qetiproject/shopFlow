import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { selectCheckAuth } from "@auth";
import { Store } from "@ngrx/store";
import { filter, map, take } from "rxjs/operators";

export const AuthGuard: CanActivateFn = (
  route,
  state
) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCheckAuth).pipe(
      filter(v => v !== null && v !== undefined),
      take(1),
      map(isLoggedIn => {
        return isLoggedIn ? true : router.parseUrl('/login');
      })
    );
  };