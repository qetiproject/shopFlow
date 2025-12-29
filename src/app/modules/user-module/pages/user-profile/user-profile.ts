import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { STORAGE_KEYS } from '@core';
import { Observable, of } from 'rxjs';
import { UserFacade } from '../../services';
import { UserViewModel } from '../../types';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.html',
})
export class UserProfile {

  #userFacade = inject(UserFacade);
  user = sessionStorage.getItem(STORAGE_KEYS.USER);
  #storedUser: string | null = sessionStorage.getItem(STORAGE_KEYS.USER);
  
  user$: Observable<UserViewModel | null> = this.#storedUser
    ? this.#userFacade.getUserByEmail(
        JSON.parse(this.#storedUser).emailId
      )
    : of(null);
  
}
