// import { CommonModule } from '@angular/common';
// import { Component, inject } from '@angular/core';
// import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { AuthFacade } from '@auth-module';
// import { DynamicValidatorMessage, InputComponent } from '@features';
// import { INPUT_TYPES } from '@types';

// @Component({
//   selector: 'send-reset-otp',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     FormsModule,
//     ReactiveFormsModule,
//     InputComponent,
//     DynamicValidatorMessage
//   ],
//   templateUrl: './send-reset-otp.html',
// })
// export class SendResetOtp {
//   INPUT_TYPES = INPUT_TYPES
//   #authFacade = inject(AuthFacade);

//   email = new FormControl('', [Validators.required, Validators.email]);

//   onSubmit() {
//     this.#authFacade.sendPasswordResetOtp(this.email.value as string);
//   }
// }
