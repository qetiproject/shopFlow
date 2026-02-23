import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { logoutUser, UserStorage } from '@auth-module';
import { CartStore } from '@cart-module';
import { STORAGE_KEYS } from '@core';
import { Store } from '@ngrx/store';
import { CartIcon } from 'app/icons/cart/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CartIcon],
  templateUrl: './header.html',
})
export class HeaderComponent {
  #store = inject(Store);
  isOpen = signal(false);
  isMobileMenu = signal(false);
  userStorage = inject(UserStorage);

  private readonly cartStore = inject(CartStore);

  readonly totalItems = this.cartStore.totalItems;

  user = sessionStorage.getItem(STORAGE_KEYS.USER);
  email: string | null = this.user ? JSON.parse(this.user).emailId : null;

  navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/users', label: 'Users' },
    { path: '/product/list', label: 'Products' },
  ];

  toggleDropdown() {
    this.isOpen.update((v) => !v);
  }

  toggleMobileMenu() {
    this.isMobileMenu.update((v) => !v);
  }

  onLogout(): void {
    this.#store.dispatch(logoutUser());
  }
}
