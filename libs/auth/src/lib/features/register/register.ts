import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  private fb = inject(NonNullableFormBuilder);
  private store = inject(Store);

  form = registerForm(this.fb);

  onSubmit(credentials: CreateUserRequest): void {
    this.store.dispatch(AuthActions.registerUser({ payload: credentials}));
    this.form.reset();
  }

}
