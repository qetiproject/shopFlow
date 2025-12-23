import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService, CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, ResetPasswordRequest } from '@auth';
import { MessageSeverity, MessagesService } from '@shared';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private authApi = inject(AuthApiService);
  private messages = inject(MessagesService);
  private router = inject(Router);
  
  registerUser(data: CreateUserRequest): Observable<CreateUserResponse> {
    return this.authApi.createUser(data)
  }
  
  loginUser(data: LoginRequest): Observable<LoginResponse> {
    return this.authApi.login(data)
  }

  sendPasswordResetOtp(emailId: string): void {
    this.authApi.sendResetOtp(emailId).pipe(
      tap((response) => {
         this.messages.showMessage({
          text: response.message,
          severity: MessageSeverity.Success,
        });
        this.router.navigate(['/reset-password'])
      })
    ).subscribe()
  }

  resetPassword(data: ResetPasswordRequest): void {
    this.authApi.resetPassword(data).pipe(
      tap((response) => {
         this.messages.showMessage({
          text: response,
          severity: MessageSeverity.Success,
        });
        this.router.navigate(['/login'])
      })
    ).subscribe();
  }

  logoutUser() {
    return this.authApi.logout()
  }
  
}
