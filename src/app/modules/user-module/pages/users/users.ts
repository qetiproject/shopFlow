import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserFacade, UsersViewModel } from '@user-module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './users.html',
})
export class Users{
  #userFacade = inject(UserFacade);

  users$: Observable<UsersViewModel> = this.#userFacade.searchUsers()
}
