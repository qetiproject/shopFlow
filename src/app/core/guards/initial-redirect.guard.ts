import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { selectCheckAuth } from "@auth-module";
import { Store } from "@ngrx/store";
import { filter, map, take } from "rxjs";

export const InitialRedirectGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCheckAuth).pipe(
    filter(v => v !== null && v !== undefined),
    take(1),
    map(isLoggedIn => {
      return router.parseUrl(isLoggedIn ? 'dashboard' : 'login')}
  ));

};