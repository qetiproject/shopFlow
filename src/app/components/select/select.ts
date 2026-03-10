import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ArrowDownSVG } from 'assets/icons';

export interface SelectOption<T extends string | number = string> {
  label: string;
  value: T;
  url?: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ArrowDownSVG],
  templateUrl: './select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T extends string | number = string> implements ControlValueAccessor {
  options = input<SelectOption<T>[]>([]);
  label = input<string>('');
  placeholder = input<string | null>(null);
  id = input<string>('');

  private static nextId = 0;
  readonly uid = `app-select-${++SelectComponent.nextId}`;

  value = signal<T | null>(null);
  disabled = false;

  private onChange: (_: T | null) => void = (() => void 0) as (_: T | null) => void;
  private onTouched: () => void = () => void 0;

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(event: Event) {
    const selectEl = event.target as HTMLSelectElement;
    const raw = selectEl.value;

    const option = this.options().find((o) => String(o.value) === raw) ?? null;
    const nextValue = (option ? option.value : null) as T | null;

    this.value.set(nextValue);
    this.onChange(nextValue);
    this.onTouched();
  }
}
