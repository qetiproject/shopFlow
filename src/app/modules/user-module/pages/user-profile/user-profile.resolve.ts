import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { STORAGE_KEYS } from "@core";
import { UserFacade, UserViewModel } from "@user-module";

@Injectable({
    providedIn: 'root'
})
export class UserProfileResolve implements Resolve<UserViewModel | null> {
    #userFacade = inject(UserFacade);
    
    user = sessionStorage.getItem(STORAGE_KEYS.USER);
    private email = this.user ? JSON.parse(this.user).emailId : '';

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.#userFacade.getUserByEmail(this.email);
    }

}