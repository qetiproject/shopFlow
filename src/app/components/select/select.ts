import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ArrowDownSVG } from 'assets/icons/arrow-down';

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
  readonly options = input<SelectOption<T>[]>([]);
  readonly label = input<string>('');
  readonly placeholder = input<string | null>(null);
  readonly id = input<string>('');

  private static nextId = 0;
  readonly uid = `app-select-${++SelectComponent.nextId}`;

  readonly value = signal<T | null>(null);
  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

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
    this._disabled = isDisabled;
  }

  selectOption(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const raw = selectEl.value;

    const option = this.options().find((o) => String(o.value) === raw) ?? null;
    const nextValue = (option ? option.value : null) as T | null;

    this.value.set(nextValue);
    this.onChange(nextValue);
    this.onTouched();
  }
}
