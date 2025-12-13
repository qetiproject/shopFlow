import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormGroupDirective, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as AuthActions from '@auth-module';
import { CreateUserRequest, registerForm } from '@auth-module';
import { Store } from '@ngrx/store';
import { INPUT_TYPES } from '@types';
import { InputComponent } from 'app/features/custom-form/input/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputComponent, FormsModule],
  templateUrl: './register.html',
})
export class Register {
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  @ViewChild(FormGroupDirective, { static: false}) private formDir!: FormGroupDirective;
  INPUT_TYPES = INPUT_TYPES

  form = registerForm(this.#fb);

  onSubmit(): void {
    const credentials: CreateUserRequest = this.form.getRawValue() as CreateUserRequest;

    this.#store.dispatch(AuthActions.registerUser({ payload: credentials}));
    
    this.formDir.resetForm(this.form.value);
  }

}
