import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { INPUT_TYPES, InputType } from '@app-types/input';
import { EyeSVG, NotEyeSVG } from 'assets/icons';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, EyeSVG, NotEyeSVG],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  readonly placeholder = input('');
  readonly label = input('');
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
  onTouched: () => void = () => void 0;

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
