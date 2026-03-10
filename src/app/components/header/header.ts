import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { logoutUser } from '@auth-module/store/auth.actions';
import { UserStorage } from '@auth-module/services/user.storage';
import { CartStore } from '@cart-module/store/cart.store';
import { Store } from '@ngrx/store';
import { CartIcon } from 'assets/icons';
import { ClickOutsideDirective } from '@features/directives/click-outsides.directive';

const HEADER_NAV_LINKS = [
  { path: '/users', label: 'Users' },
  { path: '/product/list', label: 'Products' },
] as const;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CartIcon, ClickOutsideDirective],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly store = inject(Store);
  readonly userStorage = inject(UserStorage);
  private readonly cartStore = inject(CartStore);

  readonly isOpen = signal(false);
  readonly isMobileMenu = signal(false);
  readonly totalItems = this.cartStore.totalItems;
  readonly navLinks = HEADER_NAV_LINKS;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenus();
  }

  toggleDropdown(): void {
    this.isOpen.update((v) => !v);
  }

  toggleMobileMenu(): void {
    this.isMobileMenu.update((v) => !v);
  }

  closeMenus(): void {
    this.isOpen.set(false);
    this.isMobileMenu.set(false);
  }

  onLogout(): void {
    this.closeMenus();
    this.store.dispatch(logoutUser());
  }
}
