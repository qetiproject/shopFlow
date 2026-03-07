import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { UserFacade } from '@user-module/services/user.facade';
import { UserViewModel } from '@user-module/types/user.view.model';
import { catchError, of, tap } from 'rxjs';

export const UserProfileResolve: ResolveFn<UserViewModel | null> = (
  route: ActivatedRouteSnapshot,
) => {
  const email = route.paramMap.get('email');
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  if (!email) {
    router.navigate(['/users']);
    return of(null);
  }

  return userFacade.getUserByEmail(email).pipe(
    tap((user) => {
      if (!user) router.navigate(['/users']);
    }),
    catchError(() => {
      router.navigate(['/users']);
      return of(null);
    }),
  );
};
