
import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [],
  templateUrl: './upload-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  private onChange: (_: File | null) => void = (() => void 0) as (_: File | null) => void;
  private onTouched: () => void = () => void 0;

  writeValue(file: File | null): void {
    this.value = file;

    if (file) {
      this.createPreview(file);
    } else {
      this.previewUrl.set(null);
    }
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.setFile(file);
    input.value = '';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;

    if (!event.dataTransfer?.files?.length) return;
    const file = event.dataTransfer.files[0];
    this.setFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave() {
    this.dragging = false;
  }

  clearFile() {
    if (this.previewUrl()) {
      if (this.previewUrl()!.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewUrl()!);
      }
    }

    this.value = null;
    this.previewUrl.set(null);
    this.onChange(null);
  }

  private setFile(file: File) {
    this.value = file;
    this.onChange(file);
    this.onTouched();
    this.createPreview(file);
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }
}
