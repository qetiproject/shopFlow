import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router } from "@angular/router";
import { UserFacade, UserViewModel } from "@user-module";
import { firstValueFrom } from "rxjs";

export const UserProfileResolve: ResolveFn<UserViewModel>  = async (route: ActivatedRouteSnapshot) =>{
    const email = route.paramMap.get("email");
    const userFacade = inject(UserFacade);
    const router = inject(Router);

    if(!email) {
        router.navigate(['/users']);
        return Promise.reject("No Email");
    }

    try{
        const user = await firstValueFrom(userFacade.getUserByEmail(email));
        if(!user) {
            router.navigate(['/users']);
            return Promise.reject("User not found");
        }
        return user;
    }
    catch(err) {
        router.navigate(['/users'])
        return Promise.reject(err);
    }

}
