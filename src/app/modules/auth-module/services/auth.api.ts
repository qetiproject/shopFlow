import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, TokenService } from '@auth-module';
import { environment } from '@env-dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  #http = inject(HttpClient);
  #tokenService = inject(TokenService);
  #router = inject(Router);
  
  private readonly baseUrl = environment.userApp;

  createUser(user: CreateUserRequest): Observable<CreateUserResponse> {
    return this.#http.post<CreateUserResponse>(`${this.baseUrl}/CreateNewUser`, user)
  }

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.#http.post<LoginResponse>(`${this.baseUrl}/login`, user)
  }

  async logout() {
    this.#tokenService.clear();
    await this.#router.navigateByUrl('/login')
  }
}
