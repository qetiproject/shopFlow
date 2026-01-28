import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [],
  template: `
    <div>
      <label [attr.for]="textareaId" class="block text-sm font-medium text-slate-700 mb-1">
        {{ label }}
      </label>
      <textarea
        [id]="textareaId"
        [placeholder]="placeholder || 'Enter ' + label"
        [value]="value"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
        rows="3"
        class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
      ></textarea>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';

  value = '';
  disabled = false;

  // generate a unique id for the textarea
  textareaId = 'textarea-' + Math.random().toString(36).substring(2, 10);

  onTouched: () => void = () => void 0;
  onChange: (value: string) => void = () => void 0;

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  handleBlur() {
    this.onTouched();
  }
}
