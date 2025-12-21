import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Store } from '@ngrx/store';
import { loginForm, LoginRequest } from '../../../index';
import * as AuthActions from '../../data-access/store/index';
import { UILogin } from '../../UI';

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
