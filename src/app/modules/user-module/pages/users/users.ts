import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Search } from 'app/features/search/search';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, Search],
  templateUrl: './users.html',
})
export class Users {
  placeholder = 'Search User';

  search$ = new BehaviorSubject<string>('');

  search = toSignal(this.search$);

  onSearch(value: string): void {
    this.search$.next(value);
  }
}
