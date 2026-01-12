
import { Routes } from "@angular/router";
import { LoginResponse } from "@auth-module";
import { UserProfileResolve } from "@user-module";

export const userRoutes: Routes = [
   {
    path: '',
    loadComponent: () => 
      import('@user-module').then(c => c.Users),
  },
  {
    path: 'profile/:email',
    loadComponent: () => import('@user-module').then(c => c.UserProfile),
    resolve: {
      user: UserProfileResolve
    },
     data: {} as LoginResponse
  }
]