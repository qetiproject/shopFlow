import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { logoutUser } from '@auth-module/store/auth.actions';
import { UserStorage } from '@auth-module/services/user.storage';
import { CartStore } from '@cart-module/store/cart.store';
import { STORAGE_KEYS } from '@core/constants';
import { Store } from '@ngrx/store';
import { CartIcon } from 'assets/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CartIcon],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
