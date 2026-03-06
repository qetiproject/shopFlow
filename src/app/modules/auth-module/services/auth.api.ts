import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@auth-module/services/token.service';
import { CreateUserRequest } from '@auth-module/types/create/create-user.request';
import { CreateUserResponse } from '@auth-module/types/create/create-user.response';
import { LoginRequest } from '@auth-module/types/login/login.request';
import { LoginResponse } from '@auth-module/types/login/login.response';
import { ResetPasswordRequest } from '@auth-module/types/reset-password.request';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  #http = inject(HttpClient);
  #tokenService = inject(TokenService);
  #router = inject(Router);

  createUser(user: CreateUserRequest): Observable<CreateUserResponse> {
    return this.#http.post<CreateUserResponse>(`${environment.userApp}/CreateNewUser`, user);
  }

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.#http.post<LoginResponse>(`${environment.userApp}/login`, user);
  }

  sendResetOtp(emailId: string): Observable<{ message: string }> {
    return this.#http.post<{ message: string }>(
      `${environment.userApp}/send-reset-otp?emailId=${emailId}`,
      null,
    );
  }

  resetPassword(data: ResetPasswordRequest): Observable<string> {
    return this.#http.post<string>(`${environment.userApp}/verify-otp-reset-password`, data, {
      responseType: 'text' as 'json',
    });
  }

  async logout() {
    this.#tokenService.clear();
    await this.#router.navigateByUrl('/login');
  }
}
