import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFacade } from '@auth-module/services/auth.facade';
import { resetPasswordForm } from '@auth-module/utils/reset-password.form';
import { DynamicValidatorMessage } from '@features/custom-form/validators/dynamic-validator-message.directive';
import { InputComponent } from '@features/custom-form/input/input';
import { MessagesService } from '@core/services/messages.service';
import { INPUT_TYPES, MessageSeverity } from '@types';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage,
  ],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #authFacade = inject(AuthFacade);
  readonly #destroyRef = inject(DestroyRef);
  readonly #messages = inject(MessagesService);
  readonly #router = inject(Router);
  readonly INPUT_TYPES = INPUT_TYPES;

  form = resetPasswordForm(this.#fb);

  onSubmit(): void {
    this.#authFacade
      .resetPassword(this.form.getRawValue())
      .pipe(
        tap((response) => {
          this.#messages.showMessage({
            text: response,
            severity: MessageSeverity.Success,
          });
          this.#router.navigate(['/login']);
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
