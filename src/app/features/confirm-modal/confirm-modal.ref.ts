import { EventEmitter, Injector } from '@angular/core';

export interface ConfirmModalData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'success';
}

export class ConfirmModalRef {
  afterClosed = new EventEmitter<boolean>();
  injector: Injector;

  constructor(
    public data: ConfirmModalData,
    private resolve: (value: boolean) => void,
  ) {
    this.injector = Injector.create({
      providers: [{ provide: ConfirmModalRef, useValue: this }],
    });
  }

  close(result: boolean): void {
    this.resolve(result);
    this.afterClosed.emit(result);
    this.afterClosed.complete();
  }
}
