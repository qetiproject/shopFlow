import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginRequest } from '@auth-module';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { INPUT_TYPES } from '@types';

@Component({
  selector: 'lib-ui-login',
  imports: [
    CommonModule,
    InputComponent,
    DynamicValidatorMessage,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class UILogin {
  INPUT_TYPES = INPUT_TYPES;

  @Input({ required: true}) form!: FormGroup;
  @Output() submitForm = new EventEmitter<LoginRequest>();

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.submitForm.emit(this.form.getRawValue());
  }
}
