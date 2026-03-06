
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@auth-module/services/auth.facade';
import { DynamicValidatorMessage } from '@features/custom-form/validators/dynamic-validator-message.directive';
import { InputComponent } from '@features/custom-form/input/input';
import { INPUT_TYPES } from '@types';

@Component({
  selector: 'app-send-reset-otp',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage
],
  templateUrl: './send-reset-otp.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendResetOtp {
  INPUT_TYPES = INPUT_TYPES;
  #authFacade = inject(AuthFacade);

  email = new FormControl('', [Validators.required, Validators.email]);

  onSubmit() {
    this.#authFacade.sendPasswordResetOtp(this.email.value as string);
  }
}
