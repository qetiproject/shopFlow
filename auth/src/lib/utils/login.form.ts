import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";

export interface loginForm {
    emailId: FormControl<string>;
    password: FormControl<string>;
}

export function loginForm(fb: NonNullableFormBuilder) {
    return fb.group<loginForm>({
        emailId: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [Validators.required])
    })
}