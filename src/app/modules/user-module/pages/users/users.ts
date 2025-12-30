import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserFacade, UserItem, UsersViewModel } from '@user-module';
import { Search } from 'app/features/search/search';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserItem, Search],
  templateUrl: './users.html',
})
export class Users{
  #userFacade = inject(UserFacade);

  #baseUsers$: Observable<UsersViewModel> = this.#userFacade.searchUsers();
  private search$ = new BehaviorSubject<string>("");
  users$: Observable<UsersViewModel> = 
    combineLatest([this.#baseUsers$, this.search$]).pipe(
        map(([users, search]) => {
          const data = users.data.filter(user => user.emailId.toLowerCase().includes(search));
          return {
            ...users,
            data
          }
          
        }),
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
