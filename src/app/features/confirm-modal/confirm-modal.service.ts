import { createComponent, EnvironmentInjector, inject, Injectable, Injector } from '@angular/core';
import { ConfirmModal } from '@features/confirm-modal/confirm-modal';
import { ConfirmModalData, ConfirmModalRef } from '@features/confirm-modal/confirm-modal.ref';

@Injectable({ providedIn: 'root' })
export class ConfirmModalService {
  private environmentInjector = inject(EnvironmentInjector);

  open(data: ConfirmModalData): Promise<boolean> {
    return new Promise((resolve) => {
      const modalRef = new ConfirmModalRef(data, resolve);

      const componentRef = createComponent(ConfirmModal, {
        environmentInjector: this.environmentInjector,
        elementInjector: Injector.create({
          providers: [{ provide: ConfirmModalRef, useValue: modalRef }],
          parent: this.environmentInjector,
        }),
      });

      const el = componentRef.location.nativeElement;
      document.body.appendChild(el);
      componentRef.changeDetectorRef.detectChanges();

      modalRef.afterClosed.subscribe((result) => {
        if (el.parentNode) el.parentNode.removeChild(el);
        componentRef.destroy();
        resolve(result);
      });
    });
  }
}
