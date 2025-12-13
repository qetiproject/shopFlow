import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@auth-module';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { INPUT_TYPES } from '@types';
import { resetPasswordForm } from '../../utils/reset-password.form';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage
  ],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  #fb = inject(NonNullableFormBuilder);
  INPUT_TYPES = INPUT_TYPES
  #authFacade = inject(AuthFacade);

  form = resetPasswordForm(this.#fb);

  onSubmit() {
    // if (this.form.invalid) return;
    console.log(this.form.value)
    this.#authFacade.resetPassword(this.form.value);
  }
}
