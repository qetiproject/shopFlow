import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { UserAfterLogin } from '@auth-module/types/user-login';
import { logoutUser } from '@auth-module/store/auth.actions';
import { Store } from '@ngrx/store';

/** Lazy-loaded user menu links (My Orders, Profile, Logout). Loaded when dropdown or mobile menu opens. */
@Component({
  selector: 'app-user-menu-content',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      routerLink="/checkout/orders"
      routerLinkActive="text-blue-600 font-semibold"
      (click)="closed.emit()"
      role="menuitem"
      class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
    >
      My Orders
    </a>
    <a
      [routerLink]="['/users/profile', user()?.emailId ?? '']"
      routerLinkActive="text-blue-600 font-semibold"
      (click)="closed.emit()"
      role="menuitem"
      class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
    >
      Profile
    </a>
    <button
      (click)="onLogout()"
      type="button"
      role="menuitem"
      class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
    >
      Logout
    </button>
  `,
})
export class UserMenuContentComponent {
  private readonly store = inject(Store);

  readonly user = input.required<UserAfterLogin | null>();
  readonly closed = output<void>();

  onLogout(): void {
    this.store.dispatch(logoutUser());
    this.closed.emit();
  }
}
