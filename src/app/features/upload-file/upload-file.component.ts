import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
  styles: [
    `
      div {
        position: relative;
        transition: border-color 0.2s;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  label = input<string>('');
  accept = input<string>('');
  multiple = input<boolean>();

  dragging = false;
  disabled = false;

  value: File | null = null;
  previewUrl = signal<string | null>(null);

  private onChange = (_: File | null) => {};
  private onTouched = () => {};

  writeValue(file: File | null): void {
    this.value = file;

    if (file) {
      this.createPreview(file);
    } else {
      this.previewUrl.set(null);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    this.value = file;
    this.onChange(file);
    this.onTouched();

    this.createPreview(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;

    if (!event.dataTransfer?.files?.length) return;

    const file = event.dataTransfer.files[0];

    this.value = file;
    this.onChange(file);
    this.onTouched();

    this.createPreview(file);
  }

  clearFile() {
    this.value = null;
    this.previewUrl.set(null);
    this.onChange(null);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave() {
    this.dragging = false;
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }
}
