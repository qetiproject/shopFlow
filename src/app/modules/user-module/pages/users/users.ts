import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserFacade, UserItem, UsersViewModel } from '@user-module';
import { Search } from 'app/features/search/search';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserItem, Search],
  templateUrl: './users.html',
})
export class Users{
  #userFacade = inject(UserFacade);

  private search$ = new BehaviorSubject<string>("");
  users$: Observable<UsersViewModel> = this.search$.pipe(
    switchMap(value => this.#userFacade.searchUsers(value)),
  )

  columns = [
    { key: 'emailId', label: 'Email' },
    { key: 'fullName', label: 'Full name' },
    { key: 'role', label: 'Role' },
    { key: 'projectName', label: 'Project' },
    { key: 'createdDate', label: 'Created' },
  ];

  onSearch(value: string): void {
    this.search$.next(value);
  }

}
