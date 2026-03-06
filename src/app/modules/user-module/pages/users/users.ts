
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserList } from '@user-module/components/user-list/user-list';
import { Search } from '@features/search/search';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [Search, UserList],
  templateUrl: './users.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users {
  placeholder = 'Search User';

  search$ = new BehaviorSubject<string>('');

  search = toSignal(this.search$);

  onSearch(value: string): void {
    this.search$.next(value);
  }
}
