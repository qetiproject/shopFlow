import { ComponentRef, DestroyRef, Directive, ElementRef, inject, OnInit, ViewContainerRef, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { EMPTY, fromEvent, iif, merge, skip, startWith } from 'rxjs';
import { ErrorStateMatcher, InputErrorComponent } from '.';

@Directive({
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])
  `,
  standalone: true
})
export class DynamicValidatorMessage implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  ngControl = inject(NgControl, { self: true, optional: true }) || inject(ControlContainer, { self: true });
  elementRef = inject(ElementRef);

  get form() {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null;
  }

  readonly errorStateMatcher = input(inject(ErrorStateMatcher));
  readonly container = input(inject(ViewContainerRef));

  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private parentContainer = inject(ControlContainer, { optional: true });

  ngOnInit() {
    queueMicrotask(() => {
      if (!this.ngControl.control)
        throw Error(`No control model for ${this.ngControl.name} control...`);
      merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
      ).pipe(
        startWith(this.ngControl.control.status),
        skip(this.ngControl instanceof NgModel ? 1 : 0),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(() => {
        const control = this.ngControl.control!;
        const showError = this.errorStateMatcher().isErrorVisible(control, this.form)
          && (control.touched || control.dirty);
        if (showError) {
          if (!this.componentRef) {
            this.componentRef = this.container().createComponent(InputErrorComponent);
            this.componentRef.changeDetectorRef.markForCheck();
          }
          this.componentRef.setInput('errors', this.ngControl.errors);
        } else {
          this.componentRef?.destroy();
          this.componentRef = null;
        }
      });
    });
  }
}
