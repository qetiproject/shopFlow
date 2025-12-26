import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserAfterLogin } from '@auth-module';
import { STORAGE_KEYS } from '@core';
import { UserFacade } from '@user-module';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.html',
})
export class UserProfile {

  #userFacade = inject(UserFacade);
  user = JSON.parse(
    sessionStorage.getItem(STORAGE_KEYS.USER) || 'null'
  ) as UserAfterLogin | null;
  user$ = this.user
    ? this.#userFacade.getUserByEmail(this.user.emailId)
    : EMPTY;

}
