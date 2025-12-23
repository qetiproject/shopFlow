import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, ResetPasswordRequest, TokenService } from '@auth';
import { environment } from '@env-dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  
  private readonly baseUrl = environment.userApp;

  createUser(user: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.baseUrl}/CreateNewUser`, user)
  }

  login(user: LoginRequest): Observable<LoginResponse> {
    console.log(this.baseUrl, "url")
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user)
  }

  sendResetOtp(emailId: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${environment.userApp}/send-reset-otp?emailId=${emailId}`, null)
  }

  resetPassword(data: ResetPasswordRequest): Observable<string> {
    return this.http.post<string>(
      `${environment.userApp}/verify-otp-reset-password`, data,
      { responseType: 'text' as 'json' }
    )
  }

  async logout() {
    this.tokenService.clear();
    await this.router.navigateByUrl('/login')
  }
}
