import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@auth-module/services/auth.api';
import { CreateUserRequest } from '@auth-module/types/create/create-user.request';
import { CreateUserResponse } from '@auth-module/types/create/create-user.response';
import { LoginRequest } from '@auth-module/types/login/login.request';
import { LoginResponse } from '@auth-module/types/login/login.response';
import { ResetPasswordRequest } from '@auth-module/types/reset-password.request';
import { MessagesService } from '@core/services/messages.service';
import { MessageSeverity } from '@types';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  #authApi = inject(AuthApiService);
  #messages = inject(MessagesService);
  #router = inject(Router);
  
  registerUser(data: CreateUserRequest): Observable<CreateUserResponse> {
    return this.#authApi.createUser(data)
  }
  
  loginUser(data: LoginRequest): Observable<LoginResponse> {
    return this.#authApi.login(data)
  }

  sendPasswordResetOtp(emailId: string): void {
    this.#authApi.sendResetOtp(emailId).pipe(
      tap((response) => {
         this.#messages.showMessage({
          text: response.message,
          severity: MessageSeverity.Success,
        });
        this.#router.navigate(['/reset-password'])
      })
    ).subscribe()
  }

  resetPassword(data: ResetPasswordRequest): void {
    this.#authApi.resetPassword(data).pipe(
      tap((response) => {
         this.#messages.showMessage({
          text: response,
          severity: MessageSeverity.Success,
        });
        this.#router.navigate(['/login'])
      })
    ).subscribe();
  }

  logoutUser() {
    return this.#authApi.logout()
  }
  
}
