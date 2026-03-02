import { minLength, required, Schema, schema } from '@angular/forms/signals';

export const createNameSchema = (label: string): Schema<string> =>
  schema((path) => {
    required(path, { message: `${label} is required` });
    minLength(path, 3, { message: `${label}Too short` });
  });
