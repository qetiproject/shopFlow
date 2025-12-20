import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'login',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      // InputComponent,
      // DynamicValidatorMessage,
      RouterModule
    ],
    templateUrl: './login.html',
})
export class Login {
  // #fb = inject(NonNullableFormBuilder);
  // #store = inject(Store);

  // INPUT_TYPES = INPUT_TYPES;
  // @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;

  // form = loginForm(this.#fb);
  
  // onSubmit(): void {
  //   const credentials: LoginRequest = this.form.getRawValue() as LoginRequest;

  //   this.#store.dispatch(AuthActions.loginUser({payload: credentials}));

  //   this.formDir.resetForm(this.form.value);
  // }
}
