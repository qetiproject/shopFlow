import { Component, computed, forwardRef, Input, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { INPUT_TYPES, InputType } from '@types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input<InputType>(INPUT_TYPES.TEXT);
  showPassword = signal<boolean>(false);
  @Input() placeholder = '';
  @Input() label = '';
  value = '';
  disabled = false;
  INPUT_TYPES = INPUT_TYPES;
  isPassword = computed(() => this.type() === INPUT_TYPES.PASSWORD);

  get inputType(): string {
    return this.type() === INPUT_TYPES.PASSWORD && this.showPassword()
      ? INPUT_TYPES.TEXT
      : this.type();
  }

  private onChange: (_: string | null) => void = (() => void 0) as (_: string | null) => void;
  private onTouched: () => void = () => void 0;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleInput(val: string) {
    this.value = val;
    this.onChange(val);
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
