
import { Routes } from "@angular/router";

export const userRoutes: Routes = [
   {
    path: '',
    loadComponent: () => 
      import('@user-module').then(c => c.Users),
  },
 
]