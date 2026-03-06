import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonDirective } from '@features';
import { BackButtonSVG } from 'assets/icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [BackButtonDirective, BackButtonSVG],
  template: `
    <div class="pt-4 pl-4 mb-4">
      <button (click)="goBack()" appBackBtnClass>
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
