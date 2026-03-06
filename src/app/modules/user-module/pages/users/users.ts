import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UserList } from '@user-module/components/user-list/user-list';
import { Search } from '@features/search/search';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Search, UserList],
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users {
  placeholder = 'Search User';
  search = signal('');

  onSearch(value: string): void {
    this.search.set(value);
  }
}
