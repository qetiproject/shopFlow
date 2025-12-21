import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../data-access/store/index';
import { CreateUserRequest } from '../../types';
import { UIRegister } from '../../UI/register/register';
import { registerForm } from '../../utils';

@Component({
  selector: 'lib-features-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UIRegister],
  templateUrl: './register.html',
})
export class FeaturesRegister {
  #fb = inject(NonNullableFormBuilder);
  #store = inject(Store);

  @ViewChild(FormGroupDirective, { static: false}) private formDir!: FormGroupDirective;


  form = registerForm(this.#fb);

  onSubmit(credentials: CreateUserRequest): void {
    // const credentials: CreateUserRequest = this.form.getRawValue() as CreateUserRequest;

    this.#store.dispatch(AuthActions.registerUser({ payload: credentials}));
    
    // this.formDir.resetForm(this.form.value);
  }

}
