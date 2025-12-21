import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthFacade } from '../../data-access';
import { ResetPasswordRequest } from '../../types';
import { UIResetPassword } from '../../UI/reset-password/reset-password';
import { resetPasswordForm } from '../../utils';

@Component({
  selector: 'lib-features-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UIResetPassword
  ],
  templateUrl: './reset-password.html',
})
export class FeaturesResetPassword {
  #fb = inject(NonNullableFormBuilder);
  #authFacade = inject(AuthFacade);

  form = resetPasswordForm(this.#fb);

  onSubmit(credentials: ResetPasswordRequest) {
    this.#authFacade.resetPassword(credentials);
  }
}
