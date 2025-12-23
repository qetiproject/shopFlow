import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import * as AuthActions from '@auth';
import { loginForm, LoginRequest } from '@auth';
import { Store } from '@ngrx/store';
import { UILogin } from '../../UI/index';

@Component({
  selector: 'lib-features-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UILogin
  ],
  templateUrl: './login.html'
})
export class FeaturesLogin {
  private fb = inject(NonNullableFormBuilder);
  private store = inject(Store);

  form = loginForm(this.fb);
  
  onSubmit(credentials: LoginRequest): void {
    this.store.dispatch(AuthActions.loginUser({payload: credentials}));
    this.form.reset();
  }
}
