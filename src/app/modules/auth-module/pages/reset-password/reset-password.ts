
import { Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@auth-module/services/auth.facade';
import { resetPasswordForm } from '@auth-module/utils/reset-password.form';
import { DynamicValidatorMessage } from '@features/custom-form/validators/dynamic-validator-message.directive';
import { InputComponent } from '@features/custom-form/input/input';
import { INPUT_TYPES } from '@types';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
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
  INPUT_TYPES = INPUT_TYPES;
  #authFacade = inject(AuthFacade);

  form = resetPasswordForm(this.#fb);

  onSubmit() {
    const value = this.form.getRawValue();
    this.#authFacade.resetPassword(value);
  }
}
