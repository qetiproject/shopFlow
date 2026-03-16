import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import type { UserAfterLogin } from '@auth-module/types/user-login';
import { UserStorage } from '@auth-module/services/user.storage';
import { CartStore } from '@cart-module/store/cart.store';
import { CartIcon } from 'assets/icons/cart';
import { ClickOutsideDirective } from '@features/directives/click-outsides.directive';
import { UserMenuContentComponent } from './user-menu-content';

const HEADER_NAV_LINKS = [
  { path: '/users', label: 'Users' },
  { path: '/product/list', label: 'Products' },
] as const;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CartIcon, ClickOutsideDirective, UserMenuContentComponent],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly userStorage = inject(UserStorage);
  private readonly cartStore = inject(CartStore);

  readonly isOpen = signal(false);
  readonly isMobileMenu = signal(false);
  readonly totalItems = this.cartStore.totalItems;
  readonly navLinks = HEADER_NAV_LINKS;

  get user(): UserAfterLogin | null {
    return this.userStorage.getUser();
  }

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
}
