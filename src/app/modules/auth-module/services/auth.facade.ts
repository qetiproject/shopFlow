import { inject, Injectable } from '@angular/core';
import { AuthApiService, CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse } from '@auth-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  #authApi = inject(AuthApiService);
  
  registerUser(data: CreateUserRequest): Observable<CreateUserResponse> {
    return this.#authApi.createUser(data)
  }
  
  loginUser(data: LoginRequest): Observable<LoginResponse> {
    return this.#authApi.login(data)
  }

  logoutUser() {
    return this.#authApi.logout()
  }
  
}
