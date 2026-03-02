import { signal } from '@angular/core';
import { apply, form } from '@angular/forms/signals';
import { BillingForm } from '@checkout-module';
import { createNameSchema } from '@custom-form/custom-signal-form/custom-error-message';

export const billingModel = signal<BillingForm>({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
});

export const billingForm = form(billingModel, (path) => {
  apply(path.firstName, createNameSchema('First Name'));
  apply(path.lastName, createNameSchema('Last Name'));
  apply(path.address, createNameSchema('Address'));
  apply(path.city, createNameSchema('City'));
});
