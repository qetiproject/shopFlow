import { InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export type ValidationMessageFn = (error: ValidationErrors[string], field?: string) => string;

export type ValidationMessageMap = Record<string, ValidationMessageFn>;

export const ERROR_MESSAGE: ValidationMessageMap = {
  required: (_, field) => `${field} is required`,
  minlength: ({ requiredLength }, field) =>
    `${field} must be at least ${requiredLength} characters`,
  requiredTrue: (_, field) => `${field} is required`,
  pattern: () => `Wrong format`,
  email: (_, field) => `${field} should have a valid ${field} format`,
  uniqueEmail: (_, field) => `${field} Already Present`,
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation Messages', {
  providedIn: 'root',
  factory: () => ERROR_MESSAGE,
});
