import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";

export interface ResetPasswordForm {
    email: FormControl<string>;
    otp: FormControl<string>;
    newPassword: FormControl<string>;
}

export function resetPasswordForm(fb: NonNullableFormBuilder) {
  return fb.group<ResetPasswordForm>({
    email: fb.control('', [Validators.required, Validators.email]),
    otp: fb.control('', [Validators.required, Validators.minLength(6)]),
    newPassword: fb.control('', [Validators.required, Validators.minLength(8)]),
  });
}