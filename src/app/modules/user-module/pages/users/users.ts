import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserFacade, UserItem, UsersViewModel } from '@user-module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserItem],
  templateUrl: './users.html',
})
export class Users{
  #userFacade = inject(UserFacade);

  users$: Observable<UsersViewModel> = this.#userFacade.searchUsers()
}
