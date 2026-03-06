// Component field initializer
import { signal } from '@angular/core';
import { apply, form } from '@angular/forms/signals';
import { BillingForm } from '@checkout-module/types/billing-form';
import { createNameSchema } from '@features/custom-form/custom-signal-form/custom-error-message';

export const createBillingModel = () =>
  signal<BillingForm>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
  });

export const createBillingForm = (model: ReturnType<typeof createBillingModel>) =>
  form(model, (path) => {
    apply(path.firstName, createNameSchema('First Name'));
    apply(path.lastName, createNameSchema('Last Name'));
    apply(path.address, createNameSchema('Address'));
    apply(path.city, createNameSchema('City'));
    apply(path.zip, createNameSchema('Zip Code'));
  });
