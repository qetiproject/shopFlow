import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.html',
})
export class ConfirmModal {
  visible = input<boolean>(false);
  title = input<string>('');
  message = input<string>('');

  confirmed = output<void>();
  canceled = output<void>();

  close() {
    this.canceled.emit();
  }

  confirm() {
    this.confirmed.emit();
  }
}
