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
import { registerForm } from '@auth-module/utils/register.form';
import { InputComponent } from '@features/custom-form';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, InputComponent, FormsModule],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  private readonly formDir = viewChild.required(FormGroupDirective);
  INPUT_TYPES = INPUT_TYPES;

  form = registerForm(this.#fb);

  onSubmit(): void {
    const credentials = this.form.getRawValue();

    this.#store.dispatch(AuthActions.registerUser({ payload: credentials }));

    this.formDir().resetForm(this.form.value);
  }
}
