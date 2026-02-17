import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ConfirmModalRef } from '@features';

export type ConfirmVariant = 'danger' | 'warning' | 'success';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModal implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private focusTrapFactory = inject(FocusTrapFactory);
  private document = inject(DOCUMENT);
  private modalRef = inject(ConfirmModalRef);

  title = signal('');
  message = signal('');
  confirmLabel = signal('Confirm');
  cancelLabel = signal('Cancel');
  variant = signal<ConfirmVariant>('danger');

  private focusTrap!: FocusTrap;
  private previouslyFocusedElement: HTMLElement | null = null;

  ngOnInit(): void {
    const data = this.modalRef.data;
    this.title.set(data.title);
    this.message.set(data.message);
    this.confirmLabel.set(data.confirmLabel ?? 'Confirm');
    this.cancelLabel.set(data.cancelLabel ?? 'Cancel');
    this.variant.set(data.variant ?? 'danger');

    this.lockScroll();
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement;

    queueMicrotask(() => {
      this.focusTrap = this.focusTrapFactory.create(this.el.nativeElement);
      this.focusTrap.focusInitialElement();
    });
  }

  ngOnDestroy(): void {
    this.unlockScroll();
    this.focusTrap?.destroy();
    this.previouslyFocusedElement?.focus();
  }

  confirm(): void {
    this.modalRef.close(true);
  }

  cancel(): void {
    this.modalRef.close(false);
  }

  backdropClick(event: MouseEvent): void {
    if (event.target === this.el.nativeElement.firstElementChild) {
      this.cancel();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.cancel();
  }

  @HostListener('document:keydown.enter')
  onEnter(): void {
    this.confirm();
  }

  private lockScroll(): void {
    this.document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    this.document.body.style.overflow = '';
  }

  get confirmButtonClasses(): string {
    const base = 'px-4 py-2 rounded-lg text-white transition focus:outline-none focus:ring-2';

    const variants: Record<ConfirmVariant, string> = {
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-400',
      warning: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400',
      success: 'bg-green-600 hover:bg-green-700 focus:ring-green-400',
    };

    return `${base} ${variants[this.variant()]}`;
  }
}
