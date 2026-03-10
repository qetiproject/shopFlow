import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import {
  FormGroupDirective,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { INPUT_TYPES } from '@app-types/input';
import * as AuthActions from '@auth-module/store/auth.actions';
import { LoginRequest } from '@auth-module/types/login/login.request';
import { loginForm } from '@auth-module/utils/login.form';
import { InputComponent } from '@features/custom-form/input/input';
import { DynamicValidatorMessage } from '@features/custom-form/validators/dynamic-validator-message.directive';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormsModule,
    DynamicValidatorMessage,
    RouterModule,
  ],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  INPUT_TYPES = INPUT_TYPES;
  private readonly formDir = viewChild.required(FormGroupDirective);

  form = loginForm(this.#fb);

  onSubmit(): void {
    const credentials: LoginRequest = this.form.getRawValue() as LoginRequest;

    this.#store.dispatch(AuthActions.loginUser({ payload: credentials }));

    this.formDir().resetForm(this.form.value);
  }
}
