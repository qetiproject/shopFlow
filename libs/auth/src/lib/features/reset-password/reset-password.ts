// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { AuthFacade, resetPasswordForm } from '@auth-module';
// import { DynamicValidatorMessage, InputComponent } from '@features';
// import { INPUT_TYPES } from '@types';

// @Component({
//   selector: 'reset-password',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     ReactiveFormsModule,
//     InputComponent,
//     DynamicValidatorMessage
//   ],
//   templateUrl: './reset-password.html',
// })
// export class ResetPassword {
//   #fb = inject(NonNullableFormBuilder);
//   INPUT_TYPES = INPUT_TYPES
//   #authFacade = inject(AuthFacade);

//   form = resetPasswordForm(this.#fb);

//   onSubmit() {
//     const value = this.form.getRawValue();
//     this.#authFacade.resetPassword(value);
//   }
// }
