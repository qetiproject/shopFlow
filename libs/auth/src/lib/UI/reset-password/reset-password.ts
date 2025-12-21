import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicValidatorMessage, InputComponent } from '../../../../../../src/app/features/index';
import { INPUT_TYPES } from '../../../../../../src/app/types/index';
import { ResetPasswordRequest } from '../../types';

@Component({
  selector: 'lib-ui-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage
  ],
  templateUrl: './reset-password.html',
})
export class UIResetPassword {
  INPUT_TYPES = INPUT_TYPES;

  @Input({ required: true}) form!: FormGroup;
  @Output() submitForm = new EventEmitter<ResetPasswordRequest>();

  onSubmit() {
    this.submitForm.emit(this.form.getRawValue());
  }
}
