
import { Routes } from "@angular/router";

export const authRoutes: Routes = [
   {
    path: 'login',
    loadComponent: () => 
      import('@auth-module').then(c => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => 
      import('@auth-module').then(c => c.Register),
  },
]