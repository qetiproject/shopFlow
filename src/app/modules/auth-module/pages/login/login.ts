import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormGroupDirective, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import * as AuthActions from '@auth-module';
import { loginForm, LoginRequest } from '@auth-module';
import { DynamicValidatorMessage, InputComponent, } from '@features';
import { Store } from '@ngrx/store';
import { INPUT_TYPES } from '@types';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      InputComponent,
      FormsModule,
      DynamicValidatorMessage,
      RouterModule
    ],
    templateUrl: './login.html',
})
export class Login {
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  INPUT_TYPES = INPUT_TYPES;
  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;

  form = loginForm(this.#fb);
  
  onSubmit(): void {
    const credentials: LoginRequest = this.form.getRawValue() as LoginRequest;

    this.#store.dispatch(AuthActions.loginUser({payload: credentials}));

    this.formDir.resetForm(this.form.value);
  }
}
