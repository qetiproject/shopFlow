import { TestBed } from '@angular/core/testing';
import { VALIDATION_ERROR_MESSAGES } from '@custom-form/validators/input-error/validation-error-message.token';
import { ErrorMessagePipe } from './error-message.pipe';

describe('ErrorMessagePipe', () => {
  let pipe: ErrorMessagePipe;

  const mockMessages: Record<string, (v: unknown) => string> = {
    required: () => 'This field is required',
    minlength: (v: unknown) =>
      `Min length ${(v as { requiredLength: number }).requiredLength}`,
    email: () => 'Invalid email',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorMessagePipe,
        { provide: VALIDATION_ERROR_MESSAGES, useValue: mockMessages },
      ],
    });
    pipe = TestBed.inject(ErrorMessagePipe);
  });

  it('creates', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns message for known key', () => {
    expect(pipe.transform('required', '')).toBe('This field is required');
    expect(pipe.transform('email', '')).toBe('Invalid email');
  });

  it('passes errValue to message function', () => {
    expect(pipe.transform('minlength', { requiredLength: 5 } as unknown as string)).toBe(
      'Min length 5',
    );
  });

  it('returns empty string for unknown key', () => {
    expect(pipe.transform('unknown', '')).toBe('');
  });
});
