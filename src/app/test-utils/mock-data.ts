import type {
  AddProductRequest,
  BillingDetails,
  LoginRequest,
} from '@app-types/dto';
import type { BillingForm } from '@checkout-module/types/billing-form';

/** Shared test data for unit/e2e — single source of truth for mocks. */

export const mockBillingForm: BillingForm = {
  firstName: 'John',
  lastName: 'Doe',
  address: 'Street 1',
  city: 'City',
  zip: '12345',
};

export const mockBillingDetails: BillingDetails = {
  id: 'id-1',
  firstName: 'John',
  lastName: 'Doe',
  address: 'Street',
  city: 'City',
  fullName: 'John Doe',
  fullAddress: 'Street City',
  zip: 12345,
};

export const mockLoginRequest: LoginRequest = {
  emailId: 'test@mail.com',
  password: '123456',
};

export const mockAddProductRequest: AddProductRequest = {
  title: 'New',
  description: 'Desc',
  category: 'cat',
  price: 10,
  thumbnail: null,
};
