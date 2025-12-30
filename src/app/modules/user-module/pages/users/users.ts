import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserFacade, UserItem, UsersViewModel } from '@user-module';
import { Search } from 'app/features/search/search';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserItem, Search],
  templateUrl: './users.html',
})
export class Users{
  #userFacade = inject(UserFacade);

  #baseUsers$: Observable<UsersViewModel> = this.#userFacade.searchUsers();
  users$: Observable<UsersViewModel> = this.#baseUsers$;

  columns = [
    { key: 'emailId', label: 'Email' },
    { key: 'fullName', label: 'Full name' },
    { key: 'role', label: 'Role' },
    { key: 'projectName', label: 'Project' },
    { key: 'createdDate', label: 'Created' },
  ];

  onSearch(value: string): void {
    this.users$ = this.#baseUsers$
      .pipe(
        map(users => ({
          ...users,
          data: users.data.filter(user => user.emailId.toLowerCase().includes(value))
        }))
      )
  }

}
