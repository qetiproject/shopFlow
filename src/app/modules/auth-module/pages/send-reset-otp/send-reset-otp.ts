import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicValidatorMessage, InputComponent } from '@features';
import { INPUT_TYPES } from '@types';
import { AuthFacade } from '../../services';

@Component({
  selector: 'send-reset-otp',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DynamicValidatorMessage
  ],
  templateUrl: './send-reset-otp.html',
})
export class SendResetOtp {
  form!: FormGroup;
  INPUT_TYPES = INPUT_TYPES
  #authFacade = inject(AuthFacade);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(event: Event) {
    if (this.form.invalid) return;
    this.#authFacade.sendPasswordResetOtp(this.form.value.email);
  }
}
