import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import * as AuthActions from '@auth-module';
import { loginForm, LoginRequest } from '@auth-module';
import { Store } from '@ngrx/store';
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
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;

  form = loginForm(this.#fb);
  
  onSubmit(credentials: LoginRequest): void {
    // const credentials: LoginRequest = this.form.getRawValue() as LoginRequest;

    this.#store.dispatch(AuthActions.loginUser({payload: credentials}));

    this.formDir.resetForm(this.form.value);
  }
}
