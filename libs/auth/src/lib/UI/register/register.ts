import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateUserRequest } from '@auth';
import { INPUT_TYPES, InputComponent } from '@shared';

@Component({
  selector: 'lib-ui-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, InputComponent],
  templateUrl: './register.html',
})
export class UIRegister {
  INPUT_TYPES = INPUT_TYPES;

  @Input({ required: true}) form!: FormGroup;
  @Output() submitForm = new EventEmitter<CreateUserRequest>();

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    this.submitForm.emit(this.form.getRawValue());
  }

}
