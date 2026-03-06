import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonDirective } from '@features/directives/back-button.directive';
import { BackButtonSVG } from 'assets/icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [BackButtonDirective, BackButtonSVG],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pt-4 pl-4 mb-4">
      <button (click)="goBack()" appBackBtnClass aria-label="Go back">
        <app-back-button-svg />
      </button>
    </div>
  `,
})
export class BackButtonComponent {
  private location = inject(Location);
  private router = inject(Router);

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['product/list']);
    }
  }
}
