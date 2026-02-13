import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-upload-file',
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
})
export class UploadFileComponent {
  label = input<string>('');
  accept = input<string>('');
  multiple = input<boolean>();

  @Output() fileSelected = new EventEmitter<File | File[]>();

  dragging = false;
  private previewSignal = signal<string | null>(null);
  previewUrl = this.previewSignal.asReadonly();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = this.multiple() ? Array.from(input.files) : input.files[0];
    this.fileSelected.emit(files);

    if (!this.multiple()) this.createPreview(files as File);
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => this.previewSignal.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  clear() {
    this.previewSignal.set(null);
    this.fileSelected.emit([]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave() {
    this.dragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;

    if (!event.dataTransfer?.files?.length) return;

    const files = this.multiple()
      ? Array.from(event.dataTransfer.files)
      : event.dataTransfer.files[0];

    this.fileSelected.emit(files);

    if (!this.multiple) this.createPreview(files as File);
  }
}
