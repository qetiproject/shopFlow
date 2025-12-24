import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map, take, tap } from "rxjs";
import { selectCheckAuth } from "../../../../../auth/src/lib/data-access/store/index";

export const InitialRedirectGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCheckAuth).pipe(
    tap(res => console.log(res)),
    filter(v => v !== null && v !== undefined),
    take(1),
    map(isLoggedIn => {
      return router.parseUrl(isLoggedIn ? 'dashboard' : 'login')}
  ));

};