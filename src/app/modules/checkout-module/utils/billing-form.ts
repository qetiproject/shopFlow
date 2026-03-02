// Component field initializer
import { signal } from '@angular/core';
import { apply, form } from '@angular/forms/signals';
import { BillingForm } from '@checkout-module';
import { createNameSchema } from '@features';

export const createBillingModel = () =>
  signal<BillingForm>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: 0,
  });

export const createBillingForm = (model: ReturnType<typeof createBillingModel>) =>
  form(model, (path) => {
    apply(path.firstName, createNameSchema('First Name'));
    apply(path.lastName, createNameSchema('Last Name'));
    apply(path.address, createNameSchema('Address'));
    apply(path.city, createNameSchema('City'));
  });
