import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFacade, UISendResetOtp } from '@auth';
import { INPUT_TYPES } from '@shared';

@Component({
  selector: 'lib-features-send-reset-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UISendResetOtp
  ],
  templateUrl: './send-reset-otp.html',
})
export class FeaturesSendResetOtp {
  INPUT_TYPES = INPUT_TYPES

  private authFacade = inject(AuthFacade);

  email = new FormControl('', [Validators.required, Validators.email]);

  onSubmit() {
    this.authFacade.sendPasswordResetOtp(this.email.value as string);
  }
}
