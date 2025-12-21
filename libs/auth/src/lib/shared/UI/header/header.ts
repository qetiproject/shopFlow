import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { logoutUser, UserStorage } from '@auth-module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  #store = inject(Store);
  isOpen = signal(false);
  isMobileMenu = signal(false);
  userStorage = inject(UserStorage);

  navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
  ];

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  toggleMobileMenu() {
    this.isMobileMenu.update(v => !v);
  }

  onLogout(): void {
    this.#store.dispatch(logoutUser());
  }

}
