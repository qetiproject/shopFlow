import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClient, Endpoints } from '@api';
import { CreateUserRequest } from '@auth-module/types/create/create-user.request';
import { CreateUserResponse } from '@auth-module/types/create/create-user.response';
import { LoginRequest } from '@auth-module/types/login/login.request';
import { LoginResponse } from '@auth-module/types/login/login.response';
import { ResetPasswordRequest } from '@auth-module/types/reset-password.request';
import { TokenService } from '@auth-module/services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  readonly #api = inject(ApiClient);
  readonly #tokenService = inject(TokenService);
  readonly #router = inject(Router);
  readonly #baseUrl = this.#api.baseUrls.userApp;

  createUser(user: CreateUserRequest): Observable<CreateUserResponse> {
    return this.#api.post<CreateUserResponse>(
      this.#baseUrl,
      Endpoints.auth.createUser,
      user,
    );
  }

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.#api.post<LoginResponse>(this.#baseUrl, Endpoints.auth.login, user);
  }

  sendResetOtp(emailId: string): Observable<{ message: string }> {
    return this.#api.post<{ message: string }>(
      this.#baseUrl,
      `${Endpoints.auth.sendResetOtp}?emailId=${encodeURIComponent(emailId)}`,
      null,
    );
  }

  resetPassword(data: ResetPasswordRequest): Observable<string> {
    return this.#api.post<string>(
      this.#baseUrl,
      Endpoints.auth.verifyOtpResetPassword,
      data,
      { responseType: 'text' },
    );
  }

  async logout() {
    this.#tokenService.clear();
    await this.#router.navigateByUrl('/login');
  }
}
