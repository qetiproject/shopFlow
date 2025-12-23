import { Injectable } from "@angular/core";
import { UserAfterLogin } from "@auth";
import { STORAGE_KEYS } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class UserStorage {

    saveUser(user: UserAfterLogin): void {
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    getUser(): UserAfterLogin | null {
        const user = sessionStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    }

    clear(): void {
        sessionStorage.removeItem(STORAGE_KEYS.USER);
    }                   
}