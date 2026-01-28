interface ValidationErrorMap {
  required: undefined;
  requiredTrue: undefined;
  minlength: { requiredLength: number; actualLength?: number };
  pattern: { requiredPattern: string; actualValue?: string };
  email: undefined;
  uniqueEmail: undefined;
}

export const ERROR_MESSAGE: {
  [K in keyof ValidationErrorMap]: (args?: ValidationErrorMap[K], field?: string) => string;
} = {
  required: () => 'This field is required',
  requiredTrue: () => 'This field is required',
  minlength: (args) => `The length should be at least ${args?.requiredLength ?? 0} characters`,
  pattern: (args) =>
    `Wrong format${args?.requiredPattern ? `, expected: ${args.requiredPattern}` : ''}`,
  email: () => 'Email should have a valid email format',
  uniqueEmail: () => 'Email Already Present',
};
