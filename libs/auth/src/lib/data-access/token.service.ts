import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    saveToken(token: string): void {
        sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }

    getToken(): string | null {
        return sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || null;
    }

    clear(): void {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    }                   
}