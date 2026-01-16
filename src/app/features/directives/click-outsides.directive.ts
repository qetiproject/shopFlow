import { Directive, ElementRef, HostListener, inject, output } from "@angular/core";

@Directive({
    selector: '[appClickoutside]',
    standalone: true
})
export class ClickOutsideDirective {
    el = inject(ElementRef);
    appClickOutside = output<void>();

    @HostListener('document:click', ['$event.target'])
    onClick(target: EventTarget | null) {
        if(target instanceof HTMLElement && !this.el.nativeElement.contains(target)) {
            this.appClickOutside.emit();
        }
    }
}
