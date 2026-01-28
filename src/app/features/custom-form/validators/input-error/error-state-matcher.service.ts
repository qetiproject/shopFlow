import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export interface IErrorStateMatcher {
  isErrorVisible(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorStateMatcher implements IErrorStateMatcher {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null) {
    return Boolean(control && control.invalid && (control.disabled || (form && form.submitted)));
  }
}

export class OnTouchedErrorStateMatcher implements IErrorStateMatcher {
  isErrorVisible(control: AbstractControl | null, form: FormGroupDirective | NgForm | null) {
    return Boolean(control && control.invalid && (control.disabled || (form && form.submitted)));
  }
}
