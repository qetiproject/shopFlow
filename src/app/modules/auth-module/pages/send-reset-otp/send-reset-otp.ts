import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '@auth-module/services/auth.facade';
import { DynamicValidatorMessage } from '@features/custom-form/validators/dynamic-validator-message.directive';
import { InputComponent } from '@features/custom-form/input/input';
import { MessagesService } from '@core/services/messages.service';
import { INPUT_TYPES, MessageSeverity } from '@types';
import { tap } from 'rxjs';

@Component({
  selector: 'app-send-reset-otp',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage,
  ],
  templateUrl: './send-reset-otp.html',
})
export class SendResetOtp {
  readonly INPUT_TYPES = INPUT_TYPES;
  readonly #authFacade = inject(AuthFacade);
  readonly #destroyRef = inject(DestroyRef);
  readonly #messages = inject(MessagesService);
  readonly #router = inject(Router);

  email = new FormControl('', [Validators.required, Validators.email]);

  onSubmit(): void {
    this.#authFacade
      .sendPasswordResetOtp(this.email.value as string)
      .pipe(
        tap((response) => {
          this.#messages.showMessage({
            text: response.message,
            severity: MessageSeverity.Success,
          });
          this.#router.navigate(['/reset-password']);
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
