import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '@auth-module/services/auth.api';
import type {
  CreateUserRequest,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
} from '@app-types/dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  #authApi = inject(AuthApiService);

  registerUser(data: Omit<CreateUserRequest, 'userId'>): Observable<CreateUserResponse> {
    return this.#authApi.createUser(data);
  }

  loginUser(data: LoginRequest): Observable<LoginResponse> {
    return this.#authApi.login(data);
  }

  sendPasswordResetOtp(emailId: string): Observable<{ message: string }> {
    return this.#authApi.sendResetOtp(emailId);
  }

  resetPassword(data: ResetPasswordRequest): Observable<string> {
    return this.#authApi.resetPassword(data);
  }

  logoutUser(): Promise<boolean> {
    return this.#authApi.logout();
  }
}
