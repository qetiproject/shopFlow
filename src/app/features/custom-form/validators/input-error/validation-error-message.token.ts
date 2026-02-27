import { InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export type ValidationMessageFn = (error: ValidationErrors[string], field?: string) => string;

export type ValidationMessageMap = Record<string, ValidationMessageFn>;

export const ERROR_MESSAGE: ValidationMessageMap = {
  required: () => `This field is required`,
  requiredTrue: () => `This field is required`,
  minlength: ({ requiredLength }) => `The length should be at least ${requiredLength} characters`,
  pattern: () => `Wrong format`,
  email: () => `Email should have a valid email format`,
  uniqueEmail: () => `Email Already Present`,
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Messages', {
  providedIn: 'root',
  factory: () => ERROR_MESSAGE,
});
