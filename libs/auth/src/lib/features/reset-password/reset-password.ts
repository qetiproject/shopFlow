import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthFacade, resetPasswordForm, ResetPasswordRequest, UIResetPassword } from '@auth';

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
  private fb = inject(NonNullableFormBuilder);
  private authFacade = inject(AuthFacade);

  form = resetPasswordForm(this.fb);

  onSubmit(credentials: ResetPasswordRequest) {
    this.authFacade.resetPassword(credentials);
    this.form.reset();
  }
}
