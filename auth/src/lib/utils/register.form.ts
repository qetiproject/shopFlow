import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";

export interface RegisterForm {
    emailId: FormControl<string>;
    fullName: FormControl<string>;
    password: FormControl<string>;
}

export function registerForm(fb: NonNullableFormBuilder) {
  return fb.group<RegisterForm>({
    emailId: fb.control('', [Validators.required, Validators.email]),
    fullName: fb.control('', [Validators.required, Validators.minLength(8)]),
    password: fb.control('', [Validators.required, Validators.minLength(8)]),
  });
}