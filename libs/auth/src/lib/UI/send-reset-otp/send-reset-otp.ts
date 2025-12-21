// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { DynamicValidatorMessage, InputComponent } from '../../../../../../src/app/features/index';
// import { INPUT_TYPES } from '../../../../../../src/app/types';

// @Component({
//   selector: 'lib-ui-send-reset-otp',
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
// export class UISendResetOtp {
//   INPUT_TYPES = INPUT_TYPES

//   @Input({ required: true}) email!: FormControl;
//   @Output() submitForm = new EventEmitter<string>();
  
//   onSubmit() {
//      if (this.email.valid) {
//       this.submitForm.emit(this.email.value as string);
//     }
//   }
// }
