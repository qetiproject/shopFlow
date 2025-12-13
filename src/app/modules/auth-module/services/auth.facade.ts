import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService, CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse } from '@auth-module';
import { MessagesService } from '@core';
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

  logoutUser() {
    return this.#authApi.logout()
  }
  
}
