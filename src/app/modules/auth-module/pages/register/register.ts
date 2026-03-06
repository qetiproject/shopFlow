
import { Component, inject, viewChild } from '@angular/core';
import { FormGroupDirective, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as AuthActions from '@auth-module/store/auth.actions';
import { CreateUserRequest } from '@auth-module/types/create/create-user.request';
import { registerForm } from '@auth-module/utils/register.form';
import { Store } from '@ngrx/store';
import { INPUT_TYPES } from '@types';
import { InputComponent } from '@features/custom-form/input/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, InputComponent, FormsModule],
  templateUrl: './register.html',
})
export class Register {
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  private readonly formDir = viewChild.required(FormGroupDirective);
  INPUT_TYPES = INPUT_TYPES

  form = registerForm(this.#fb);

  onSubmit(): void {
    const credentials: CreateUserRequest = this.form.getRawValue() as CreateUserRequest;

    this.#store.dispatch(AuthActions.registerUser({ payload: credentials}));
    
    this.formDir().resetForm(this.form.value);
  }

}
